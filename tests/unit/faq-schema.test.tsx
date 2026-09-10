import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { FaqWithContactForm } from "@/components/content/faq-with-contact-form";
import { getFaqPageJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import type { FaqItem } from "@/content/home";

/**
 * FAQPage structured-data safeguards (SEO audit Batch 2 corrective pass,
 * item 3). These assert the mechanism that makes the safeguards hold —
 * schema generated from the exact array a page renders, an explicit
 * per-consumer opt-out for the disputed combination pages, and safe JSON-LD
 * serialisation — rather than re-testing FaqAccordion's own rendering
 * behaviour (covered by tests/unit/faq-accordion.test.tsx).
 */

const sampleFaqs: FaqItem[] = [
  { id: "one", question: "What does Apex HR do?", answer: "Apex HR provides outsourced HR and recruitment support." },
  { id: "two", question: "Which locations do you cover?", answer: "We support employers across the UK." },
  { id: "three", question: "How do I get started?", answer: "Contact us to discuss your requirements." },
];

function getJsonLdScripts(container: HTMLElement) {
  return Array.from(container.querySelectorAll('script[type="application/ld+json"]'));
}

describe("getFaqPageJsonLd", () => {
  it("emits one Question/Answer pair per input FAQ, in the same order, with no added or dropped entries", () => {
    const jsonLd = getFaqPageJsonLd({ faqs: sampleFaqs });

    expect(jsonLd["@type"]).toBe("FAQPage");
    expect(jsonLd.mainEntity).toHaveLength(sampleFaqs.length);
    jsonLd.mainEntity.forEach((entry, index) => {
      expect(entry["@type"]).toBe("Question");
      expect(entry.name).toBe(sampleFaqs[index].question);
      expect(entry.acceptedAnswer["@type"]).toBe("Answer");
      expect(entry.acceptedAnswer.text).toBe(sampleFaqs[index].answer);
    });
  });

  it("emits an empty mainEntity array for an empty FAQ list rather than fabricating content", () => {
    const jsonLd = getFaqPageJsonLd({ faqs: [] });
    expect(jsonLd.mainEntity).toEqual([]);
  });
});

describe("toJsonLdScript", () => {
  it("round-trips arbitrary JSON-LD data unchanged through JSON.parse", () => {
    const jsonLd = getFaqPageJsonLd({ faqs: sampleFaqs });
    const serialised = toJsonLdScript(jsonLd);
    expect(JSON.parse(serialised)).toEqual(jsonLd);
  });

  it("neutralises a literal </script> sequence in an FAQ answer so it cannot close the surrounding tag", () => {
    const unsafeFaqs: FaqItem[] = [
      { id: "unsafe", question: "Edge case?", answer: 'Answer with </script><script>alert(1)</script> inside it.' },
    ];
    const serialised = toJsonLdScript(getFaqPageJsonLd({ faqs: unsafeFaqs }));

    expect(serialised).not.toContain("</script>");
    // The escaped form must still decode back to the exact original text.
    const parsed = JSON.parse(serialised) as ReturnType<typeof getFaqPageJsonLd>;
    expect(parsed.mainEntity[0].acceptedAnswer.text).toBe(unsafeFaqs[0].answer);
  });
});

describe("FaqWithContactForm — schema/visible-content parity", () => {
  it("renders FAQPage JSON-LD whose question/answer text exactly matches the visible accordion content", () => {
    const { container, getByText } = render(<FaqWithContactForm items={sampleFaqs} />);

    const scripts = getJsonLdScripts(container);
    expect(scripts).toHaveLength(1);
    const jsonLd = JSON.parse(scripts[0].innerHTML) as ReturnType<typeof getFaqPageJsonLd>;

    expect(jsonLd.mainEntity).toHaveLength(sampleFaqs.length);
    for (const faq of sampleFaqs) {
      // Every schema Q&A must also be present in the rendered DOM — an
      // accordion's collapsed answers still count, since the text is
      // server-rendered and only CSS-hidden, not absent from the page.
      expect(getByText(faq.question)).toBeInTheDocument();
      expect(getByText(faq.answer)).toBeInTheDocument();
      const schemaEntry = jsonLd.mainEntity.find((entry) => entry.name === faq.question);
      expect(schemaEntry?.acceptedAnswer.text).toBe(faq.answer);
    }
  });

  it("omits FAQPage schema entirely when the FAQ list is empty, even though includeSchema defaults to true", () => {
    const { container } = render(<FaqWithContactForm items={[]} />);
    expect(getJsonLdScripts(container)).toHaveLength(0);
  });

  it("omits FAQPage schema when a consumer explicitly opts out via includeSchema={false}", () => {
    const { container } = render(<FaqWithContactForm items={sampleFaqs} includeSchema={false} />);
    expect(getJsonLdScripts(container)).toHaveLength(0);
  });
});

describe("disputed service/category-location combination pages never opt back into FAQ schema", () => {
  it("keeps ServiceLocationTemplate — the shared template for the 46 disputed combination pages — passing includeSchema={false}", () => {
    // A direct source check, not a rendered-output check: this is the one
    // template shared by every disputed combination page (SEO audit Batch 2
    // item 3 explicitly excludes them), so a regression here would silently
    // turn FAQ schema back on for all of them at once. Reading the actual
    // source file keeps this test honest about what the shipped code does,
    // not just what a mock would do.
    const source = readFileSync(
      join(process.cwd(), "src/components/templates/service-location-template.tsx"),
      "utf-8",
    );
    expect(source).toMatch(/<FaqWithContactForm[^>]*includeSchema=\{false\}/);
  });
});

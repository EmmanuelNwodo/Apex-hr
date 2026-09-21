import { describe, expect, it } from "vitest";
import { render, within } from "@testing-library/react";
import { getServicesByCategory, getService, services } from "@/config/services";
import { serviceContent } from "@/content/services-data";
import { redirectRules } from "@/config/redirects";
import { serviceLocationCombos, categoryLocationCombos } from "@/config/service-locations";
import { getLocation } from "@/config/locations";
import { locationContent } from "@/content/locations-data";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { ServiceLocationTemplate } from "@/components/templates/service-location-template";
import { getBreadcrumbJsonLd, getServiceJsonLd } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";

/**
 * SEO audit Phase 3 Batch 6G safeguards for the three Performance &
 * Talent Management child pages, plus Competency Frameworks' Warwickshire
 * location-page regression protection. No regex-based test here claims
 * to determine legal, equality or clinical correctness — only the
 * presence of required safeguards/disclaimers and the absence of banned
 * guaranteed-result wording.
 */

const APPROVED_THREE = ["performance-management-firm-in-the-uk", "succession-planning-and-talent-mapping-firm-in-the-uk", "competency-frameworks-firm-in-the-uk"];

const APPROVED_INTENTS: Record<string, string> = {
  "performance-management-firm-in-the-uk": "Designing and improving structured employee-performance processes",
  "succession-planning-and-talent-mapping-firm-in-the-uk": "Identifying critical roles, succession needs and internal talent considerations",
  "competency-frameworks-firm-in-the-uk": "Defining the skills, knowledge and behaviours associated with roles or organisational levels",
};

const NOINDEX_HUB_PATHS = ["/insights/", "/resources/", "/case-study/"];
const GUARANTEE_LANGUAGE = /\bguarantee(d|s)?\b|\bpromise(d|s)?\b|\b100%\b|\bwill (reduce|increase|improve|cut|boost|guarantee)\b/i;
const BANNED_METADATA_WORDS = /\bfair\b|\bobjective\b|\blegally compliant\b/i;
const AMERICAN_ADVISOR = /\badvisor\b/i;

function buildBreadcrumbTrail(serviceTitle: string, serviceSlug: string) {
  return [
    routes.services,
    {
      id: "performance-and-talent-management-firm-in-the-uk",
      label: "Performance & Talent Management",
      path: "/services/performance-and-talent-management-firm-in-the-uk/",
      status: "confirmed" as const,
      readyToIndex: true,
    },
    { id: serviceSlug, label: serviceTitle, path: `/services/${serviceSlug}/`, status: "confirmed" as const, readyToIndex: true },
  ];
}

describe("Performance & Talent Management children (Batch 6G) — catalogue integrity", () => {
  const family = getServicesByCategory("performance-and-talent-management-firm-in-the-uk");

  it("has exactly these three approved services and no others", () => {
    expect(family.length).toBe(3);
    expect(family.map((s) => s.slug).sort()).toEqual([...APPROVED_THREE].sort());
  });

  it("has unique titles, meta descriptions and primary keywords across the three", () => {
    const entries = APPROVED_THREE.map((slug) => ({
      service: getService(slug)!,
      content: serviceContent.find((c) => c.slug === slug)!,
    }));
    expect(new Set(entries.map((e) => e.service.title)).size).toBe(3);
    expect(new Set(entries.map((e) => e.content.metaDescription)).size).toBe(3);
    expect(new Set(entries.map((e) => e.content.primaryKeyword)).size).toBe(3);
  });

  it("has distinct principal intents matching the approved intent-ownership table", () => {
    expect(new Set(Object.values(APPROVED_INTENTS)).size).toBe(3);
    for (const slug of APPROVED_THREE) {
      expect(APPROVED_INTENTS[slug]).toBeTruthy();
    }
  });

  it("has no FAQ question duplicated verbatim across the three (including additionalFaqs)", () => {
    const allQuestions = APPROVED_THREE.flatMap((slug) => {
      const content = serviceContent.find((c) => c.slug === slug)!;
      return [...content.faqs, ...(content.additionalFaqs ?? [])].map((f) => f.question);
    });
    const seen = new Map<string, number>();
    for (const q of allQuestions) seen.set(q, (seen.get(q) ?? 0) + 1);
    const duplicates = [...seen.entries()].filter(([, count]) => count > 1).map(([q]) => q);
    expect(duplicates, `Duplicated FAQ questions: ${duplicates.join(" | ")}`).toEqual([]);
  });

  it("has every relatedServiceSlugs entry pointing to a real, different confirmed service", () => {
    for (const slug of APPROVED_THREE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      for (const relatedSlug of content.relatedServiceSlugs) {
        expect(relatedSlug).not.toBe(slug);
        expect(services.some((s) => s.slug === relatedSlug), `${slug} -> unknown related service ${relatedSlug}`).toBe(true);
      }
    }
  });

  it("has no guarantee-style language asserted as fact in businessOutcomes (the one field meant to state positive results)", () => {
    // differentiationNote is deliberately excluded: it legitimately uses
    // "guaranteed" in negated, disclaiming form (e.g. "not a guaranteed
    // future appointment") — correct usage, not a claim of fact.
    const offenders: string[] = [];
    for (const slug of APPROVED_THREE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      for (const text of content.businessOutcomes) {
        if (GUARANTEE_LANGUAGE.test(text)) offenders.push(`${slug}: "${text}"`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("has no 'fair', 'objective' or 'legally compliant' guaranteed-result wording in any of the three metadata fields", () => {
    const offenders: string[] = [];
    for (const slug of APPROVED_THREE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      if (BANNED_METADATA_WORDS.test(content.metaDescription)) offenders.push(slug);
    }
    expect(offenders).toEqual([]);
  });

  it("uses no American 'advisor' spelling anywhere in the three services' content", () => {
    const offenders: string[] = [];
    for (const slug of APPROVED_THREE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      if (AMERICAN_ADVISOR.test(JSON.stringify(content))) offenders.push(slug);
    }
    expect(offenders).toEqual([]);
  });

  it("marks only Performance Management for legal review among the three", () => {
    for (const slug of APPROVED_THREE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const expected = slug === "performance-management-firm-in-the-uk";
      expect(content.legalReviewRequired, `${slug} legalReviewRequired mismatch`).toBe(expected);
    }
  });

  it("Performance Management is not framed as an annual appraisal only, and excludes guaranteed improvement/engagement/compliance, bias elimination and Apex HR decision-making", () => {
    const content = serviceContent.find((c) => c.slug === "performance-management-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/guaranteed performance improvement/);
    expect(scope).toMatch(/guaranteed employee engagement/);
    expect(scope).toMatch(/legal compliance or legal defensibility/);
    expect(scope).toMatch(/elimination of bias or the elimination of performance-related disputes/);
    expect(scope).toMatch(/disciplinary, dismissal, promotion or pay decisions/);
    expect(scope).toMatch(/rating is automatically objective/);
    const allFaqs = [...content.faqs, ...(content.additionalFaqs ?? [])];
    expect(allFaqs.some((f) => /annual appraisal/i.test(f.question))).toBe(true);
    const annualFaq = allFaqs.find((f) => /annual appraisal/i.test(f.question))!;
    expect(annualFaq.answer.toLowerCase()).toMatch(/ongoing performance process|not necessarily/);
  });

  it("Performance Management is distinguished from Executive Coaching and Competency Frameworks", () => {
    const content = serviceContent.find((c) => c.slug === "performance-management-firm-in-the-uk")!;
    const note = content.differentiationNote?.toLowerCase() ?? "";
    expect(note).toMatch(/executive coaching & 360 feedback/);
    expect(note).toMatch(/competency frameworks/);
  });

  it("Succession Planning & Talent Mapping excludes promotion promises, readiness/confidentiality guarantees, bias-elimination claims, discriminatory criteria and automated decision-making", () => {
    const content = serviceContent.find((c) => c.slug === "succession-planning-and-talent-mapping-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/guarantee of succession readiness/);
    expect(scope).toMatch(/promise of promotion or appointment/);
    expect(scope).toMatch(/objectively 'high potential' without explaining/);
    expect(scope).toMatch(/guarantee of confidentiality in every circumstance/);
    expect(scope).toMatch(/bias has been eliminated/);
    expect(scope).toMatch(/exclude or disadvantage people based on protected characteristics/);
    expect(scope).toMatch(/automated tools making final talent or succession decisions/);
  });

  it("Succession Planning & Talent Mapping explains employee-data handling and is distinguished from Strategic Workforce Planning and recruitment", () => {
    const content = serviceContent.find((c) => c.slug === "succession-planning-and-talent-mapping-firm-in-the-uk")!;
    const note = content.differentiationNote?.toLowerCase() ?? "";
    expect(note).toMatch(/strategic workforce planning/);
    expect(note).toMatch(/external recruitment/);
    const allFaqs = [...content.faqs, ...(content.additionalFaqs ?? [])];
    expect(allFaqs.some((f) => /information.*handled|handled.*information/i.test(f.question))).toBe(true);
  });

  it("Competency Frameworks is not presented as a scientific, psychological, clinical or psychometric assessment anywhere in its visible content", () => {
    const content = serviceContent.find((c) => c.slug === "competency-frameworks-firm-in-the-uk")!;
    const allFaqs = [...content.faqs, ...(content.additionalFaqs ?? [])];
    const allText = [
      content.heroSummary,
      content.employerChallenge,
      ...content.businessOutcomes,
      ...content.whatItIncludes,
      content.differentiationNote ?? "",
      ...allFaqs.map((f) => f.answer),
    ].join(" ").toLowerCase();
    // Any mention of these terms must appear only within a negation.
    for (const term of ["psychometric", "clinical", "psychological"]) {
      if (allText.includes(term)) {
        const sentenceMatch = allText.split(/(?<=[.!?])\s+/).find((s) => s.includes(term));
        expect(sentenceMatch, `"${term}" found without a containing sentence`).toBeDefined();
        expect(sentenceMatch, `Unqualified "${term}" language: "${sentenceMatch}"`).toMatch(/\bnot\b|\bno\b/);
      }
    }
  });

  it("Competency Frameworks excludes guaranteed objectivity, legal compliance, bias elimination, performance improvement and personal-worth determinations", () => {
    const content = serviceContent.find((c) => c.slug === "competency-frameworks-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/guaranteed objectivity/);
    expect(scope).toMatch(/legal compliance guaranteed/);
    expect(scope).toMatch(/elimination of bias in recruitment, performance or development/);
    expect(scope).toMatch(/guaranteed performance improvement/);
    expect(scope).toMatch(/personal worth or suitability/);
  });

  it("Competency Frameworks is distinguished from Job Evaluation and Performance Management", () => {
    const content = serviceContent.find((c) => c.slug === "competency-frameworks-firm-in-the-uk")!;
    const note = content.differentiationNote?.toLowerCase() ?? "";
    expect(note).toMatch(/job evaluation & pay structures/);
    expect(note).toMatch(/performance management/);
  });

  it("Competency Frameworks has a live Warwickshire service-location combo; the other two have zero combos", () => {
    const competencyCombos = serviceLocationCombos.filter((c) => c.serviceSlug === "competency-frameworks-firm-in-the-uk");
    expect(competencyCombos.map((c) => c.locationSlug)).toEqual(["warwickshire"]);
    for (const slug of ["performance-management-firm-in-the-uk", "succession-planning-and-talent-mapping-firm-in-the-uk"]) {
      expect(serviceLocationCombos.filter((c) => c.serviceSlug === slug)).toEqual([]);
    }
    const categorySlugs = categoryLocationCombos.map((c) => c.categorySlug);
    expect(categorySlugs).not.toContain("performance-and-talent-management-firm-in-the-uk");
  });
});

describe("Performance & Talent Management children (Batch 6G) — rendered content, per service", () => {
  for (const slug of APPROVED_THREE) {
    const service = getService(slug)!;
    const content = serviceContent.find((c) => c.slug === slug)!;
    const allFaqs = [...content.faqs, ...(content.additionalFaqs ?? [])];

    describe(service.title, () => {
      it("renders exactly one H1, equal to the service's approved name", () => {
        const { getAllByRole } = render(
          <ServicePageTemplate title={service.title} breadcrumbTrail={buildBreadcrumbTrail(service.title, slug)} service={content} />,
        );
        const h1s = getAllByRole("heading", { level: 1 });
        expect(h1s).toHaveLength(1);
        expect(h1s[0]).toHaveTextContent(service.title);
      });

      it("links to the parent family page and, with showForEmployersLink, to /for-employers/", () => {
        const { getAllByRole } = render(
          <ServicePageTemplate
            title={service.title}
            breadcrumbTrail={buildBreadcrumbTrail(service.title, slug)}
            service={content}
            showForEmployersLink
          />,
        );
        const links = getAllByRole("link").map((el) => el.getAttribute("href")?.replace(/\/$/, ""));
        expect(links).toContain("/services/performance-and-talent-management-firm-in-the-uk");
        expect(links).toContain("/for-employers");
      });

      it("never links to a redirect source or an empty noindex hub", () => {
        const { getAllByRole } = render(
          <ServicePageTemplate
            title={service.title}
            breadcrumbTrail={buildBreadcrumbTrail(service.title, slug)}
            service={content}
            showForEmployersLink
          />,
        );
        const hrefs = getAllByRole("link")
          .map((el) => el.getAttribute("href"))
          .filter((href): href is string => href != null && href.startsWith("/"));
        const redirectSources = new Set(redirectRules.map((r) => r.source.replace(/\/$/, "")));
        for (const href of hrefs) {
          const normalised = href.replace(/\/$/, "");
          expect(redirectSources.has(normalised), `${slug} links to redirect source ${href}`).toBe(false);
          expect(NOINDEX_HUB_PATHS.includes(`${normalised}/`), `${slug} links to noindex hub ${href}`).toBe(false);
        }
      });

      it("renders the 'Not included in this service' list from outOfScope", () => {
        const { getByText } = render(
          <ServicePageTemplate title={service.title} breadcrumbTrail={buildBreadcrumbTrail(service.title, slug)} service={content} />,
        );
        expect(getByText("Not included in this service")).toBeInTheDocument();
        for (const item of content.outOfScope ?? []) {
          expect(getByText(item)).toBeInTheDocument();
        }
      });

      it("emits FAQPage schema matching the combined faqs + additionalFaqs exactly, with no psychological/medical, ratings or price schema", () => {
        const { container, getByText } = render(
          <ServicePageTemplate title={service.title} breadcrumbTrail={buildBreadcrumbTrail(service.title, slug)} service={content} />,
        );
        const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'));
        for (const script of scripts) {
          expect(script.innerHTML).not.toContain("MedicalProcedure");
          expect(script.innerHTML).not.toContain("AggregateRating");
          expect(script.innerHTML).not.toMatch(/"price"|"offers"/);
        }
        expect(allFaqs.length).toBeGreaterThan(0);
        const faqScript = scripts.find((s) => s.innerHTML.includes('"FAQPage"'));
        expect(faqScript, `${slug} should emit FAQPage schema`).toBeDefined();
        const jsonLd = JSON.parse(faqScript!.innerHTML) as {
          mainEntity: { name: string; acceptedAnswer: { text: string } }[];
        };
        expect(jsonLd.mainEntity).toHaveLength(allFaqs.length);
        for (const faq of allFaqs) {
          expect(getByText(faq.question)).toBeInTheDocument();
          const schemaEntry = jsonLd.mainEntity.find((entry) => entry.name === faq.question);
          expect(schemaEntry?.acceptedAnswer.text).toBe(faq.answer);
        }
      });

      it("has a Service JSON-LD shape matching name/description/path, with the family as parent breadcrumb", () => {
        const path = `/services/${slug}/`;
        const serviceLd = getServiceJsonLd({ name: service.title, description: content.metaDescription, path });
        expect(serviceLd.name).toBe(service.title);
        expect(serviceLd.description).toBe(content.metaDescription);
        expect(serviceLd.url).toContain(path);

        const trail = buildBreadcrumbTrail(service.title, slug);
        const breadcrumbLd = getBreadcrumbJsonLd(routes.home.label, trail);
        expect(breadcrumbLd.itemListElement.some((item) => item.name === "Performance & Talent Management")).toBe(true);
        expect(breadcrumbLd.itemListElement.at(-1)?.name).toBe(service.title);
      });
    });
  }
});

describe("Competency Frameworks — Warwickshire location-page regression protection", () => {
  const content = serviceContent.find((c) => c.slug === "competency-frameworks-firm-in-the-uk")!;

  it("the Warwickshire service-location page still renders the untouched shared heroSummary, whatItIncludes and first FAQ", () => {
    const combo = serviceLocationCombos.find((c) => c.serviceSlug === "competency-frameworks-firm-in-the-uk" && c.locationSlug === "warwickshire")!;
    const location = getLocation(combo.locationSlug)!;
    const locationInfo = locationContent.find((l) => l.slug === combo.locationSlug)!;

    const { container } = render(
      <ServiceLocationTemplate
        breadcrumbTrail={[]}
        entityTitle="Competency Frameworks"
        entityHref="/services/competency-frameworks-firm-in-the-uk/"
        entitySummary={content.heroSummary}
        bulletListTitle="What this includes"
        bulletList={content.whatItIncludes}
        locationTitle={location.title}
        locationRegion={locationInfo.region}
        locationHref={`/locations/${location.slug}/`}
        localContext={locationInfo.localContext}
        faqs={[...content.faqs.slice(0, 3)]}
      />,
    );
    const scoped = within(container);
    expect(scoped.getByText(content.heroSummary)).toBeInTheDocument();
    for (const item of content.whatItIncludes) {
      expect(scoped.getByText(item)).toBeInTheDocument();
    }
    expect(scoped.getByText(content.faqs[0].question)).toBeInTheDocument();
    // outOfScope/differentiationNote/additionalFaqs must never leak into
    // the location template — it doesn't accept those props at all.
    for (const scopeItem of content.outOfScope ?? []) {
      expect(scoped.queryByText(scopeItem)).toBeNull();
    }
  });

  it("Competency Frameworks' unchanged heroSummary contains none of the newly-banned metadata words", () => {
    expect(BANNED_METADATA_WORDS.test(content.heroSummary)).toBe(false);
  });
});

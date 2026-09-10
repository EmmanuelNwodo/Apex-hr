import { describe, expect, it } from "vitest";
import { render, within } from "@testing-library/react";
import { serviceCategories, getServicesByCategory, getServiceCategory } from "@/config/services";
import { serviceCategoryContent } from "@/content/services-data";
import { getBreadcrumbJsonLd, getServiceJsonLd } from "@/lib/seo/structured-data";
import { ServiceCategoryTemplate } from "@/components/templates/service-category-template";
import { routes } from "@/config/routes";

/**
 * SEO audit Phase 3 Batch 5 corrective-pass safeguards for the 10
 * service-family (category) pages. Data-driven against the actual
 * config/content, not a hardcoded row count, so these keep validating
 * correctly if the underlying catalogue ever changes size.
 */

// The exact 10 canonical family names approved in the corrective-pass
// instruction — the single source of truth this test checks the live
// category titles against, independent of whatever serviceCategoryContent
// happens to contain.
const APPROVED_FAMILY_NAMES = [
  "Outsourced HR Services",
  "Recruitment & Talent Acquisition",
  "Employment Law & Employee Relations",
  "Organisation Development & Change Management",
  "Compensation, Reward & Benefits",
  "Learning & Leadership Development",
  "Performance & Talent Management",
  "Employee Experience & Engagement",
  "HR Technology & People Analytics",
  "Strategic HR & Workforce Advisory",
];

const GUARANTEE_LANGUAGE = /\bguarantee(d|s)?\b|\bpromise(d|s)?\b|\b100%\b|\bwill (reduce|increase|improve|cut|boost|guarantee)\b/i;

function buildBreadcrumbTrail(categoryTitle: string, categorySlug: string) {
  return [
    routes.services,
    { id: categorySlug, label: categoryTitle, path: `/services/${categorySlug}/`, status: "confirmed" as const, readyToIndex: true },
  ];
}

describe("Service-family catalogue — structural integrity", () => {
  it("has exactly 10 service-family records in both the config and the content layer", () => {
    expect(serviceCategories.length).toBe(10);
    expect(serviceCategoryContent.length).toBe(10);
  });

  it("has every family's title matching the approved canonical name list exactly", () => {
    const actual = serviceCategories.map((c) => c.title).sort();
    const approved = [...APPROVED_FAMILY_NAMES].sort();
    expect(actual).toEqual(approved);
  });

  it("has one non-empty canonical name per family, with no duplicates", () => {
    const titles = serviceCategories.map((c) => c.title);
    for (const title of titles) expect(title.trim().length).toBeGreaterThan(0);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("has a non-empty introduction for every family", () => {
    for (const content of serviceCategoryContent) {
      expect(content.introduction.trim().length, `${content.slug} has an empty introduction`).toBeGreaterThan(0);
    }
  });

  it("has a unique meta description (summary) for every family, not duplicating any child service's metaDescription", () => {
    const summaries = serviceCategoryContent.map((c) => c.summary);
    expect(new Set(summaries).size).toBe(summaries.length);
  });

  it("has page-specific FAQs for every family", () => {
    for (const content of serviceCategoryContent) {
      expect(content.faqs.length, `${content.slug} has no FAQs`).toBeGreaterThan(0);
    }
  });

  it("has no FAQ question duplicated verbatim across the 10 families", () => {
    const allQuestions = serviceCategoryContent.flatMap((c) => c.faqs.map((f) => f.question));
    const seen = new Map<string, number>();
    for (const q of allQuestions) seen.set(q, (seen.get(q) ?? 0) + 1);
    const duplicates = [...seen.entries()].filter(([, count]) => count > 1).map(([q]) => q);
    expect(duplicates, `Duplicated FAQ questions: ${duplicates.join(" | ")}`).toEqual([]);
  });

  it("has no outcome statement containing guarantee-style language", () => {
    const offenders: string[] = [];
    for (const content of serviceCategoryContent) {
      for (const outcome of content.outcomes) {
        if (GUARANTEE_LANGUAGE.test(outcome)) offenders.push(`${content.slug}: "${outcome}"`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("has every relatedFamilySlugs entry pointing to a real, different family", () => {
    for (const content of serviceCategoryContent) {
      for (const relatedSlug of content.relatedFamilySlugs) {
        expect(relatedSlug, `${content.slug} lists itself as related`).not.toBe(content.slug);
        expect(getServiceCategory(relatedSlug), `${content.slug} -> unknown family ${relatedSlug}`).toBeDefined();
      }
    }
  });
});

describe("Service-family pages — rendered content, per family", () => {
  for (const category of serviceCategories) {
    const content = serviceCategoryContent.find((c) => c.slug === category.slug);
    const childServices = getServicesByCategory(category.slug);

    describe(category.title, () => {
      it("renders exactly one H1, equal to the approved family name, with the tagline visible as supporting text (not a second H1)", () => {
        if (!content) throw new Error(`Missing content for ${category.slug}`);
        const { getAllByRole, getByText } = render(
          <ServiceCategoryTemplate
            title={category.title}
            breadcrumbTrail={buildBreadcrumbTrail(category.title, category.slug)}
            category={content}
            childServices={childServices}
          />,
        );

        const h1s = getAllByRole("heading", { level: 1 });
        expect(h1s).toHaveLength(1);
        expect(h1s[0]).toHaveTextContent(category.title);

        // The tagline must still be visible somewhere on the page, but not
        // as the H1 text itself.
        expect(getByText(content.tagline)).toBeInTheDocument();
        expect(h1s[0]).not.toHaveTextContent(content.tagline);
      });

      it("lists every confirmed child service exactly once in the crawlable grid, each as a real link to its canonical URL", () => {
        if (!content) throw new Error(`Missing content for ${category.slug}`);
        const { getByTestId } = render(
          <ServiceCategoryTemplate
            title={category.title}
            breadcrumbTrail={buildBreadcrumbTrail(category.title, category.slug)}
            category={content}
            childServices={childServices}
          />,
        );

        const grid = getByTestId("child-service-grid");
        const gridLinks = within(grid).getAllByRole("link");
        expect(gridLinks).toHaveLength(childServices.length);

        for (const service of childServices) {
          const expectedHref = `/services/${service.slug}/`.replace(/\/$/, "");
          const matching = gridLinks.filter((el) => el.getAttribute("href")?.replace(/\/$/, "") === expectedHref);
          expect(matching, `${service.slug} should appear exactly once in the grid`).toHaveLength(1);
          expect(matching[0]).toHaveTextContent(service.title);
        }
      });

      it("emits FAQPage schema that matches the visible FAQ content exactly", () => {
        if (!content) throw new Error(`Missing content for ${category.slug}`);
        const { container, getByText } = render(
          <ServiceCategoryTemplate
            title={category.title}
            breadcrumbTrail={buildBreadcrumbTrail(category.title, category.slug)}
            category={content}
            childServices={childServices}
          />,
        );

        const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'));
        const faqScript = scripts.find((s) => s.innerHTML.includes('"FAQPage"'));
        expect(faqScript, `${category.slug} should emit FAQPage schema`).toBeDefined();

        const jsonLd = JSON.parse(faqScript!.innerHTML) as {
          mainEntity: { name: string; acceptedAnswer: { text: string } }[];
        };
        expect(jsonLd.mainEntity).toHaveLength(content.faqs.length);
        for (const faq of content.faqs) {
          expect(getByText(faq.question)).toBeInTheDocument();
          expect(getByText(faq.answer)).toBeInTheDocument();
          const schemaEntry = jsonLd.mainEntity.find((entry) => entry.name === faq.question);
          expect(schemaEntry?.acceptedAnswer.text).toBe(faq.answer);
        }
      });

      it("has a Service/BreadcrumbList JSON-LD shape matching the category's own name, description and canonical path", () => {
        if (!content) throw new Error(`Missing content for ${category.slug}`);
        const path = `/services/${category.slug}/`;
        const serviceLd = getServiceJsonLd({ name: category.title, description: content.summary, path });
        expect(serviceLd.name).toBe(category.title);
        expect(serviceLd.description).toBe(content.summary);
        expect(serviceLd.url).toContain(path);

        const breadcrumbLd = getBreadcrumbJsonLd(routes.home.label, buildBreadcrumbTrail(category.title, category.slug));
        const lastCrumb = breadcrumbLd.itemListElement.at(-1);
        expect(lastCrumb?.name).toBe(category.title);
        expect(lastCrumb?.item).toContain(path);
      });
    });
  }
});

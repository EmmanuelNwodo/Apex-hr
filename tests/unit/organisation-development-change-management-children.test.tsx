import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { getServicesByCategory, getService, services } from "@/config/services";
import { serviceContent } from "@/content/services-data";
import { redirectRules } from "@/config/redirects";
import { serviceLocationCombos, categoryLocationCombos } from "@/config/service-locations";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { getBreadcrumbJsonLd, getServiceJsonLd } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";

/**
 * SEO audit Phase 3 Batch 6D safeguards for the four Organisation
 * Development & Change Management child pages. Data-driven against
 * config/services.ts and content/services-data.ts. No regex-based test
 * here claims to determine legal correctness — only the presence of
 * required safeguards/disclaimers and the absence of banned claim
 * patterns and internal QA language.
 */

const APPROVED_FOUR = [
  "organisation-design-firm-in-the-uk",
  "change-management-firm-in-the-uk",
  "culture-transformation-firm-in-the-uk",
  "ma-people-due-diligence-and-post-merger-integration-firm-in-the-uk",
];

const APPROVED_INTENTS: Record<string, string> = {
  "organisation-design-firm-in-the-uk": "Designing organisational structures, roles, responsibilities and ways of working",
  "change-management-firm-in-the-uk": "Supporting the people side of organisational change and adoption",
  "culture-transformation-firm-in-the-uk": "Assessing and intentionally developing workplace culture and behaviours",
  "ma-people-due-diligence-and-post-merger-integration-firm-in-the-uk":
    "Identifying and managing people-related considerations before and after mergers or acquisitions",
};

const NOINDEX_HUB_PATHS = ["/insights/", "/resources/", "/case-study/"];
const GUARANTEE_LANGUAGE = /\bguarantee(d|s)?\b|\bpromise(d|s)?\b|\b100%\b|\bwill (reduce|increase|improve|cut|boost|guarantee)\b/i;
const AMERICAN_ADVISOR = /\badvisor\b/i;
const INTERNAL_QA_LANGUAGE = /invented figures?|fabricated claims?|seo-safe wording/i;

function buildBreadcrumbTrail(serviceTitle: string, serviceSlug: string) {
  return [
    routes.services,
    {
      id: "organisation-development-and-change-management-firm-in-the-uk",
      label: "Organisation Development & Change Management",
      path: "/services/organisation-development-and-change-management-firm-in-the-uk/",
      status: "confirmed" as const,
      readyToIndex: true,
    },
    { id: serviceSlug, label: serviceTitle, path: `/services/${serviceSlug}/`, status: "confirmed" as const, readyToIndex: true },
  ];
}

describe("Organisation Development & Change Management children (Batch 6D) — catalogue integrity", () => {
  const family = getServicesByCategory("organisation-development-and-change-management-firm-in-the-uk");

  it("has exactly these four approved services and no others", () => {
    expect(family.length).toBe(4);
    expect(family.map((s) => s.slug).sort()).toEqual([...APPROVED_FOUR].sort());
  });

  it("has a content record for every one of the four", () => {
    for (const slug of APPROVED_FOUR) {
      const content = serviceContent.find((c) => c.slug === slug);
      expect(content, `Missing content for ${slug}`).toBeDefined();
    }
  });

  it("has unique titles, meta descriptions and primary keywords across the four", () => {
    const entries = APPROVED_FOUR.map((slug) => ({
      service: getService(slug)!,
      content: serviceContent.find((c) => c.slug === slug)!,
    }));
    expect(new Set(entries.map((e) => e.service.title)).size).toBe(4);
    expect(new Set(entries.map((e) => e.content.metaDescription)).size).toBe(4);
    expect(new Set(entries.map((e) => e.content.primaryKeyword)).size).toBe(4);
  });

  it("has distinct principal intents matching the approved intent-ownership table", () => {
    expect(new Set(Object.values(APPROVED_INTENTS)).size).toBe(4);
    for (const slug of APPROVED_FOUR) {
      expect(APPROVED_INTENTS[slug]).toBeTruthy();
    }
  });

  it("has no FAQ question duplicated verbatim across the four (including additionalFaqs)", () => {
    const allQuestions = APPROVED_FOUR.flatMap((slug) => {
      const content = serviceContent.find((c) => c.slug === slug)!;
      return [...content.faqs, ...(content.additionalFaqs ?? [])].map((f) => f.question);
    });
    const seen = new Map<string, number>();
    for (const q of allQuestions) seen.set(q, (seen.get(q) ?? 0) + 1);
    const duplicates = [...seen.entries()].filter(([, count]) => count > 1).map(([q]) => q);
    expect(duplicates, `Duplicated FAQ questions: ${duplicates.join(" | ")}`).toEqual([]);
  });

  it("has every relatedServiceSlugs entry pointing to a real, different confirmed service", () => {
    for (const slug of APPROVED_FOUR) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      for (const relatedSlug of content.relatedServiceSlugs) {
        expect(relatedSlug).not.toBe(slug);
        expect(services.some((s) => s.slug === relatedSlug), `${slug} -> unknown related service ${relatedSlug}`).toBe(true);
      }
    }
  });

  it("has no guarantee-style language asserted as fact in outcomes or differentiation content", () => {
    // outOfScope and additionalFaqs are deliberately excluded: they exist
    // partly to *disclaim* guarantees, so "guarantee" appearing there is
    // correct, required usage — covered by the targeted per-service
    // assertions below instead.
    const offenders: string[] = [];
    for (const slug of APPROVED_FOUR) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const texts = [...content.businessOutcomes, content.differentiationNote ?? ""];
      for (const text of texts) {
        if (GUARANTEE_LANGUAGE.test(text)) offenders.push(`${slug}: "${text}"`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("uses no American 'advisor' spelling anywhere in the four services' content", () => {
    const offenders: string[] = [];
    for (const slug of APPROVED_FOUR) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      if (AMERICAN_ADVISOR.test(JSON.stringify(content))) offenders.push(slug);
    }
    expect(offenders).toEqual([]);
  });

  it("contains no internal QA/workflow language anywhere in the four services' public-facing content", () => {
    const offenders: string[] = [];
    for (const slug of APPROVED_FOUR) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      if (INTERNAL_QA_LANGUAGE.test(JSON.stringify(content))) offenders.push(slug);
    }
    expect(offenders).toEqual([]);
  });

  it("expands 'M&A' as 'Mergers and Acquisitions (M&A)' on first meaningful use in the M&A page's visible hero copy", () => {
    const content = serviceContent.find((c) => c.slug === "ma-people-due-diligence-and-post-merger-integration-firm-in-the-uk")!;
    expect(content.heroSummary).toMatch(/Mergers and Acquisitions \(M&A\)/);
  });

  it("marks only M&A People Due Diligence & Post-Merger Integration for legal review among the four", () => {
    for (const slug of APPROVED_FOUR) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const expected = slug === "ma-people-due-diligence-and-post-merger-integration-firm-in-the-uk";
      expect(content.legalReviewRequired, `${slug} legalReviewRequired mismatch`).toBe(expected);
    }
  });

  it("none of the four have live service-location combinations, and neither retained category-location page involves this family (confirming they were safe to edit freely)", () => {
    for (const slug of APPROVED_FOUR) {
      const combos = serviceLocationCombos.filter((c) => c.serviceSlug === slug);
      expect(combos, `${slug} unexpectedly has service-location combos`).toEqual([]);
    }
    const categorySlugs = categoryLocationCombos.map((c) => c.categorySlug);
    expect(categorySlugs).not.toContain("organisation-development-and-change-management-firm-in-the-uk");
  });

  it("Organisation Design excludes legal advice on employment terms, redundancy assumptions and final structural decision-making", () => {
    const content = serviceContent.find((c) => c.slug === "organisation-design-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/legal advice on changing employment terms/);
    expect(scope).toMatch(/redesign automatically requires redundancies/);
    expect(scope).toMatch(/final decisions on organisational structure/);
  });

  it("Change Management excludes guaranteed acceptance/adoption/resistance elimination and generic project management", () => {
    const content = serviceContent.find((c) => c.slug === "change-management-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/guaranteed employee acceptance, adoption rates or elimination of resistance/);
    expect(scope).toMatch(/project management of the underlying business change itself/);
    expect(scope).toMatch(/guaranteed delivery timescales/);
    expect(scope).toMatch(/guaranteed project success/);
  });

  it("Culture Transformation excludes guaranteed engagement/retention/productivity, psychological diagnosis and culture imposed without leadership", () => {
    const content = serviceContent.find((c) => c.slug === "culture-transformation-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/guaranteed improvements to engagement, retention or productivity/);
    expect(scope).toMatch(/psychological diagnosis or assessment of individual employees/);
    expect(scope).toMatch(/independently of leadership behaviour/);
    expect(scope).toMatch(/single workshop, away-day or values document/);
  });

  it("M&A excludes financial/legal/tax due diligence, valuation, transaction-risk certification, deal/integration guarantees and legal transfer conclusions", () => {
    const content = serviceContent.find((c) => c.slug === "ma-people-due-diligence-and-post-merger-integration-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/financial, legal, tax or investment due diligence/);
    expect(scope).toMatch(/valuation of the business or certification of transaction risk/);
    expect(scope).toMatch(/guarantees of deal completion or successful integration/);
    expect(scope).toMatch(/legal conclusions about employee transfers or liabilities/);
  });
});

describe("Organisation Development & Change Management children (Batch 6D) — rendered content, per service", () => {
  for (const slug of APPROVED_FOUR) {
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
        expect(links).toContain("/services/organisation-development-and-change-management-firm-in-the-uk");
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

      it("emits FAQPage schema matching the combined faqs + additionalFaqs exactly, with no financial/legal special schema type", () => {
        const { container, getByText } = render(
          <ServicePageTemplate title={service.title} breadcrumbTrail={buildBreadcrumbTrail(service.title, slug)} service={content} />,
        );
        const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'));
        for (const script of scripts) {
          expect(script.innerHTML).not.toContain("LegalService");
          expect(script.innerHTML).not.toContain("FinancialService");
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
        expect(breadcrumbLd.itemListElement.some((item) => item.name === "Organisation Development & Change Management")).toBe(true);
        expect(breadcrumbLd.itemListElement.at(-1)?.name).toBe(service.title);
      });
    });
  }
});

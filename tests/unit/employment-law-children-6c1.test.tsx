import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { getServicesByCategory, getService, services } from "@/config/services";
import { serviceContent } from "@/content/services-data";
import { redirectRules } from "@/config/redirects";
import { serviceLocationCombos } from "@/config/service-locations";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { ServiceLocationTemplate } from "@/components/templates/service-location-template";
import { getBreadcrumbJsonLd, getServiceJsonLd } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";

/**
 * SEO audit Phase 3 Batch 6C1 safeguards for the first four Employment Law
 * & Employee Relations child pages. Deliberately avoids regex-based
 * assertions about legal *correctness* (per this batch's explicit
 * instruction) — checks here confirm the presence of required
 * safeguards/disclaimers and the absence of specific invented figures,
 * not whether any legal statement is itself accurate.
 */

const APPROVED_FOUR = [
  "redundancy-and-restructuring-support-firm-in-the-uk",
  "tupe-advisory-firm-in-the-uk",
  "workplace-investigations-firm-in-the-uk",
  "workplace-mediation-and-conflict-resolution-firm-in-the-uk",
];

const NOINDEX_HUB_PATHS = ["/insights/", "/resources/", "/case-study/"];
const UNQUALIFIED_GUARANTEE = /\bguarantee(d|s)?\s+(compliance|lawful|legal|resolution|outcome|confidential)/i;
const AMERICAN_ADVISOR = /\badvisor\b/i;
// A blunt net for accidentally-invented specific statutory figures, not a
// legal-correctness check — flags any currency amount or "N weeks/years"
// style figure appearing in this batch's new content.
const INVENTED_FIGURE = /£\d|\b\d+\s*(weeks?|years?|days?)\b.{0,20}(pay|notice|service|threshold|qualifying)/i;

function buildBreadcrumbTrail(serviceTitle: string, serviceSlug: string) {
  return [
    routes.services,
    {
      id: "employment-law-and-employee-relations-firm-in-the-uk",
      label: "Employment Law & Employee Relations",
      path: "/services/employment-law-and-employee-relations-firm-in-the-uk/",
      status: "confirmed" as const,
      readyToIndex: true,
    },
    { id: serviceSlug, label: serviceTitle, path: `/services/${serviceSlug}/`, status: "confirmed" as const, readyToIndex: true },
  ];
}

describe("Employment Law children (Batch 6C1) — catalogue integrity", () => {
  it("has exactly these four approved services, confirmed as members of Employment Law & Employee Relations", () => {
    const family = getServicesByCategory("employment-law-and-employee-relations-firm-in-the-uk");
    for (const slug of APPROVED_FOUR) {
      expect(family.some((s) => s.slug === slug), `${slug} missing from family`).toBe(true);
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

  it("has all four records marked legalReviewRequired: true", () => {
    for (const slug of APPROVED_FOUR) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      expect(content.legalReviewRequired, `${slug} should be flagged for legal review`).toBe(true);
    }
  });

  it("expands TUPE as 'Transfer of Undertakings (Protection of Employment)' on first meaningful use", () => {
    const content = serviceContent.find((c) => c.slug === "tupe-advisory-firm-in-the-uk")!;
    // First meaningful use = heroSummary, the first body text after the H1
    // (the H1 itself is just the approved service name "TUPE Advisory").
    expect(content.heroSummary).toContain("Transfer of Undertakings (Protection of Employment)");
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

  it("has an explicit legal-service boundary (outOfScope) for every one of the four", () => {
    for (const slug of APPROVED_FOUR) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      expect(content.outOfScope?.length, `${slug} should have an outOfScope list`).toBeGreaterThan(0);
    }
  });

  it("has no unqualified guarantee of a legal or resolution outcome anywhere in the four records", () => {
    const offenders: string[] = [];
    for (const slug of APPROVED_FOUR) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const allText = JSON.stringify(content);
      if (UNQUALIFIED_GUARANTEE.test(allText)) offenders.push(slug);
    }
    expect(offenders).toEqual([]);
  });

  it("has no invented specific statutory figure (currency amount, or a weeks/years threshold tied to pay, notice or qualifying service) in the four records", () => {
    const offenders: string[] = [];
    for (const slug of APPROVED_FOUR) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const allText = JSON.stringify(content);
      if (INVENTED_FIGURE.test(allText)) offenders.push(slug);
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

  it("Workplace Investigations explicitly declines to guarantee confidentiality or legal privilege", () => {
    const content = serviceContent.find((c) => c.slug === "workplace-investigations-firm-in-the-uk")!;
    const allText = JSON.stringify(content).toLowerCase();
    expect(allText).toMatch(/complete confidentiality cannot be guaranteed/);
    expect(allText).toMatch(/not automatically.*privilege|privilege.*not automatically|does not automatically carry|legal privilege depends/);
  });

  it("Workplace Mediation explicitly declines to guarantee a resolution and states it is not suitable for every dispute", () => {
    const content = serviceContent.find((c) => c.slug === "workplace-mediation-and-conflict-resolution-firm-in-the-uk")!;
    const allText = JSON.stringify(content).toLowerCase();
    expect(allText).toMatch(/cannot be guaranteed/);
    expect(allText).toMatch(/not (appropriate for every dispute|always the appropriate route)/);
  });
});

describe("Employment Law children (Batch 6C1) — rendered content, per service", () => {
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
        expect(links).toContain("/services/employment-law-and-employee-relations-firm-in-the-uk");
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

      it("emits FAQPage schema matching the combined faqs + additionalFaqs exactly", () => {
        if (allFaqs.length === 0) return;
        const { container, getByText } = render(
          <ServicePageTemplate title={service.title} breadcrumbTrail={buildBreadcrumbTrail(service.title, slug)} service={content} />,
        );
        const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'));
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

      it("never emits LegalService schema and has a Service JSON-LD shape matching name/description/path", () => {
        const path = `/services/${slug}/`;
        const serviceLd = getServiceJsonLd({ name: service.title, description: content.metaDescription, path });
        expect(serviceLd["@type"]).toBe("Service");
        expect(serviceLd.name).toBe(service.title);
        expect(serviceLd.description).toBe(content.metaDescription);
        expect(serviceLd.url).toContain(path);

        const { container } = render(
          <ServicePageTemplate title={service.title} breadcrumbTrail={buildBreadcrumbTrail(service.title, slug)} service={content} />,
        );
        const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'));
        for (const script of scripts) {
          expect(script.innerHTML).not.toContain("LegalService");
        }

        const trail = buildBreadcrumbTrail(service.title, slug);
        const breadcrumbLd = getBreadcrumbJsonLd(routes.home.label, trail);
        expect(breadcrumbLd.itemListElement.some((item) => item.name === "Employment Law & Employee Relations")).toBe(true);
        expect(breadcrumbLd.itemListElement.at(-1)?.name).toBe(service.title);
      });
    });
  }
});

describe("Employment Law children (Batch 6C1) — service-location page unaffected", () => {
  // Redundancy & Restructuring Support has one live combination
  // (Staffordshire) — confirmed via src/config/service-locations.ts.
  const serviceSlug = "redundancy-and-restructuring-support-firm-in-the-uk";
  const locationSlug = "staffordshire";
  const heroSummary =
    "Practical HR support for redundancy and restructuring situations, focused on running a fair, well-documented process.";
  const whatItIncludes = [
    "Process planning and documentation support",
    "Selection-criteria and consultation guidance",
    "Support drafting communications and letters",
    "Manager briefing and support through the process",
  ];

  it(`${serviceSlug} service-location page (${locationSlug}) still renders the original shared fields`, () => {
    const combo = serviceLocationCombos.find((c) => c.serviceSlug === serviceSlug && c.locationSlug === locationSlug);
    expect(combo, `No combo found for ${serviceSlug}-${locationSlug}`).toBeDefined();

    const content = serviceContent.find((c) => c.slug === serviceSlug)!;
    const service = getService(serviceSlug)!;

    // Confirm the live data still matches the hardcoded pre-batch baseline.
    expect(content.heroSummary).toBe(heroSummary);
    expect(content.whatItIncludes).toEqual(whatItIncludes);

    const { getByText } = render(
      <ServiceLocationTemplate
        breadcrumbTrail={[]}
        entityTitle={service.title}
        entityHref={`/services/${serviceSlug}/`}
        entitySummary={content.heroSummary}
        bulletListTitle="What this includes"
        bulletList={content.whatItIncludes}
        locationTitle="Staffordshire"
        locationRegion="Test Region"
        locationHref="/locations/staffordshire/"
        localContext="Test local context."
        faqs={[...content.faqs.slice(0, 3)]}
      />,
    );

    expect(getByText(heroSummary)).toBeInTheDocument();
    for (const item of whatItIncludes) {
      expect(getByText(item)).toBeInTheDocument();
    }
    for (const extra of content.additionalFaqs ?? []) {
      expect(() => getByText(extra.question)).toThrow();
    }
  });
});

describe("Employment Law children (Batch 6C1) — related-service integrity", () => {
  it("has every relatedServiceSlugs entry pointing to a real, different confirmed service", () => {
    for (const slug of APPROVED_FOUR) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      for (const relatedSlug of content.relatedServiceSlugs) {
        expect(relatedSlug).not.toBe(slug);
        expect(services.some((s) => s.slug === relatedSlug), `${slug} -> unknown related service ${relatedSlug}`).toBe(true);
      }
    }
  });
});

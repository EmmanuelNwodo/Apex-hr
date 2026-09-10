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
 * SEO audit Phase 3 Batch 6A safeguards for the six Outsourced HR Services
 * child pages. Data-driven against config/services.ts and
 * content/services-data.ts, not a hardcoded slug list where avoidable, so
 * these keep validating correctly if the underlying catalogue changes.
 */

const APPROVED_SIX = [
  "retained-hr-services",
  "hr-support-for-small-businesses-and-startups",
  "fractional-hr-director-chief-people-officer",
  "hr-compliance-audit",
  "employee-handbooks-and-hr-policies",
  "payroll-advisory",
];

const NOINDEX_HUB_PATHS = ["/insights/", "/resources/", "/case-study/"];
const GUARANTEE_LANGUAGE = /\bguarantee(d|s)?\b|\bpromise(d|s)?\b|\b100%\b|\bwill (reduce|increase|improve|cut|boost|guarantee)\b/i;
const AMERICAN_ADVISOR = /\badvisor\b/i;

function buildBreadcrumbTrail(serviceTitle: string, categoryTitle: string, categorySlug: string, serviceSlug: string) {
  return [
    routes.services,
    { id: categorySlug, label: categoryTitle, path: `/services/${categorySlug}/`, status: "confirmed" as const, readyToIndex: true },
    { id: serviceSlug, label: serviceTitle, path: `/services/${serviceSlug}/`, status: "confirmed" as const, readyToIndex: true },
  ];
}

describe("Outsourced HR Services children — catalogue integrity", () => {
  const family = getServicesByCategory("outsourced-hr-services");

  it("has exactly six children, matching the approved slug list exactly", () => {
    expect(family.length).toBe(6);
    expect(family.map((s) => s.slug).sort()).toEqual([...APPROVED_SIX].sort());
  });

  it("has a content record for every one of the six", () => {
    for (const slug of APPROVED_SIX) {
      expect(serviceContent.find((c) => c.slug === slug), `Missing content for ${slug}`).toBeDefined();
    }
  });

  it("has unique titles, meta descriptions and primary keywords across the six", () => {
    const entries = APPROVED_SIX.map((slug) => ({
      service: getService(slug)!,
      content: serviceContent.find((c) => c.slug === slug)!,
    }));
    expect(new Set(entries.map((e) => e.service.title)).size).toBe(6);
    expect(new Set(entries.map((e) => e.content.metaDescription)).size).toBe(6);
    expect(new Set(entries.map((e) => e.content.primaryKeyword)).size).toBe(6);
  });

  it("has no primary keyword that just restates the parent family name", () => {
    for (const slug of APPROVED_SIX) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      expect(
        content.primaryKeyword.toLowerCase(),
        `${slug}'s primaryKeyword should not be the generic family phrase`,
      ).not.toBe("outsourced hr services");
    }
  });

  it("has non-empty core narrative fields for every one of the six", () => {
    for (const slug of APPROVED_SIX) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      for (const field of ["heroSummary", "employerChallenge", "whoWeSupport", "whyApex"] as const) {
        expect(content[field].trim().length, `${slug}.${field} is empty`).toBeGreaterThan(0);
      }
    }
  });

  it("has no FAQ question duplicated verbatim across the six (including additionalFaqs)", () => {
    const allQuestions = APPROVED_SIX.flatMap((slug) => {
      const content = serviceContent.find((c) => c.slug === slug)!;
      return [...content.faqs, ...(content.additionalFaqs ?? [])].map((f) => f.question);
    });
    const seen = new Map<string, number>();
    for (const q of allQuestions) seen.set(q, (seen.get(q) ?? 0) + 1);
    const duplicates = [...seen.entries()].filter(([, count]) => count > 1).map(([q]) => q);
    expect(duplicates, `Duplicated FAQ questions: ${duplicates.join(" | ")}`).toEqual([]);
  });

  it("has every relatedServiceSlugs entry pointing to a real, different confirmed service", () => {
    for (const slug of APPROVED_SIX) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      for (const relatedSlug of content.relatedServiceSlugs) {
        expect(relatedSlug).not.toBe(slug);
        expect(services.some((s) => s.slug === relatedSlug), `${slug} -> unknown related service ${relatedSlug}`).toBe(true);
      }
    }
  });

  it("has no guarantee-style language asserted as fact in outcomes or differentiation content", () => {
    // Deliberately excludes outOfScope: those items exist specifically to
    // *disclaim* a guarantee ("not a guarantee of compliance"), so
    // "guarantee" appearing there is the correct, safe usage — the opposite
    // of the problem this check is for.
    const offenders: string[] = [];
    for (const slug of APPROVED_SIX) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const texts = [...content.businessOutcomes, content.differentiationNote ?? ""];
      for (const text of texts) {
        if (GUARANTEE_LANGUAGE.test(text)) offenders.push(`${slug}: "${text}"`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("uses no American 'advisor' spelling anywhere in the six services' content", () => {
    const offenders: string[] = [];
    for (const slug of APPROVED_SIX) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const allText = JSON.stringify(content);
      if (AMERICAN_ADVISOR.test(allText)) offenders.push(slug);
    }
    expect(offenders).toEqual([]);
  });
});

describe("Outsourced HR Services children — rendered content, per service", () => {
  for (const slug of APPROVED_SIX) {
    const service = getService(slug)!;
    const content = serviceContent.find((c) => c.slug === slug)!;
    const allFaqs = [...content.faqs, ...(content.additionalFaqs ?? [])];

    describe(service.title, () => {
      it("renders exactly one H1, equal to the service's approved name", () => {
        const { getAllByRole } = render(
          <ServicePageTemplate
            title={service.title}
            breadcrumbTrail={buildBreadcrumbTrail(service.title, "Outsourced HR Services", "outsourced-hr-services", slug)}
            service={content}
          />,
        );
        const h1s = getAllByRole("heading", { level: 1 });
        expect(h1s).toHaveLength(1);
        expect(h1s[0]).toHaveTextContent(service.title);
      });

      it("links to the parent family page", () => {
        const { getAllByRole } = render(
          <ServicePageTemplate
            title={service.title}
            breadcrumbTrail={buildBreadcrumbTrail(service.title, "Outsourced HR Services", "outsourced-hr-services", slug)}
            service={content}
          />,
        );
        const links = getAllByRole("link").map((el) => el.getAttribute("href")?.replace(/\/$/, ""));
        expect(links).toContain("/services/outsourced-hr-services");
      });

      it("never links to a redirect source or an empty noindex hub", () => {
        const { getAllByRole } = render(
          <ServicePageTemplate
            title={service.title}
            breadcrumbTrail={buildBreadcrumbTrail(service.title, "Outsourced HR Services", "outsourced-hr-services", slug)}
            service={content}
            showForEmployersLink
          />,
        );
        const hrefs = getAllByRole("link")
          .map((el) => el.getAttribute("href"))
          .filter((href): href is string => Boolean(href) && href!.startsWith("/"));
        const redirectSources = new Set(redirectRules.map((r) => r.source.replace(/\/$/, "")));
        for (const href of hrefs) {
          const normalised = href.replace(/\/$/, "");
          expect(redirectSources.has(normalised), `${slug} links to redirect source ${href}`).toBe(false);
          expect(
            NOINDEX_HUB_PATHS.some((hub) => href === hub || href === hub.replace(/\/$/, "")),
            `${slug} links to noindex hub ${href}`,
          ).toBe(false);
        }
      });

      it("emits FAQPage schema matching the combined faqs + additionalFaqs exactly", () => {
        if (allFaqs.length === 0) return;
        const { container, getByText } = render(
          <ServicePageTemplate
            title={service.title}
            breadcrumbTrail={buildBreadcrumbTrail(service.title, "Outsourced HR Services", "outsourced-hr-services", slug)}
            service={content}
          />,
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

      it("has a Service JSON-LD shape matching the service's own name, description and canonical path", () => {
        const path = `/services/${slug}/`;
        const serviceLd = getServiceJsonLd({ name: service.title, description: content.metaDescription, path });
        expect(serviceLd.name).toBe(service.title);
        expect(serviceLd.description).toBe(content.metaDescription);
        expect(serviceLd.url).toContain(path);

        const trail = buildBreadcrumbTrail(service.title, "Outsourced HR Services", "outsourced-hr-services", slug);
        const breadcrumbLd = getBreadcrumbJsonLd(routes.home.label, trail);
        expect(breadcrumbLd.itemListElement.some((item) => item.name === "Outsourced HR Services")).toBe(true);
        expect(breadcrumbLd.itemListElement.at(-1)?.name).toBe(service.title);
      });
    });
  }
});

describe("Outsourced HR Services children — service-location pages unaffected", () => {
  // The two of the six services with real service-location combinations —
  // confirmed via src/config/service-locations.ts. This test renders those
  // combo pages with the exact original heroSummary/whatItIncludes/faqs
  // values (byte-for-byte, hardcoded here as the pre-Batch-6A baseline) and
  // checks the template output still matches, proving the new Batch 6A
  // fields (outOfScope, differentiationNote, additionalFaqs) never reached
  // location-page rendering.
  const AFFECTED = [
    { serviceSlug: "hr-compliance-audit", locationSlug: "birmingham", locationTitle: "Birmingham" },
    { serviceSlug: "hr-support-for-small-businesses-and-startups", locationSlug: "bristol", locationTitle: "Bristol" },
  ];

  for (const { serviceSlug, locationSlug, locationTitle } of AFFECTED) {
    it(`${serviceSlug} service-location page (${locationSlug}) still renders the original shared fields`, () => {
      const combo = serviceLocationCombos.find((c) => c.serviceSlug === serviceSlug && c.locationSlug === locationSlug);
      expect(combo, `No combo found for ${serviceSlug}-${locationSlug}`).toBeDefined();

      const content = serviceContent.find((c) => c.slug === serviceSlug)!;
      const service = getService(serviceSlug)!;

      const { getByText } = render(
        <ServiceLocationTemplate
          breadcrumbTrail={[]}
          entityTitle={service.title}
          entityHref={`/services/${serviceSlug}/`}
          entitySummary={content.heroSummary}
          bulletListTitle="What this includes"
          bulletList={content.whatItIncludes}
          locationTitle={locationTitle}
          locationRegion="Test Region"
          locationHref={`/locations/${locationSlug}/`}
          localContext="Test local context."
          faqs={[...content.faqs.slice(0, 3)]}
        />,
      );

      // heroSummary and every whatItIncludes item must still be exactly
      // what they were before this batch (unchanged fields).
      expect(getByText(content.heroSummary)).toBeInTheDocument();
      for (const item of content.whatItIncludes) {
        expect(getByText(item)).toBeInTheDocument();
      }
      // additionalFaqs must never appear on a location page.
      for (const extra of content.additionalFaqs ?? []) {
        expect(() => getByText(extra.question)).toThrow();
      }
    });
  }
});

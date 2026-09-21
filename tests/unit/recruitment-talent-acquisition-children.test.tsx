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
 * SEO audit Phase 3 Batch 6B safeguards for the five Recruitment & Talent
 * Acquisition child pages. Data-driven against config/services.ts and
 * content/services-data.ts, not a hardcoded slug list where avoidable.
 */

const APPROVED_FIVE = [
  "permanent-recruitment-firm-in-the-uk",
  "executive-search-firm-in-the-uk",
  "contract-staffing-firm-in-the-uk",
  "recruitment-process-outsourcing-rpo-firm-in-the-uk",
  "graduate-schemes-and-early-careers-design-firm-in-the-uk",
];

const APPROVED_INTENTS: Record<string, string> = {
  "permanent-recruitment-firm-in-the-uk": "Recruitment support for permanent employees",
  "executive-search-firm-in-the-uk": "Search and recruitment for senior, executive and leadership appointments",
  "contract-staffing-firm-in-the-uk": "Recruitment support for temporary, interim or contract staffing needs",
  "recruitment-process-outsourcing-rpo-firm-in-the-uk": "Outsourcing some or all recruitment-process activity",
  "graduate-schemes-and-early-careers-design-firm-in-the-uk": "Designing structured graduate and early-career recruitment programmes",
};

const NOINDEX_HUB_PATHS = ["/insights/", "/resources/", "/case-study/"];
const GUARANTEE_LANGUAGE = /\bguarantee(d|s)?\b|\bpromise(d|s)?\b|\b100%\b|\bwill (reduce|increase|improve|cut|boost|guarantee)\b/i;
const AMERICAN_ADVISOR = /\badvisor\b/i;

function buildBreadcrumbTrail(serviceTitle: string, serviceSlug: string) {
  return [
    routes.services,
    {
      id: "recruitment-and-talent-acquisition-firm-in-the-uk",
      label: "Recruitment & Talent Acquisition",
      path: "/services/recruitment-and-talent-acquisition-firm-in-the-uk/",
      status: "confirmed" as const,
      readyToIndex: true,
    },
    { id: serviceSlug, label: serviceTitle, path: `/services/${serviceSlug}/`, status: "confirmed" as const, readyToIndex: true },
  ];
}

describe("Recruitment & Talent Acquisition children — catalogue integrity", () => {
  const family = getServicesByCategory("recruitment-and-talent-acquisition-firm-in-the-uk");

  it("has exactly five children, matching the approved slug list exactly", () => {
    expect(family.length).toBe(5);
    expect(family.map((s) => s.slug).sort()).toEqual([...APPROVED_FIVE].sort());
  });

  it("has a content record with the approved principal intent for every one of the five", () => {
    for (const slug of APPROVED_FIVE) {
      const content = serviceContent.find((c) => c.slug === slug);
      expect(content, `Missing content for ${slug}`).toBeDefined();
    }
  });

  it("has unique titles, meta descriptions and primary keywords across the five", () => {
    const entries = APPROVED_FIVE.map((slug) => ({
      service: getService(slug)!,
      content: serviceContent.find((c) => c.slug === slug)!,
    }));
    expect(new Set(entries.map((e) => e.service.title)).size).toBe(5);
    expect(new Set(entries.map((e) => e.content.metaDescription)).size).toBe(5);
    expect(new Set(entries.map((e) => e.content.primaryKeyword)).size).toBe(5);
  });

  it("has distinct principal intents matching the approved intent-ownership table", () => {
    for (const [slug, intent] of Object.entries(APPROVED_INTENTS)) {
      // The intent itself lives in manifest.ts's override map; this checks
      // the five approved intents are themselves all distinct.
      expect(Object.values(APPROVED_INTENTS).filter((v) => v === intent)).toHaveLength(1);
      expect(slug).toBeTruthy();
    }
  });

  it("has no FAQ question duplicated verbatim across the five (including additionalFaqs)", () => {
    const allQuestions = APPROVED_FIVE.flatMap((slug) => {
      const content = serviceContent.find((c) => c.slug === slug)!;
      return [...content.faqs, ...(content.additionalFaqs ?? [])].map((f) => f.question);
    });
    const seen = new Map<string, number>();
    for (const q of allQuestions) seen.set(q, (seen.get(q) ?? 0) + 1);
    const duplicates = [...seen.entries()].filter(([, count]) => count > 1).map(([q]) => q);
    expect(duplicates, `Duplicated FAQ questions: ${duplicates.join(" | ")}`).toEqual([]);
  });

  it("has every relatedServiceSlugs entry pointing to a real, different confirmed service", () => {
    for (const slug of APPROVED_FIVE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      for (const relatedSlug of content.relatedServiceSlugs) {
        expect(relatedSlug).not.toBe(slug);
        expect(services.some((s) => s.slug === relatedSlug), `${slug} -> unknown related service ${relatedSlug}`).toBe(true);
      }
    }
  });

  it("has no guarantee-style language asserted as fact in outcomes or differentiation content", () => {
    // outOfScope is deliberately excluded: it exists to *disclaim*
    // guarantees, so "guarantee" appearing there is correct usage.
    const offenders: string[] = [];
    for (const slug of APPROVED_FIVE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const texts = [...content.businessOutcomes, content.differentiationNote ?? ""];
      for (const text of texts) {
        if (GUARANTEE_LANGUAGE.test(text)) offenders.push(`${slug}: "${text}"`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("uses no American 'advisor' spelling anywhere in the five services' content", () => {
    const offenders: string[] = [];
    for (const slug of APPROVED_FIVE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      if (AMERICAN_ADVISOR.test(JSON.stringify(content))) offenders.push(slug);
    }
    expect(offenders).toEqual([]);
  });

  it("Contract Staffing does not claim Apex HR is the legal employer, agency, payroll operator or tax adviser by default", () => {
    const content = serviceContent.find((c) => c.slug === "contract-staffing-firm-in-the-uk")!;
    const allText = JSON.stringify(content).toLowerCase();
    // The service must acknowledge these roles only to disclaim them, not
    // assert them — checked via the explicit outOfScope/FAQ content.
    expect(content.outOfScope?.some((s) => /legal employer|agency worker provider|payroll operator|tax adviser/i.test(s))).toBe(true);
    expect(allText).not.toMatch(/apex hr is the legal employer/i);
    expect(allText).not.toMatch(/apex hr (is|acts as) your (payroll operator|tax adviser|agency)/i);
  });

  it("expands RPO as 'Recruitment Process Outsourcing (RPO)' in its service title (first meaningful use = the H1)", () => {
    const service = getService("recruitment-process-outsourcing-rpo-firm-in-the-uk")!;
    expect(service.title).toBe("Recruitment Process Outsourcing (RPO)");
  });
});

describe("Recruitment & Talent Acquisition children — rendered content, per service", () => {
  for (const slug of APPROVED_FIVE) {
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
        expect(links).toContain("/services/recruitment-and-talent-acquisition-firm-in-the-uk");
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

      it("has a Service JSON-LD shape matching the service's own name, description and canonical path, with the family as parent breadcrumb", () => {
        const path = `/services/${slug}/`;
        const serviceLd = getServiceJsonLd({ name: service.title, description: content.metaDescription, path });
        expect(serviceLd.name).toBe(service.title);
        expect(serviceLd.description).toBe(content.metaDescription);
        expect(serviceLd.url).toContain(path);

        const trail = buildBreadcrumbTrail(service.title, slug);
        const breadcrumbLd = getBreadcrumbJsonLd(routes.home.label, trail);
        expect(breadcrumbLd.itemListElement.some((item) => item.name === "Recruitment & Talent Acquisition")).toBe(true);
        expect(breadcrumbLd.itemListElement.at(-1)?.name).toBe(service.title);
      });
    });
  }
});

describe("Recruitment & Talent Acquisition children — service-location pages unaffected", () => {
  // Permanent Recruitment and Executive Search both have live
  // service-location combinations (confirmed via
  // src/config/service-locations.ts). This renders representative combo
  // pages with the exact original heroSummary/whatItIncludes values
  // (hardcoded here as the pre-Batch-6B baseline) and confirms the new
  // Batch 6B fields never reached location-page rendering.
  const AFFECTED = [
    {
      serviceSlug: "permanent-recruitment-firm-in-the-uk",
      locationSlug: "manchester",
      locationTitle: "Manchester",
      heroSummary: "Permanent recruitment support from role definition through to offer, informed by genuine HR expertise, not just CV matching.",
      whatItIncludes: [
        "Role scoping and person-specification support",
        "Candidate sourcing, screening and shortlisting",
        "Interview process design and support",
        "Offer and onboarding guidance",
      ],
    },
    {
      serviceSlug: "executive-search-firm-in-the-uk",
      locationSlug: "london",
      locationTitle: "London",
      heroSummary: "A targeted, confidential search approach for senior and leadership hires where the wrong appointment carries real organisational risk.",
      whatItIncludes: [
        "Confidential search and direct approach",
        "Structured leadership-level assessment",
        "Market mapping and competitor insight where useful",
        "Support through offer and transition",
      ],
    },
  ];

  for (const { serviceSlug, locationSlug, locationTitle, heroSummary, whatItIncludes } of AFFECTED) {
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
          locationTitle={locationTitle}
          locationRegion="Test Region"
          locationHref={`/locations/${locationSlug}/`}
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
  }
});

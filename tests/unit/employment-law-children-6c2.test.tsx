import { describe, expect, it } from "vitest";
import { render, within } from "@testing-library/react";
import { getServicesByCategory, getService, services, getServiceCategory } from "@/config/services";
import { serviceContent } from "@/content/services-data";
import { redirectRules } from "@/config/redirects";
import { serviceLocationCombos, categoryLocationCombos, getChildServicesForCategoryCombo } from "@/config/service-locations";
import { getLocation } from "@/config/locations";
import { locationContent } from "@/content/locations-data";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { ServiceLocationTemplate } from "@/components/templates/service-location-template";
import { CategoryLocationTemplate } from "@/components/templates/category-location-template";
import { getBreadcrumbJsonLd, getServiceJsonLd } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";

/**
 * SEO audit Phase 3 Batch 6C2 safeguards for the remaining four Employment
 * Law & Employee Relations child pages, plus the HR Compliance Audit
 * shared-wording regression check. No regex-based test here claims to
 * determine legal *correctness* — only the presence of required
 * safeguards/disclaimers and the absence of the retired "independent"
 * wording.
 */

const APPROVED_FOUR = [
  "employment-tribunal-hr-support",
  "outplacement-and-career-transition-services",
  "industrial-relations-and-trade-union-negotiations",
  "skilled-worker-sponsorship-hr-support",
];

const NOINDEX_HUB_PATHS = ["/insights/", "/resources/", "/case-study/"];
const UNQUALIFIED_GUARANTEE = /\bguarantee(d|s)?\s+(compliance|lawful|legal|resolution|outcome|confidential|visa|licence|placement|job|interview)/i;
const AMERICAN_ADVISOR = /\badvisor\b/i;
const INVENTED_FIGURE = /£\d|\b\d+\s*(weeks?|years?|days?)\b.{0,20}(pay|notice|service|threshold|qualifying|salary|fee)/i;

function buildBreadcrumbTrail(serviceTitle: string, serviceSlug: string) {
  return [
    routes.services,
    {
      id: "employment-law-and-employee-relations",
      label: "Employment Law & Employee Relations",
      path: "/services/employment-law-and-employee-relations/",
      status: "confirmed" as const,
      readyToIndex: true,
    },
    { id: serviceSlug, label: serviceTitle, path: `/services/${serviceSlug}/`, status: "confirmed" as const, readyToIndex: true },
  ];
}

describe("Employment Law children (Batch 6C2) — catalogue integrity", () => {
  it("has exactly these four approved services, completing all 8 members of Employment Law & Employee Relations", () => {
    const family = getServicesByCategory("employment-law-and-employee-relations");
    expect(family.length).toBe(8);
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

  it("marks Employment Tribunal HR Support, Industrial Relations and Skilled Worker Sponsorship for legal review", () => {
    for (const slug of [
      "employment-tribunal-hr-support",
      "industrial-relations-and-trade-union-negotiations",
      "skilled-worker-sponsorship-hr-support",
    ]) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      expect(content.legalReviewRequired, `${slug} should be flagged for legal review`).toBe(true);
    }
  });

  it("none of the four have live service-location combinations (confirming they were safe to edit freely)", () => {
    for (const slug of APPROVED_FOUR) {
      const combos = serviceLocationCombos.filter((c) => c.serviceSlug === slug);
      expect(combos, `${slug} unexpectedly has service-location combos`).toEqual([]);
    }
  });

  it("has no unqualified guarantee of a legal, visa, licence or placement outcome in businessOutcomes (the one field meant to state positive results)", () => {
    // Scoped to businessOutcomes deliberately: outOfScope and
    // additionalFaqs legitimately contain phrases like "cannot guarantee
    // placement" or "A guarantee of ... is not included" — negations that
    // are the correct, safe usage — checked directly by the per-service
    // assertions below instead of a blunt whole-record scan.
    const offenders: string[] = [];
    for (const slug of APPROVED_FOUR) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const allText = content.businessOutcomes.join(" ");
      if (UNQUALIFIED_GUARANTEE.test(allText)) offenders.push(slug);
    }
    expect(offenders).toEqual([]);
  });

  it("has no invented specific statutory or salary figure in the four records", () => {
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

  it("Employment Tribunal HR Support explicitly excludes legal representation, pleadings and outcome predictions", () => {
    const content = serviceContent.find((c) => c.slug === "employment-tribunal-hr-support")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/legal representation/);
    expect(scope).toMatch(/pleadings/);
    expect(scope).toMatch(/predicting or guaranteeing/);
    expect(scope).toMatch(/privilege/);
  });

  it("Outplacement explicitly declines to guarantee placement and states participants are never auto-enrolled in the candidate database", () => {
    const content = serviceContent.find((c) => c.slug === "outplacement-and-career-transition-services")!;
    const allText = JSON.stringify(content).toLowerCase();
    expect(allText).toMatch(/guarantee of interviews, job offers or placement/);
    expect(allText).toMatch(/never (added|be added) to apex hr's (talent pool or )?candidate database without/);
  });

  it("Industrial Relations explicitly declines to guarantee agreement, avoiding industrial action, or a specific result", () => {
    const content = serviceContent.find((c) => c.slug === "industrial-relations-and-trade-union-negotiations")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/reaching agreement or avoiding industrial action/);
    expect(scope).toMatch(/specific negotiation result/);
    expect(scope).toMatch(/legal counsel.*trade union|trade union itself/);
  });

  it("Skilled Worker Sponsorship explicitly declines to determine visa eligibility or guarantee immigration outcomes, and distinguishes sponsorship from the visa itself", () => {
    const content = serviceContent.find((c) => c.slug === "skilled-worker-sponsorship-hr-support")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/qualifies for a skilled worker visa/);
    expect(scope).toMatch(/guaranteeing a sponsor licence, visa approval/);
    expect(content.differentiationNote?.toLowerCase()).toMatch(/related but distinct/);
  });
});

describe("Employment Law children (Batch 6C2) — rendered content, per service", () => {
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
        expect(links).toContain("/services/employment-law-and-employee-relations");
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

      it("emits FAQPage schema matching the combined faqs + additionalFaqs exactly, with no LegalService or immigration-adviser schema", () => {
        const { container, getByText } = render(
          <ServicePageTemplate title={service.title} breadcrumbTrail={buildBreadcrumbTrail(service.title, slug)} service={content} />,
        );
        const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'));
        for (const script of scripts) {
          expect(script.innerHTML).not.toContain("LegalService");
          // Referring readers to "a qualified immigration adviser" (a real
          // third party) is correct, required content — the check is that
          // Apex HR never claims to *be* one.
          expect(script.innerHTML).not.toMatch(/apex hr is an? immigration adviser/i);
        }
        if (allFaqs.length === 0) return;
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
        expect(breadcrumbLd.itemListElement.some((item) => item.name === "Employment Law & Employee Relations")).toBe(true);
        expect(breadcrumbLd.itemListElement.at(-1)?.name).toBe(service.title);
      });
    });
  }

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

describe("HR Compliance Audit — 'independent' wording fully removed, shared-field regression", () => {
  const content = serviceContent.find((c) => c.slug === "hr-compliance-audit")!;

  it("contains no 'independent' claim anywhere in the canonical record", () => {
    const allText = JSON.stringify(content);
    expect(allText).not.toMatch(/\bindependent\b/i);
  });

  it("service-location pages for HR Compliance Audit render the corrected wording, not the retired 'independent' phrase", () => {
    const combos = serviceLocationCombos.filter((c) => c.serviceSlug === "hr-compliance-audit");
    expect(combos.length).toBeGreaterThan(0);

    for (const combo of combos) {
      const location = getLocation(combo.locationSlug);
      const locationInfo = locationContent.find((l) => l.slug === combo.locationSlug);
      if (!location || !locationInfo) continue;

      const { container } = render(
        <ServiceLocationTemplate
          breadcrumbTrail={[]}
          entityTitle="HR Compliance Audit"
          entityHref="/services/hr-compliance-audit/"
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
      // Scoped to this render's own container — render() is called once
      // per combo in this loop without unmounting the previous one, so
      // unscoped document-wide queries would see every prior iteration's
      // output too.
      const scoped = within(container);
      expect(scoped.getByText(content.heroSummary)).toBeInTheDocument();
      expect(scoped.queryByText(/An independent review of your HR practices/)).toBeNull();
    }
  });

  it("the Outsourced HR Services–Worcester category-location page's child card renders the corrected wording", () => {
    const combo = categoryLocationCombos.find((c) => c.slug === "outsourced-hr-services-worcester");
    expect(combo).toBeDefined();

    const location = getLocation(combo!.locationSlug)!;
    const category = getServiceCategory(combo!.categorySlug)!;
    const childServices = getChildServicesForCategoryCombo(combo!).map((child) => {
      const childContent = serviceContent.find((c) => c.slug === child.slug)!;
      return { title: child.title, href: `/services/${child.slug}-${location.slug}/`, summary: childContent.heroSummary };
    });

    expect(childServices.some((c) => c.title === "HR Compliance Audit")).toBe(true);

    const { queryByText } = render(
      <CategoryLocationTemplate
        breadcrumbTrail={[]}
        categoryTitle={category.title}
        categoryHref={`/services/${category.slug}/`}
        categorySummary="Summary"
        bulletListTitle="Where this family helps"
        bulletList={["Point one"]}
        childServices={childServices}
        locationTitle={location.title}
        locationRegion="Test Region"
        locationHref={`/locations/${location.slug}/`}
        localContext="Test local context."
        faqs={[]}
      />,
    );

    expect(queryByText(/An independent review of your HR practices/)).toBeNull();
    expect(queryByText(content.heroSummary)).toBeInTheDocument();
  });
});

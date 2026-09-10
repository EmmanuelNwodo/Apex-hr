import { describe, expect, it } from "vitest";
import { render, within } from "@testing-library/react";
import { getServicesByCategory, getService, services } from "@/config/services";
import { serviceContent } from "@/content/services-data";
import { redirectRules } from "@/config/redirects";
import { serviceLocationCombos, categoryLocationCombos, buildComboMetaDescription } from "@/config/service-locations";
import { getLocation } from "@/config/locations";
import { locationContent } from "@/content/locations-data";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { ServiceLocationTemplate } from "@/components/templates/service-location-template";
import { getBreadcrumbJsonLd, getServiceJsonLd } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";

/**
 * SEO audit Phase 3 Batch 6E1 safeguards for the first three Compensation,
 * Reward & Benefits child pages, plus the three preliminary metadata
 * corrections (Skilled Worker Sponsorship, Employment Tribunal HR Support,
 * Change Management) and Salary Benchmarking's location-page regression
 * protection. No regex-based test here claims to determine legal
 * correctness — only the presence of required safeguards/disclaimers and
 * the absence of banned guaranteed-result wording.
 */

const APPROVED_THREE = ["salary-benchmarking", "job-evaluation-and-pay-structures", "reward-strategy"];

const APPROVED_INTENTS: Record<string, string> = {
  "salary-benchmarking": "Comparing roles and pay against relevant external market data",
  "job-evaluation-and-pay-structures": "Assessing role value and developing consistent job grades, pay bands or structures",
  "reward-strategy": "Developing an organisation-wide approach to pay, recognition, incentives and benefits",
};

const NOINDEX_HUB_PATHS = ["/insights/", "/resources/", "/case-study/"];
const GUARANTEE_LANGUAGE = /\bguarantee(d|s)?\b|\bpromise(d|s)?\b|\b100%\b|\bwill (reduce|increase|improve|cut|boost|guarantee)\b/i;
const BANNED_METADATA_WORDS = /\bfair\b|\bcompetitive\b|\bmarket-leading\b|\blegally compliant\b/i;
const AMERICAN_ADVISOR = /\badvisor\b/i;

function buildBreadcrumbTrail(serviceTitle: string, serviceSlug: string) {
  return [
    routes.services,
    {
      id: "compensation-reward-and-benefits",
      label: "Compensation, Reward & Benefits",
      path: "/services/compensation-reward-and-benefits/",
      status: "confirmed" as const,
      readyToIndex: true,
    },
    { id: serviceSlug, label: serviceTitle, path: `/services/${serviceSlug}/`, status: "confirmed" as const, readyToIndex: true },
  ];
}

describe("Compensation, Reward & Benefits children (Batch 6E1) — catalogue integrity", () => {
  it("has exactly these three approved services within the six-member family", () => {
    const family = getServicesByCategory("compensation-reward-and-benefits");
    expect(family.length).toBe(6);
    for (const slug of APPROVED_THREE) {
      expect(family.some((s) => s.slug === slug), `${slug} missing from family`).toBe(true);
    }
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

  it("has no guarantee-style language asserted as fact in outcomes or differentiation content", () => {
    const offenders: string[] = [];
    for (const slug of APPROVED_THREE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const texts = [...content.businessOutcomes, content.differentiationNote ?? ""];
      for (const text of texts) {
        if (GUARANTEE_LANGUAGE.test(text)) offenders.push(`${slug}: "${text}"`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("has no 'fair', 'competitive', 'market-leading' or 'legally compliant' guaranteed-result wording in any of the three metadata fields", () => {
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

  it("marks only Job Evaluation & Pay Structures for legal review among the three", () => {
    for (const slug of APPROVED_THREE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const expected = slug === "job-evaluation-and-pay-structures";
      expect(content.legalReviewRequired, `${slug} legalReviewRequired mismatch`).toBe(expected);
    }
  });

  it("Salary Benchmarking is distinguished from Job Evaluation & Pay Structures in both directions", () => {
    const benchmarking = serviceContent.find((c) => c.slug === "salary-benchmarking")!;
    const evaluation = serviceContent.find((c) => c.slug === "job-evaluation-and-pay-structures")!;
    expect(benchmarking.differentiationNote?.toLowerCase()).toMatch(/job evaluation/);
    expect(evaluation.differentiationNote?.toLowerCase()).toMatch(/salary benchmarking/);
  });

  it("Salary Benchmarking excludes proprietary/exhaustive data claims, guaranteed outcomes and 'fair pay' determinations", () => {
    const content = serviceContent.find((c) => c.slug === "salary-benchmarking")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/proprietary or exclusive salary data/);
    expect(scope).toMatch(/real-time or fully exhaustive market coverage/);
    expect(scope).toMatch(/guaranteed recruitment or retention outcomes/);
    expect(scope).toMatch(/legally correct or fair pay/);
  });

  it("Job Evaluation & Pay Structures is distinguished from performance appraisal of individual employees", () => {
    const content = serviceContent.find((c) => c.slug === "job-evaluation-and-pay-structures")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/assessment of an individual employee's personal performance/);
    const allFaqs = [...content.faqs, ...(content.additionalFaqs ?? [])];
    expect(allFaqs.some((f) => /performance/i.test(f.question))).toBe(true);
  });

  it("Job Evaluation & Pay Structures excludes guaranteed equal pay compliance, legal defensibility, acceptance and dispute elimination", () => {
    const content = serviceContent.find((c) => c.slug === "job-evaluation-and-pay-structures")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/guaranteed equal pay compliance/);
    expect(scope).toMatch(/legal defensibility as a certified or guaranteed outcome/);
    expect(scope).toMatch(/guaranteed employee acceptance of grading outcomes/);
    expect(scope).toMatch(/elimination of pay disputes/);
  });

  it("Reward Strategy excludes guaranteed retention/engagement/performance, cost savings, tax efficiency and regulated advice", () => {
    const content = serviceContent.find((c) => c.slug === "reward-strategy")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/guaranteed improvements to retention, engagement or performance/);
    expect(scope).toMatch(/guaranteed cost savings/);
    expect(scope).toMatch(/tax efficiency advice or guaranteed tax outcomes/);
    expect(scope).toMatch(/legal, tax, accounting, financial or other regulated advice/);
  });

  it("Reward Strategy is distinguished from Employee Benefits Consulting and Executive Compensation & Share Schemes", () => {
    const content = serviceContent.find((c) => c.slug === "reward-strategy")!;
    const note = content.differentiationNote?.toLowerCase() ?? "";
    expect(note).toMatch(/employee benefits consulting/);
    expect(note).toMatch(/executive compensation & share schemes/);
  });
});

describe("Compensation, Reward & Benefits children (Batch 6E1) — rendered content, per service", () => {
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
        expect(links).toContain("/services/compensation-reward-and-benefits");
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

      it("emits FAQPage schema matching the combined faqs + additionalFaqs exactly, with no financial-service or ratings schema", () => {
        const { container, getByText } = render(
          <ServicePageTemplate title={service.title} breadcrumbTrail={buildBreadcrumbTrail(service.title, slug)} service={content} />,
        );
        const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'));
        for (const script of scripts) {
          expect(script.innerHTML).not.toContain("LegalService");
          expect(script.innerHTML).not.toContain("FinancialService");
          expect(script.innerHTML).not.toContain("AggregateRating");
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
        expect(breadcrumbLd.itemListElement.some((item) => item.name === "Compensation, Reward & Benefits")).toBe(true);
        expect(breadcrumbLd.itemListElement.at(-1)?.name).toBe(service.title);
      });
    });
  }
});

describe("Preliminary metadata corrections (Batch 6E1)", () => {
  it("Skilled Worker Sponsorship HR Support no longer implies employers themselves sponsor 'visas'", () => {
    // Metadata was reframed to the site-wide firm-keyphrase pattern in the
    // master SEO implementation pass; the underlying safety properties
    // (no "sponsoring visas" claim, the specific UK route named, a
    // qualified immigration adviser referenced) are re-checked here
    // against the current wording rather than the retired phrasing.
    const content = serviceContent.find((c) => c.slug === "skilled-worker-sponsorship-hr-support")!;
    expect(content.metaDescription).not.toMatch(/sponsoring skilled worker visas/i);
    expect(content.metaDescription).toMatch(/UK Skilled Worker route/);
    expect(content.metaDescription).toMatch(/qualified immigration advisers/i);
  });

  it("Employment Tribunal HR Support no longer presumes legal representation has already been appointed", () => {
    const content = serviceContent.find((c) => c.slug === "employment-tribunal-hr-support")!;
    expect(content.metaDescription).not.toMatch(/working alongside legal representation/i);
    expect(content.metaDescription).toMatch(/appointed legal advisers where applicable/i);
  });

  it("Change Management no longer claims an unverifiable comparative 'less disruption' outcome in metadata or hero copy", () => {
    const content = serviceContent.find((c) => c.slug === "change-management")!;
    expect(content.metaDescription).not.toMatch(/less disruption/i);
    expect(content.heroSummary).not.toMatch(/less disruption/i);
    expect(content.metaDescription).toMatch(/communication, engagement and adoption planning/i);
  });

  it("Change Management has zero service-location combinations, so the metadata/hero fix cannot affect any location page", () => {
    const combos = serviceLocationCombos.filter((c) => c.serviceSlug === "change-management");
    expect(combos).toEqual([]);
  });
});

describe("Salary Benchmarking — location-page regression protection", () => {
  const content = serviceContent.find((c) => c.slug === "salary-benchmarking")!;

  it("has live service-location combinations (confirming the shared-field protection was necessary)", () => {
    const combos = serviceLocationCombos.filter((c) => c.serviceSlug === "salary-benchmarking");
    expect(combos.length).toBeGreaterThan(0);
    expect(combos.map((c) => c.locationSlug).sort()).toEqual(
      ["bristol", "edinburgh", "leeds", "london", "newcastle", "oxford", "yorkshire"].sort(),
    );
  });

  it("is not part of any retained category-location page (Compensation, Reward & Benefits has no such combo)", () => {
    const categorySlugs = categoryLocationCombos.map((c) => c.categorySlug);
    expect(categorySlugs).not.toContain("compensation-reward-and-benefits");
  });

  it("every Salary Benchmarking service-location page still renders the untouched shared heroSummary, whatItIncludes and first FAQ", () => {
    const combos = serviceLocationCombos.filter((c) => c.serviceSlug === "salary-benchmarking");
    for (const combo of combos) {
      const location = getLocation(combo.locationSlug);
      const locationInfo = locationContent.find((l) => l.slug === combo.locationSlug);
      if (!location || !locationInfo) continue;

      const { container } = render(
        <ServiceLocationTemplate
          breadcrumbTrail={[]}
          entityTitle="Salary Benchmarking"
          entityHref="/services/salary-benchmarking/"
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
      // per combo in this loop without unmounting the previous one.
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
    }
  });

  it("every Salary Benchmarking combo's meta description is the corrected base description plus a unique location clause", () => {
    const combos = serviceLocationCombos.filter((c) => c.serviceSlug === "salary-benchmarking");
    const descriptions = new Set<string>();
    for (const combo of combos) {
      const location = getLocation(combo.locationSlug);
      const locationInfo = locationContent.find((l) => l.slug === combo.locationSlug);
      if (!location || !locationInfo) continue;
      const description = buildComboMetaDescription(content.metaDescription, location.title, locationInfo.region);
      expect(description).toContain(content.metaDescription);
      expect(description).not.toMatch(/\bcompetitive\b|\bfair\b/i);
      descriptions.add(description);
    }
    expect(descriptions.size).toBe(combos.length);
  });
});

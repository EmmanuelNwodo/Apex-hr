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
 * SEO audit Phase 3 Batch 6E2 safeguards for the remaining three
 * Compensation, Reward & Benefits child pages, completing the six-member
 * family, plus the Salary Benchmarking public-language preliminary check.
 * No regex-based test here claims to determine legal correctness — only
 * the presence of required safeguards/disclaimers and the absence of
 * banned guaranteed-result wording and internal QA language.
 */

const APPROVED_THREE = [
  "pay-equity-and-pay-gap-reporting-firm-in-the-uk",
  "employee-benefits-consulting-firm-in-the-uk",
  "executive-compensation-and-share-schemes-firm-in-the-uk",
];

const ALL_SIX = [
  "salary-benchmarking-firm-in-the-uk",
  "job-evaluation-and-pay-structures-firm-in-the-uk",
  "reward-strategy-firm-in-the-uk",
  ...APPROVED_THREE,
];

const APPROVED_INTENTS: Record<string, string> = {
  "pay-equity-and-pay-gap-reporting-firm-in-the-uk": "Reviewing pay patterns and supporting appropriate pay-gap analysis and reporting",
  "employee-benefits-consulting-firm-in-the-uk": "Helping employers review and develop employee-benefits arrangements",
  "executive-compensation-and-share-schemes-firm-in-the-uk":
    "Supporting the design and governance of executive reward and employee share arrangements",
};

const NOINDEX_HUB_PATHS = ["/insights/", "/resources/", "/case-study/"];
const GUARANTEE_LANGUAGE = /\bguarantee(d|s)?\b|\bpromise(d|s)?\b|\b100%\b|\bwill (reduce|increase|improve|cut|boost|guarantee)\b/i;
const BANNED_METADATA_WORDS = /\bfair\b|\bcompetitive\b|\bmarket-leading\b|\blegally compliant\b/i;
const AMERICAN_ADVISOR = /\badvisor\b/i;
const INTERNAL_QA_LANGUAGE = /invented figures?|fabricated claims?|seo-safe wording/i;

function buildBreadcrumbTrail(serviceTitle: string, serviceSlug: string) {
  return [
    routes.services,
    {
      id: "compensation-reward-and-benefits-firm-in-the-uk",
      label: "Compensation, Reward & Benefits",
      path: "/services/compensation-reward-and-benefits-firm-in-the-uk/",
      status: "confirmed" as const,
      readyToIndex: true,
    },
    { id: serviceSlug, label: serviceTitle, path: `/services/${serviceSlug}/`, status: "confirmed" as const, readyToIndex: true },
  ];
}

describe("Preliminary check (Batch 6E2) — Salary Benchmarking public-facing language", () => {
  it("has no internal QA/workflow language anywhere in its public-facing content", () => {
    const content = serviceContent.find((c) => c.slug === "salary-benchmarking-firm-in-the-uk")!;
    expect(INTERNAL_QA_LANGUAGE.test(JSON.stringify(content))).toBe(false);
  });

  it("its outOfScope salary-figure boundary reads as natural visitor-facing wording, not a literal 'no invented figures' phrase", () => {
    const content = serviceContent.find((c) => c.slug === "salary-benchmarking-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ");
    expect(scope).not.toMatch(/invented figures?/i);
    expect(scope.toLowerCase()).toMatch(/specific salary figure.*without current, relevant market data/);
  });
});

describe("Compensation, Reward & Benefits children (Batch 6E2) — catalogue integrity", () => {
  it("completes the six-member family with exactly these three approved services", () => {
    const family = getServicesByCategory("compensation-reward-and-benefits-firm-in-the-uk");
    expect(family.length).toBe(6);
    expect(family.map((s) => s.slug).sort()).toEqual([...ALL_SIX].sort());
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

  it("has distinct principal intents matching the approved intent-ownership table, and all six family members have distinct meta descriptions", () => {
    expect(new Set(Object.values(APPROVED_INTENTS)).size).toBe(3);
    const descriptions = ALL_SIX.map((slug) => serviceContent.find((c) => c.slug === slug)!.metaDescription);
    expect(new Set(descriptions).size).toBe(6);
  });

  it("has no FAQ question duplicated verbatim across all six family members (including additionalFaqs)", () => {
    const allQuestions = ALL_SIX.flatMap((slug) => {
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

  it("contains no internal QA/workflow language anywhere in the three services' public-facing content", () => {
    const offenders: string[] = [];
    for (const slug of APPROVED_THREE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      if (INTERNAL_QA_LANGUAGE.test(JSON.stringify(content))) offenders.push(slug);
    }
    expect(offenders).toEqual([]);
  });

  it("marks Pay Equity & Pay Gap Reporting and Executive Compensation & Share Schemes for legal review, but not Employee Benefits Consulting", () => {
    for (const slug of APPROVED_THREE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const expected = slug !== "employee-benefits-consulting-firm-in-the-uk";
      expect(content.legalReviewRequired, `${slug} legalReviewRequired mismatch`).toBe(expected);
    }
  });

  it("none of the three have live service-location combinations, and Compensation, Reward & Benefits has no retained category-location page (confirming they were safe to edit freely)", () => {
    for (const slug of APPROVED_THREE) {
      const combos = serviceLocationCombos.filter((c) => c.serviceSlug === slug);
      expect(combos, `${slug} unexpectedly has service-location combos`).toEqual([]);
    }
    const categorySlugs = categoryLocationCombos.map((c) => c.categorySlug);
    expect(categorySlugs).not.toContain("compensation-reward-and-benefits-firm-in-the-uk");
  });

  it("Pay Equity & Pay Gap Reporting excludes equal-pay certification, discrimination determinations, closed-gap guarantees, reporting-compliance guarantees and legal representation", () => {
    const content = serviceContent.find((c) => c.slug === "pay-equity-and-pay-gap-reporting-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/certification of equal pay compliance/);
    expect(scope).toMatch(/legal determination of whether unlawful pay discrimination/);
    expect(scope).toMatch(/guarantee that identified pay gaps will close/);
    expect(scope).toMatch(/guarantee of statutory reporting compliance/);
    expect(scope).toMatch(/legal representation in connection with a pay equity/);
  });

  it("Pay Equity & Pay Gap Reporting is distinguished from Salary Benchmarking, Job Evaluation and Reward Strategy", () => {
    const content = serviceContent.find((c) => c.slug === "pay-equity-and-pay-gap-reporting-firm-in-the-uk")!;
    const note = content.differentiationNote?.toLowerCase() ?? "";
    expect(note).toMatch(/salary benchmarking/);
    expect(note).toMatch(/job evaluation & pay structures/);
    expect(note).toMatch(/reward strategy/);
  });

  it("Pay Equity & Pay Gap Reporting states no reporting thresholds, deadlines or calculation rules as fixed facts", () => {
    const content = serviceContent.find((c) => c.slug === "pay-equity-and-pay-gap-reporting-firm-in-the-uk")!;
    const allText = JSON.stringify(content);
    expect(allText).not.toMatch(/£\d/);
    expect(allText).not.toMatch(/\b\d+%\b.{0,30}(gap|threshold|employees)/i);
  });

  it("Employee Benefits Consulting excludes regulated financial/investment/insurance/pension/tax/legal advice and provider endorsement", () => {
    const content = serviceContent.find((c) => c.slug === "employee-benefits-consulting-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/regulated financial advice, investment advice or insurance broking/);
    expect(scope).toMatch(/pension advice/);
    expect(scope).toMatch(/tax or legal advice on benefits/);
    expect(scope).toMatch(/guaranteed savings from switching or renegotiating/);
    expect(scope).toMatch(/guaranteed employee uptake or satisfaction/);
    expect(scope).toMatch(/endorsement or recommendation of a specific benefits provider/);
  });

  it("Employee Benefits Consulting's provider FAQ does not imply Apex HR arranges, selects or endorses providers", () => {
    const content = serviceContent.find((c) => c.slug === "employee-benefits-consulting-firm-in-the-uk")!;
    const providerFaq = content.faqs.find((f) => f.id === "provider");
    expect(providerFaq).toBeDefined();
    expect(providerFaq!.answer.toLowerCase()).toMatch(/not an insurance broker, financial adviser or pension adviser/);
    expect(providerFaq!.answer.toLowerCase()).not.toMatch(/apex hr arranges? the (benefits )?providers?/);
  });

  it("Employee Benefits Consulting is distinguished from Reward Strategy", () => {
    const content = serviceContent.find((c) => c.slug === "employee-benefits-consulting-firm-in-the-uk")!;
    expect(content.differentiationNote?.toLowerCase()).toMatch(/reward strategy/);
  });

  it("Executive Compensation & Share Schemes excludes legal/tax/accounting/investment/securities advice, valuation, documentation, approvals, tax-efficiency and performance guarantees, and fiduciary authority", () => {
    const content = serviceContent.find((c) => c.slug === "executive-compensation-and-share-schemes-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/legal, tax, accounting, investment or securities advice/);
    expect(scope).toMatch(/valuation of the company or its shares/);
    expect(scope).toMatch(/drafting share-scheme legal documentation/);
    expect(scope).toMatch(/regulatory approval or clearance/);
    expect(scope).toMatch(/shareholder approval/);
    expect(scope).toMatch(/guaranteed tax efficiency/);
    expect(scope).toMatch(/guaranteed performance outcomes/);
    expect(scope).toMatch(/fiduciary or remuneration-committee decision-making authority/);
  });

  it("Executive Compensation & Share Schemes does not broaden into general M&A advisory, only cross-referencing the distinct M&A service where relevant", () => {
    const content = serviceContent.find((c) => c.slug === "executive-compensation-and-share-schemes-firm-in-the-uk")!;
    const note = content.differentiationNote ?? "";
    expect(note).toMatch(/Mergers and Acquisitions \(M&A\)/);
    expect(note.toLowerCase()).toMatch(/does not extend into/);
    // Body copy other than the boundary-clarifying differentiationNote
    // should not read as M&A advisory content.
    const otherText = [content.heroSummary, content.employerChallenge, ...content.whatItIncludes].join(" ").toLowerCase();
    expect(otherText).not.toMatch(/merger|acquisition/);
  });

  it("Executive Compensation & Share Schemes is distinguished from Reward Strategy and Employee Benefits Consulting", () => {
    const content = serviceContent.find((c) => c.slug === "executive-compensation-and-share-schemes-firm-in-the-uk")!;
    const note = content.differentiationNote?.toLowerCase() ?? "";
    expect(note).toMatch(/reward strategy/);
    expect(note).toMatch(/employee benefits consulting/);
  });
});

describe("Compensation, Reward & Benefits children (Batch 6E2) — rendered content, per service", () => {
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
        expect(links).toContain("/services/compensation-reward-and-benefits-firm-in-the-uk");
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

      it("emits FAQPage schema matching the combined faqs + additionalFaqs exactly, with no financial/legal/insurance/investment schema, ratings or prices", () => {
        const { container, getByText } = render(
          <ServicePageTemplate title={service.title} breadcrumbTrail={buildBreadcrumbTrail(service.title, slug)} service={content} />,
        );
        const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'));
        for (const script of scripts) {
          expect(script.innerHTML).not.toContain("LegalService");
          expect(script.innerHTML).not.toContain("FinancialService");
          expect(script.innerHTML).not.toContain("InsuranceAgency");
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
        expect(breadcrumbLd.itemListElement.some((item) => item.name === "Compensation, Reward & Benefits")).toBe(true);
        expect(breadcrumbLd.itemListElement.at(-1)?.name).toBe(service.title);
      });
    });
  }
});

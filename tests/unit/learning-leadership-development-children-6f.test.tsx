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
 * SEO audit Phase 3 Batch 6F safeguards for the three Learning &
 * Leadership Development child pages, plus the Pay Equity & Pay Gap
 * Reporting public-language preliminary check. No regex-based test here
 * claims to determine legal or clinical correctness — only the presence
 * of required safeguards/disclaimers and the absence of banned
 * guaranteed-result wording and internal QA language.
 */

const APPROVED_THREE = [
  "leadership-and-management-training-firm-in-the-uk",
  "executive-coaching-and-360-feedback-firm-in-the-uk",
  "learning-strategy-and-capability-development-firm-in-the-uk",
];

const APPROVED_INTENTS: Record<string, string> = {
  "leadership-and-management-training-firm-in-the-uk": "Structured training for managers and organisational leaders",
  "executive-coaching-and-360-feedback-firm-in-the-uk": "Individual leadership coaching and structured multi-source feedback",
  "learning-strategy-and-capability-development-firm-in-the-uk": "Organisation-wide learning strategy and workforce capability planning",
};

const NOINDEX_HUB_PATHS = ["/insights/", "/resources/", "/case-study/"];
const GUARANTEE_LANGUAGE = /\bguarantee(d|s)?\b|\bpromise(d|s)?\b|\b100%\b|\bwill (reduce|increase|improve|cut|boost|guarantee)\b/i;
const AMERICAN_ADVISOR = /\badvisor\b/i;
const INTERNAL_QA_LANGUAGE = /invented figures?|invented thresholds?|fabricated claims?|seo-safe wording/i;
const THERAPY_LANGUAGE = /\btherapy\b|\btherapist\b|\bclinical(ly)? diagnos|\bpsychological diagnos|\bmedical (treatment|support)\b/i;

function buildBreadcrumbTrail(serviceTitle: string, serviceSlug: string) {
  return [
    routes.services,
    {
      id: "learning-and-leadership-development-firm-in-the-uk",
      label: "Learning & Leadership Development",
      path: "/services/learning-and-leadership-development-firm-in-the-uk/",
      status: "confirmed" as const,
      readyToIndex: true,
    },
    { id: serviceSlug, label: serviceTitle, path: `/services/${serviceSlug}/`, status: "confirmed" as const, readyToIndex: true },
  ];
}

describe("Preliminary check (Batch 6F) — Pay Equity & Pay Gap Reporting public-facing language", () => {
  it("has no internal QA/workflow language anywhere in its public-facing content", () => {
    const content = serviceContent.find((c) => c.slug === "pay-equity-and-pay-gap-reporting-firm-in-the-uk")!;
    expect(INTERNAL_QA_LANGUAGE.test(JSON.stringify(content))).toBe(false);
  });

  it("its outOfScope statutory-detail boundary reads as natural visitor-facing wording, not a literal 'no invented thresholds/figures' phrase", () => {
    const content = serviceContent.find((c) => c.slug === "pay-equity-and-pay-gap-reporting-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ");
    expect(scope).not.toMatch(/invented thresholds?/i);
    expect(scope).not.toMatch(/invented figures?/i);
    expect(scope.toLowerCase()).toMatch(/statutory reporting thresholds, deadlines or calculation rules.*confirmed against current gov\.uk guidance/);
  });
});

describe("Learning & Leadership Development children (Batch 6F) — catalogue integrity", () => {
  const family = getServicesByCategory("learning-and-leadership-development-firm-in-the-uk");

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

  it("none of the three have live service-location combinations, and Learning & Leadership Development has no retained category-location page (confirming they were safe to edit freely)", () => {
    for (const slug of APPROVED_THREE) {
      const combos = serviceLocationCombos.filter((c) => c.serviceSlug === slug);
      expect(combos, `${slug} unexpectedly has service-location combos`).toEqual([]);
    }
    const categorySlugs = categoryLocationCombos.map((c) => c.categorySlug);
    expect(categorySlugs).not.toContain("learning-and-leadership-development-firm-in-the-uk");
  });

  it("Leadership & Management Training excludes unverified accreditation, guaranteed behaviour/productivity/performance change, guaranteed promotion and universal suitability", () => {
    const content = serviceContent.find((c) => c.slug === "leadership-and-management-training-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/accredited or externally certified qualifications/);
    expect(scope).toMatch(/guaranteed changes in manager behaviour, team productivity or performance/);
    expect(scope).toMatch(/guaranteed promotion or career progression/);
    expect(scope).toMatch(/same training format or content suits every organisation/);
  });

  it("Leadership & Management Training is distinguished from coaching and from learning strategy", () => {
    const content = serviceContent.find((c) => c.slug === "leadership-and-management-training-firm-in-the-uk")!;
    const note = content.differentiationNote?.toLowerCase() ?? "";
    expect(note).toMatch(/executive coaching & 360 feedback/);
    expect(note).toMatch(/learning strategy & capability development/);
  });

  it("Executive Coaching & 360 Feedback is not presented as therapy, medical support or clinical/psychological diagnosis anywhere in its visible content", () => {
    const content = serviceContent.find((c) => c.slug === "executive-coaching-and-360-feedback-firm-in-the-uk")!;
    // The disclaimer text itself legitimately contains these words to
    // *rule them out* — check instead that every match sits inside a
    // negation ("not", "outside", "no") within the same sentence.
    const allFaqs = [...content.faqs, ...(content.additionalFaqs ?? [])];
    const sentences = [
      content.heroSummary,
      content.employerChallenge,
      ...content.businessOutcomes,
      ...content.whatItIncludes,
      content.differentiationNote ?? "",
      ...(content.outOfScope ?? []),
      ...allFaqs.map((f) => f.answer),
    ];
    for (const sentence of sentences) {
      if (THERAPY_LANGUAGE.test(sentence)) {
        expect(sentence.toLowerCase(), `Unqualified therapy/clinical language: "${sentence}"`).toMatch(
          /\bnot\b|\boutside\b|\bno\b|\bseparately\b/,
        );
      }
    }
  });

  it("Executive Coaching & 360 Feedback excludes guaranteed confidentiality, guaranteed outcomes, unverified accreditation and clinical framing of 360 feedback", () => {
    const content = serviceContent.find((c) => c.slug === "executive-coaching-and-360-feedback-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/guarantee of confidentiality in every circumstance/);
    expect(scope).toMatch(/guaranteed leadership improvement, promotion or performance outcomes/);
    expect(scope).toMatch(/certified or accredited coaching credentials/);
    expect(scope).toMatch(/objective clinical or psychological assessment/);
  });

  it("Executive Coaching & 360 Feedback explains the limits of confidentiality", () => {
    const content = serviceContent.find((c) => c.slug === "executive-coaching-and-360-feedback-firm-in-the-uk")!;
    const allFaqs = [...content.faqs, ...(content.additionalFaqs ?? [])];
    expect(allFaqs.some((f) => /limit/i.test(f.question) && /safeguarding|legal obligation/i.test(f.answer))).toBe(true);
  });

  it("Executive Coaching & 360 Feedback is distinguished from training, performance management and therapy", () => {
    const content = serviceContent.find((c) => c.slug === "executive-coaching-and-360-feedback-firm-in-the-uk")!;
    const note = content.differentiationNote?.toLowerCase() ?? "";
    expect(note).toMatch(/leadership & management training/);
    expect(note).toMatch(/performance management/);
    expect(note).toMatch(/therapy or counselling/);
  });

  it("Executive Coaching & 360 Feedback is not flagged with legalReviewRequired (data-protection/coaching review is tracked separately in docs/CONTENT-REVIEW.md)", () => {
    const content = serviceContent.find((c) => c.slug === "executive-coaching-and-360-feedback-firm-in-the-uk")!;
    expect(content.legalReviewRequired).toBe(false);
  });

  it("Learning Strategy & Capability Development excludes guaranteed skills-gap closure, participation, adoption, productivity and ROI", () => {
    const content = serviceContent.find((c) => c.slug === "learning-strategy-and-capability-development-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/guarantee of closing every identified skills gap/);
    expect(scope).toMatch(/guaranteed employee participation/);
    expect(scope).toMatch(/guaranteed adoption of new skills/);
    expect(scope).toMatch(/guaranteed productivity improvement or return on investment/);
    expect(scope).toMatch(/guarantee that the organisation will be ready for future workforce needs/);
  });

  it("Learning Strategy & Capability Development is distinguished from training delivery and from Strategic Workforce Planning", () => {
    const content = serviceContent.find((c) => c.slug === "learning-strategy-and-capability-development-firm-in-the-uk")!;
    const note = content.differentiationNote?.toLowerCase() ?? "";
    expect(note).toMatch(/leadership & management training/);
    expect(note).toMatch(/strategic workforce planning/);
  });
});

describe("Learning & Leadership Development children (Batch 6F) — rendered content, per service", () => {
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
        expect(links).toContain("/services/learning-and-leadership-development-firm-in-the-uk");
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

      it("emits FAQPage schema matching the combined faqs + additionalFaqs exactly, with no medical/psychological/therapy, ratings, qualifications or price schema", () => {
        const { container, getByText } = render(
          <ServicePageTemplate title={service.title} breadcrumbTrail={buildBreadcrumbTrail(service.title, slug)} service={content} />,
        );
        const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'));
        for (const script of scripts) {
          expect(script.innerHTML).not.toContain("MedicalProcedure");
          expect(script.innerHTML).not.toContain("MedicalTherapy");
          expect(script.innerHTML).not.toContain("AggregateRating");
          expect(script.innerHTML).not.toContain("EducationalOccupationalCredential");
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
        expect(breadcrumbLd.itemListElement.some((item) => item.name === "Learning & Leadership Development")).toBe(true);
        expect(breadcrumbLd.itemListElement.at(-1)?.name).toBe(service.title);
      });
    });
  }
});

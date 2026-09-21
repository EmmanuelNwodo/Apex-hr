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
 * SEO audit Phase 3 Batch 6H safeguards for the five Employee Experience
 * & Engagement child pages, plus Employer Branding & EVP's London
 * location-page regression protection. No regex-based test here claims
 * to determine legal, clinical or equality-law correctness — only the
 * presence of required safeguards/disclaimers and the absence of
 * unqualified positive claims. Tests are deliberately scoped to avoid
 * failing on legitimate "not guaranteed"-style disclaimers.
 */

const APPROVED_FIVE = [
  "employee-experience-strategy-firm-in-the-uk",
  "employee-engagement-surveys-and-action-planning-firm-in-the-uk",
  "employer-branding-and-employee-value-proposition-evp-firm-in-the-uk",
  "workplace-wellbeing-and-mental-health-firm-in-the-uk",
  "diversity-equity-and-inclusion-dei-consulting-firm-in-the-uk",
];

const APPROVED_INTENTS: Record<string, string> = {
  "employee-experience-strategy-firm-in-the-uk": "Designing a coherent employee-experience approach across relevant stages of the employee journey",
  "employee-engagement-surveys-and-action-planning-firm-in-the-uk":
    "Supporting the design, delivery and interpretation of employee-engagement surveys and turning findings into practical action planning",
  "employer-branding-and-employee-value-proposition-evp-firm-in-the-uk":
    "Helping an employer define and communicate what it offers employees and prospective employees",
  "workplace-wellbeing-and-mental-health-firm-in-the-uk":
    "HR-led support for workplace wellbeing and organisational approaches to mental-health-related work issues",
  "diversity-equity-and-inclusion-dei-consulting-firm-in-the-uk":
    "Organisational HR support for diversity, equity and inclusion strategy, policies, practices and implementation",
};

const NOINDEX_HUB_PATHS = ["/insights/", "/resources/", "/case-study/"];
const GUARANTEE_LANGUAGE = /\bguarantee(d|s)?\b|\bpromise(d|s)?\b|\b100%\b|\bwill (reduce|increase|improve|cut|boost|guarantee)\b/i;
const AMERICAN_ADVISOR = /\badvisor\b/i;
const AMERICAN_SPELLINGS = /\borganize|\bcolor\b|\bbehavior\b|\bfavor\b|\blicense\b(?!d)/i;
const FABRICATED_SURVEY_TOOL = /surveymonkey|qualtrics|culture amp benchmark|glint|peakon/i;
const NUMERIC_RESPONSE_RATE = /\d+%\s*(response rate|participation)/i;

function buildBreadcrumbTrail(serviceTitle: string, serviceSlug: string) {
  return [
    routes.services,
    {
      id: "employee-experience-and-engagement-firm-in-the-uk",
      label: "Employee Experience & Engagement",
      path: "/services/employee-experience-and-engagement-firm-in-the-uk/",
      status: "confirmed" as const,
      readyToIndex: true,
    },
    { id: serviceSlug, label: serviceTitle, path: `/services/${serviceSlug}/`, status: "confirmed" as const, readyToIndex: true },
  ];
}

/**
 * Fields shared with ServiceLocationTemplate — must never contain a
 * positive unqualified claim, since they can't be corrected per-location.
 * FAQ questions are deliberately excluded: a question ("Are responses
 * anonymous?") is not itself an assertion and shouldn't need a
 * qualifying word — only the answer can make or avoid a claim.
 */
function sharedSentences(content: (typeof serviceContent)[number]): string[] {
  return [content.heroSummary, ...content.whatItIncludes, content.faqs[0]?.answer ?? ""];
}

describe("Employee Experience & Engagement children (Batch 6H) — catalogue integrity", () => {
  const family = getServicesByCategory("employee-experience-and-engagement-firm-in-the-uk");

  it("has exactly these five approved services and no others", () => {
    expect(family.length).toBe(5);
    expect(family.map((s) => s.slug).sort()).toEqual([...APPROVED_FIVE].sort());
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
    expect(new Set(Object.values(APPROVED_INTENTS)).size).toBe(5);
    for (const slug of APPROVED_FIVE) {
      expect(APPROVED_INTENTS[slug]).toBeTruthy();
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

  it("has no guarantee-style language asserted as fact in businessOutcomes (the one field meant to state positive results)", () => {
    const offenders: string[] = [];
    for (const slug of APPROVED_FIVE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      for (const text of content.businessOutcomes) {
        if (GUARANTEE_LANGUAGE.test(text)) offenders.push(`${slug}: "${text}"`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("uses no American spellings anywhere in the five services' content", () => {
    const offenders: string[] = [];
    for (const slug of APPROVED_FIVE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const text = JSON.stringify(content);
      if (AMERICAN_ADVISOR.test(text) || AMERICAN_SPELLINGS.test(text)) offenders.push(slug);
    }
    expect(offenders).toEqual([]);
  });

  it("Employer Branding & EVP expands 'Employee Value Proposition (EVP)' in visible, safely-editable copy (employerChallenge)", () => {
    const content = serviceContent.find((c) => c.slug === "employer-branding-and-employee-value-proposition-evp-firm-in-the-uk")!;
    expect(content.employerChallenge).toMatch(/Employee Value Proposition \(EVP\)/);
    expect(content.metaDescription).toMatch(/Employee Value Proposition \(EVP\)/);
  });

  it("DEI Consulting expands 'Diversity, Equity & Inclusion (DEI)' in its hero summary and meta description", () => {
    const content = serviceContent.find((c) => c.slug === "diversity-equity-and-inclusion-dei-consulting-firm-in-the-uk")!;
    expect(content.heroSummary).toMatch(/Diversity, Equity & Inclusion \(DEI\)/);
    expect(content.metaDescription).toMatch(/Diversity, Equity & Inclusion \(DEI\)/);
  });

  it("none of the shared/protected fields (heroSummary, whatItIncludes, first FAQ) make a positive unqualified anonymity, confidentiality, objectivity, independence or bias-elimination claim", () => {
    const CLAIM_WORDS = /\banonymous\b|\bconfidential(ity)?\b|\bobjective(ly)?\b|\bindependent(ly)?\b|\beliminat(e|es|ed|ion)\b/i;
    const offenders: string[] = [];
    for (const slug of APPROVED_FIVE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      for (const sentence of sharedSentences(content)) {
        if (!sentence) continue;
        if (CLAIM_WORDS.test(sentence)) {
          // Present only if the sentence itself is already a careful,
          // non-absolute statement (contains a qualifying word).
          const qualified = /\bagreed\b|\bnot\b|\bno\b|\bsettings\b|\bwhere\b|\bwhich\b/i.test(sentence);
          if (!qualified) offenders.push(`${slug}: "${sentence}"`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("no field names a fabricated survey platform, benchmark database or numeric response-rate claim", () => {
    const offenders: string[] = [];
    for (const slug of APPROVED_FIVE) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      const text = JSON.stringify(content);
      if (FABRICATED_SURVEY_TOOL.test(text) || NUMERIC_RESPONSE_RATE.test(text)) offenders.push(slug);
    }
    expect(offenders).toEqual([]);
  });

  it("none of the five have live service-location combinations except Employer Branding & EVP (London), and Employee Experience & Engagement has no retained category-location page", () => {
    for (const slug of APPROVED_FIVE) {
      const combos = serviceLocationCombos.filter((c) => c.serviceSlug === slug);
      if (slug === "employer-branding-and-employee-value-proposition-evp-firm-in-the-uk") {
        expect(combos.map((c) => c.locationSlug)).toEqual(["london"]);
      } else {
        expect(combos, `${slug} unexpectedly has service-location combos`).toEqual([]);
      }
    }
    const categorySlugs = categoryLocationCombos.map((c) => c.categorySlug);
    expect(categorySlugs).not.toContain("employee-experience-and-engagement-firm-in-the-uk");
  });

  it("Employee Experience Strategy is distinguished from a survey alone and from Culture Transformation, without guaranteeing engagement/retention/productivity/cultural change", () => {
    const content = serviceContent.find((c) => c.slug === "employee-experience-strategy-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/guaranteed engagement, retention, productivity or cultural change/);
    expect(scope).toMatch(/not only a single engagement survey/);
    expect(scope).toMatch(/does not transfer decision-making authority to apex hr/);
    expect(content.differentiationNote?.toLowerCase()).toMatch(/culture transformation/);
  });

  it("Employee Engagement Surveys excludes identification guarantees, participation/response-rate/candour guarantees, clinical validation and objective-truth framing", () => {
    const content = serviceContent.find((c) => c.slug === "employee-engagement-surveys-and-action-planning-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/individual respondents cannot be identified/);
    expect(scope).toMatch(/guaranteed participation, response rates or candid answers/);
    expect(scope).toMatch(/scientific, psychometric or clinical validation/);
    expect(scope).toMatch(/objective truth/);
    expect(scope).toMatch(/named survey platform, benchmark database or proprietary scoring system/);
  });

  it("Employee Engagement Surveys has a dedicated FAQ distinguishing anonymous from confidential without claiming Apex HR provides either by default", () => {
    const content = serviceContent.find((c) => c.slug === "employee-engagement-surveys-and-action-planning-firm-in-the-uk")!;
    const allFaqs = [...content.faqs, ...(content.additionalFaqs ?? [])];
    const faq = allFaqs.find((f) => /anonymous.*confidential|confidential.*anonymous/i.test(f.question));
    expect(faq, "Missing anonymous-vs-confidential FAQ").toBeDefined();
    expect(faq!.answer.toLowerCase()).toMatch(/agreed/);
    expect(faq!.answer.toLowerCase()).not.toMatch(/apex hr (surveys are|always provides) (anonymous|confidential)/);
  });

  it("Employer Branding & EVP excludes guaranteed applicant/quality/retention/reputation outcomes, exclusive access, and employee-endorsement claims", () => {
    const content = serviceContent.find((c) => c.slug === "employer-branding-and-employee-value-proposition-evp-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/guaranteed applicant numbers, quality of hire, candidate acceptance, retention or reputation improvement/);
    expect(scope).toMatch(/exclusive access to candidates or recruitment channels/);
    expect(scope).toMatch(/endorsement of your employer brand by employees/);
    expect(scope).toMatch(/ownership, management or guaranteed influence over third-party employer review platforms/);
  });

  it("Employer Branding & EVP is distinguished from recruitment delivery and recruitment marketing execution", () => {
    const content = serviceContent.find((c) => c.slug === "employer-branding-and-employee-value-proposition-evp-firm-in-the-uk")!;
    const note = content.differentiationNote?.toLowerCase() ?? "";
    expect(note).toMatch(/permanent recruitment/);
    expect(note).toMatch(/recruitment marketing campaign execution/);
  });

  it("Workplace Wellbeing excludes medical/clinical/occupational-health provision, fitness-for-work decisions, diagnostic/treatment/emergency guidance and unconditional confidentiality", () => {
    const content = serviceContent.find((c) => c.slug === "workplace-wellbeing-and-mental-health-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/medical care, diagnosis, treatment, therapy, counselling or occupational-health provision/);
    expect(scope).toMatch(/medically fit for work/);
    expect(scope).toMatch(/diagnostic, treatment or emergency guidance/);
    expect(scope).toMatch(/guarantee of confidentiality where employer processes, safeguarding duties/);
  });

  it("Workplace Wellbeing has no unqualified diagnostic/treatment/medical-authority claim outside outOfScope, and adds no medical or LegalService schema justification", () => {
    const content = serviceContent.find((c) => c.slug === "workplace-wellbeing-and-mental-health-firm-in-the-uk")!;
    const bodyFields = [
      content.heroSummary,
      content.employerChallenge,
      content.whoWeSupport,
      content.whyApex,
      ...content.businessOutcomes,
      ...content.whatItIncludes,
      ...content.faqs.map((f) => f.answer),
    ].join(" ").toLowerCase();
    expect(bodyFields).not.toMatch(/\bdiagnos(e|es|is)\b(?!.{0,30}not)/);
    expect(content.legalReviewRequired).toBe(false);
  });

  it("Workplace Wellbeing is distinguished from occupational health, EAPs and clinical/therapeutic services", () => {
    const content = serviceContent.find((c) => c.slug === "workplace-wellbeing-and-mental-health-firm-in-the-uk")!;
    const note = content.differentiationNote?.toLowerCase() ?? "";
    expect(note).toMatch(/occupational health/);
    expect(note).toMatch(/employee assistance programmes/);
    expect(note).toMatch(/clinical or therapeutic services/);
  });

  it("DEI Consulting excludes guaranteed outcomes, bias/discrimination elimination, compliance/certification claims, automated decision-making and invented demographic data", () => {
    const content = serviceContent.find((c) => c.slug === "diversity-equity-and-inclusion-dei-consulting-firm-in-the-uk")!;
    const scope = (content.outOfScope ?? []).join(" ").toLowerCase();
    expect(scope).toMatch(/guaranteed representation, hiring, promotion, retention, belonging, inclusion or cultural outcomes/);
    expect(scope).toMatch(/eliminates bias or discrimination/);
    expect(scope).toMatch(/legal compliance, certification or regulatory approval/);
    expect(scope).toMatch(/employment decisions made by apex hr/);
    expect(scope).toMatch(/invented workforce demographics, pay gaps, protected-characteristic findings/);
    expect(scope).toMatch(/automated decision-making or profiling/);
  });

  it("DEI Consulting keeps legalReviewRequired true and states data sources/access/purpose/reporting need to be agreed, without claiming anonymity or confidentiality by default", () => {
    const content = serviceContent.find((c) => c.slug === "diversity-equity-and-inclusion-dei-consulting-firm-in-the-uk")!;
    expect(content.legalReviewRequired).toBe(true);
    const allFaqs = [...content.faqs, ...(content.additionalFaqs ?? [])];
    const dataFaq = allFaqs.find((f) => /demographic data/i.test(f.question));
    expect(dataFaq).toBeDefined();
    expect(dataFaq!.answer.toLowerCase()).toMatch(/agreed/);
    expect(dataFaq!.answer.toLowerCase()).not.toMatch(/anonymous by default|confidential by default/);
  });
});

describe("Employee Experience & Engagement children (Batch 6H) — rendered content, per service", () => {
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
        expect(links).toContain("/services/employee-experience-and-engagement-firm-in-the-uk");
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

      it("emits FAQPage schema matching the combined faqs + additionalFaqs exactly, with no medical, LegalService, rating or certification schema", () => {
        const { container, getByText } = render(
          <ServicePageTemplate title={service.title} breadcrumbTrail={buildBreadcrumbTrail(service.title, slug)} service={content} />,
        );
        const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'));
        for (const script of scripts) {
          expect(script.innerHTML).not.toContain("LegalService");
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
        expect(breadcrumbLd.itemListElement.some((item) => item.name === "Employee Experience & Engagement")).toBe(true);
        expect(breadcrumbLd.itemListElement.at(-1)?.name).toBe(service.title);
      });
    });
  }
});

describe("Employer Branding & EVP — London location-page regression protection", () => {
  const content = serviceContent.find((c) => c.slug === "employer-branding-and-employee-value-proposition-evp-firm-in-the-uk")!;

  it("the London service-location page still renders the untouched shared heroSummary, whatItIncludes and first FAQ, with no canonical-only leakage", () => {
    const combo = serviceLocationCombos.find(
      (c) => c.serviceSlug === "employer-branding-and-employee-value-proposition-evp-firm-in-the-uk" && c.locationSlug === "london",
    )!;
    const location = getLocation(combo.locationSlug)!;
    const locationInfo = locationContent.find((l) => l.slug === combo.locationSlug)!;

    const { container } = render(
      <ServiceLocationTemplate
        breadcrumbTrail={[]}
        entityTitle="Employer Branding & Employee Value Proposition (EVP)"
        entityHref="/services/employer-branding-and-employee-value-proposition-evp-firm-in-the-uk/"
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
    for (const scopeItem of content.outOfScope ?? []) {
      expect(scoped.queryByText(scopeItem)).toBeNull();
    }
    if (content.differentiationNote) {
      expect(scoped.queryByText(content.differentiationNote)).toBeNull();
    }
    for (const faq of content.additionalFaqs ?? []) {
      expect(scoped.queryByText(faq.question)).toBeNull();
    }
  });

  it("heroSummary was not altered by this batch (still the original, un-corrected wording)", () => {
    expect(content.heroSummary).toBe(
      "Employer branding and Employee Value Proposition development that reflects what it's genuinely like to work for you.",
    );
  });
});

import { describe, expect, it } from "vitest";
import { render, within } from "@testing-library/react";
import { getServicesByCategory, getService, services, serviceCategories } from "@/config/services";
import { serviceContent } from "@/content/services-data";
import { sectors } from "@/config/sectors";
import { sectorContent } from "@/content/sectors-data";
import { locations } from "@/config/locations";
import { locationContent } from "@/content/locations-data";
import { talentRoleContent } from "@/content/talent-roles-data";
import { redirectRules } from "@/config/redirects";
import { serviceLocationCombos, categoryLocationCombos } from "@/config/service-locations";
import { getLocation } from "@/config/locations";
import { contentManifest } from "@/content/manifest";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { ServiceLocationTemplate } from "@/components/templates/service-location-template";
import { buildLocationFaqs } from "@/components/templates/location-page-template";
import { getCollectionPageJsonLd } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";
import { insightCategories } from "@/config/insight-categories";
import sitemap from "@/app/sitemap";
import fs from "node:fs";
import path from "node:path";

/**
 * Final consolidated SEO phase safeguards: the eight remaining child
 * services (HR Technology & People Analytics, Strategic HR & Workforce
 * Advisory), sitewide EMPLOYER_LINK_SLUGS completion (all 48 services),
 * newly-added hub/location/role schema, sitemap lastModified removal, and
 * llms.txt link validity against route configuration.
 */

const FINAL_EIGHT = [
  "hris-implementation-firm-in-the-uk",
  "hr-software-selection-firm-in-the-uk",
  "people-analytics-and-hr-dashboards-firm-in-the-uk",
  "digital-hr-transformation-firm-in-the-uk",
  "ai-workplace-policy-and-hr-integration-firm-in-the-uk",
  "people-strategy-firm-in-the-uk",
  "strategic-workforce-planning-firm-in-the-uk",
  "global-mobility-and-expatriate-hr-management-firm-in-the-uk",
];

const GUARANTEE_LANGUAGE = /\bguarantee(d|s)?\b|\bpromise(d|s)?\b|\b100%\b/i;
const AMERICAN_ADVISOR = /\badvisor\b/i;

function buildBreadcrumbTrail(categoryId: string, categoryLabel: string, serviceTitle: string, serviceSlug: string) {
  return [
    routes.services,
    {
      id: categoryId,
      label: categoryLabel,
      path: `/services/${categoryId}/`,
      status: "confirmed" as const,
      readyToIndex: true,
    },
    { id: serviceSlug, label: serviceTitle, path: `/services/${serviceSlug}/`, status: "confirmed" as const, readyToIndex: true },
  ];
}

describe("Final eight services — catalogue integrity", () => {
  it("HR Technology & People Analytics has exactly five children; Strategic HR & Workforce Advisory has exactly three", () => {
    expect(getServicesByCategory("hr-technology-and-people-analytics-firm-in-the-uk").length).toBe(5);
    expect(getServicesByCategory("strategic-hr-and-workforce-advisory-firm-in-the-uk").length).toBe(3);
  });

  it("all 48 individual services now carry outOfScope, differentiationNote and additionalFaqs", () => {
    const missing: string[] = [];
    for (const service of services) {
      const content = serviceContent.find((c) => c.slug === service.slug);
      if (!content) {
        missing.push(`${service.slug}: no content record`);
        continue;
      }
      if (!content.outOfScope || content.outOfScope.length === 0) missing.push(`${service.slug}: outOfScope`);
      if (!content.differentiationNote) missing.push(`${service.slug}: differentiationNote`);
      if (!content.additionalFaqs || content.additionalFaqs.length === 0) missing.push(`${service.slug}: additionalFaqs`);
    }
    expect(missing).toEqual([]);
  });

  it("has unique titles and meta descriptions across all 48 services", () => {
    expect(new Set(services.map((s) => s.title)).size).toBe(48);
    expect(new Set(serviceContent.map((c) => c.metaDescription)).size).toBe(48);
  });

  it("HR Software Selection no longer claims unverified 'independent' status as a positioning claim", () => {
    // whenNeeded legitimately keeps "an independent view before
    // committing to a vendor" — ordinary English describing what the
    // employer wants, not a claim about Apex HR's own regulatory or
    // audited status. Only the fields that previously made that
    // positioning claim are checked here.
    const content = serviceContent.find((c) => c.slug === "hr-software-selection-firm-in-the-uk")!;
    const positioningFields = [
      content.metaDescription,
      content.heroSummary,
      content.whoWeSupport,
      content.whyApex,
      ...content.faqs.map((f) => f.answer),
    ].join(" ").toLowerCase();
    expect(positioningFields).not.toMatch(/\bindependent\b/);
    expect(positioningFields).toMatch(/not a software vendor or reseller/);
  });

  it("HRIS Implementation's independence-adjacent FAQ was corrected without touching its two protected shared fields", () => {
    const content = serviceContent.find((c) => c.slug === "hris-implementation-firm-in-the-uk")!;
    expect(content.faqs[0].answer.toLowerCase()).not.toMatch(/\bindependent\b/);
    expect(content.heroSummary).toBe(
      "Practical support implementing a new HRIS, so the rollout actually improves how HR data and processes work.",
    );
    expect(content.whatItIncludes).toEqual([
      "Requirements gathering and process review",
      "Implementation planning and project support",
      "Support with data migration and go-live",
    ]);
  });

  it("HRIS Implementation expands 'Human Resources Information System (HRIS)' in safely-editable copy", () => {
    const content = serviceContent.find((c) => c.slug === "hris-implementation-firm-in-the-uk")!;
    expect(content.employerChallenge).toMatch(/Human Resources Information System \(HRIS\)/);
  });

  it("AI Workplace Policy & HR Integration expands 'artificial intelligence (AI)' in its hero summary", () => {
    const content = serviceContent.find((c) => c.slug === "ai-workplace-policy-and-hr-integration-firm-in-the-uk")!;
    expect(content.heroSummary).toMatch(/artificial intelligence \(AI\)/);
  });

  it("has no guarantee-style language asserted as fact in businessOutcomes across the final eight", () => {
    const offenders: string[] = [];
    for (const slug of FINAL_EIGHT) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      for (const text of content.businessOutcomes) {
        if (GUARANTEE_LANGUAGE.test(text)) offenders.push(`${slug}: "${text}"`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("uses no American 'advisor' spelling anywhere in the final eight services' content", () => {
    const offenders: string[] = [];
    for (const slug of FINAL_EIGHT) {
      const content = serviceContent.find((c) => c.slug === slug)!;
      if (AMERICAN_ADVISOR.test(JSON.stringify(content))) offenders.push(slug);
    }
    expect(offenders).toEqual([]);
  });

  it("HRIS Implementation has exactly Manchester and Leeds combos; Strategic Workforce Planning has exactly its known eight; the other six have none", () => {
    expect(
      serviceLocationCombos.filter((c) => c.serviceSlug === "hris-implementation-firm-in-the-uk").map((c) => c.locationSlug).sort(),
    ).toEqual(["leeds", "manchester"]);
    expect(
      serviceLocationCombos.filter((c) => c.serviceSlug === "strategic-workforce-planning-firm-in-the-uk").map((c) => c.locationSlug).sort(),
    ).toEqual(["birmingham", "glasgow", "leicester", "manchester", "nottingham", "oxford", "warwickshire", "yorkshire"].sort());
    for (const slug of FINAL_EIGHT.filter((s) => s !== "hris-implementation-firm-in-the-uk" && s !== "strategic-workforce-planning-firm-in-the-uk")) {
      expect(serviceLocationCombos.filter((c) => c.serviceSlug === slug)).toEqual([]);
    }
  });

  it("Strategic Workforce Planning's shared fields (heroSummary, whatItIncludes, first FAQ) are untouched, and no outOfScope content leaks onto its location pages", () => {
    const content = serviceContent.find((c) => c.slug === "strategic-workforce-planning-firm-in-the-uk")!;
    const combos = serviceLocationCombos.filter((c) => c.serviceSlug === "strategic-workforce-planning-firm-in-the-uk");
    expect(combos.length).toBeGreaterThan(0);
    for (const combo of combos) {
      const location = getLocation(combo.locationSlug);
      const locationInfo = locationContent.find((l) => l.slug === combo.locationSlug);
      if (!location || !locationInfo) continue;
      const { container } = render(
        <ServiceLocationTemplate
          breadcrumbTrail={[]}
          entityTitle="Strategic Workforce Planning"
          entityHref="/services/strategic-workforce-planning-firm-in-the-uk/"
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
      for (const scopeItem of content.outOfScope ?? []) {
        expect(scoped.queryByText(scopeItem)).toBeNull();
      }
    }
  });
});

describe("Final eight services — rendered content and employer-link completion", () => {
  const categoryLookup: Record<string, { id: string; label: string }> = {
    "hris-implementation-firm-in-the-uk": { id: "hr-technology-and-people-analytics-firm-in-the-uk", label: "HR Technology & People Analytics" },
    "hr-software-selection-firm-in-the-uk": { id: "hr-technology-and-people-analytics-firm-in-the-uk", label: "HR Technology & People Analytics" },
    "people-analytics-and-hr-dashboards-firm-in-the-uk": { id: "hr-technology-and-people-analytics-firm-in-the-uk", label: "HR Technology & People Analytics" },
    "digital-hr-transformation-firm-in-the-uk": { id: "hr-technology-and-people-analytics-firm-in-the-uk", label: "HR Technology & People Analytics" },
    "ai-workplace-policy-and-hr-integration-firm-in-the-uk": { id: "hr-technology-and-people-analytics-firm-in-the-uk", label: "HR Technology & People Analytics" },
    "people-strategy-firm-in-the-uk": { id: "strategic-hr-and-workforce-advisory-firm-in-the-uk", label: "Strategic HR & Workforce Advisory" },
    "strategic-workforce-planning-firm-in-the-uk": { id: "strategic-hr-and-workforce-advisory-firm-in-the-uk", label: "Strategic HR & Workforce Advisory" },
    "global-mobility-and-expatriate-hr-management-firm-in-the-uk": { id: "strategic-hr-and-workforce-advisory-firm-in-the-uk", label: "Strategic HR & Workforce Advisory" },
  };

  for (const slug of FINAL_EIGHT) {
    const service = getService(slug)!;
    const content = serviceContent.find((c) => c.slug === slug)!;
    const category = categoryLookup[slug];

    it(`${service.title} renders one H1 and the For Employers link unconditionally (EMPLOYER_LINK_SLUGS is now all 48)`, () => {
      const { getAllByRole } = render(
        <ServicePageTemplate
          title={service.title}
          breadcrumbTrail={buildBreadcrumbTrail(category.id, category.label, service.title, slug)}
          service={content}
          showForEmployersLink
        />,
      );
      const h1s = getAllByRole("heading", { level: 1 });
      expect(h1s).toHaveLength(1);
      const links = getAllByRole("link").map((el) => el.getAttribute("href")?.replace(/\/$/, ""));
      expect(links).toContain("/for-employers");
    });
  }

  it("every one of the 48 services renders the For Employers link when the page.tsx route always passes showForEmployersLink", () => {
    // Regression guard for the EMPLOYER_LINK_SLUGS simplification: the
    // individual-service branch in services/[slug]/page.tsx now passes
    // showForEmployersLink unconditionally rather than checking a Set.
    const routeSource = fs.readFileSync(path.join(process.cwd(), "src/app/services/[slug]/page.tsx"), "utf8");
    expect(routeSource).not.toMatch(/EMPLOYER_LINK_SLUGS/);
    expect(routeSource).toMatch(/showForEmployersLink\s*\n?\s*\/>/);
  });
});

describe("Route inventory and sitemap", () => {
  it("has exactly 48 individual services across 10 families", () => {
    expect(services.length).toBe(48);
    expect(serviceCategories.length).toBe(10);
  });

  it("has exactly 17 sectors and 16 locations", () => {
    expect(sectors.length).toBe(17);
    expect(locations.length).toBe(16);
  });

  it("has exactly 62 talent-acquisition role pages", () => {
    expect(talentRoleContent.length).toBe(62);
  });

  it("has exactly 48 service-location combos and 2 retained category-location combos", () => {
    expect(serviceLocationCombos.length).toBe(48);
    expect(categoryLocationCombos.length).toBe(2);
    expect(categoryLocationCombos.map((c) => c.slug).sort()).toEqual(
      ["outsourced-hr-services-firm-in-the-uk-worcester", "recruitment-and-talent-acquisition-firm-in-the-uk-liverpool"].sort(),
    );
  });

  it("sitemap contains exactly 220 URLs, matching the indexable manifest entries, with no lastModified field", async () => {
    // WordPress is unconfigured in the test environment (no WORDPRESS_API_URL),
    // so sitemap() contributes zero article entries here — see
    // tests/unit/wordpress.test.ts for WordPress-specific sitemap coverage
    // with a mocked API. 220 = the previous 211 local pages + the Insights
    // hub and its 8 category pages, now indexable per
    // docs/URL-DECISION-REGISTER.md D-016 (routes.insights.readyToIndex
    // flipped to true once WordPress had genuine published content).
    const entries = await sitemap();
    expect(entries.length).toBe(220);
    expect(entries.length).toBe(contentManifest.filter((e) => e.indexable).length);
    for (const entry of entries) {
      expect(entry).not.toHaveProperty("lastModified");
    }
  });

  it("116 redirect rules exist and none point to a sitemap URL as a competing duplicate source", async () => {
    expect(redirectRules.length).toBe(116);
    const entries = await sitemap();
    const sitemapPaths = new Set(entries.map((e) => new URL(e.url).pathname));
    for (const rule of redirectRules) {
      expect(sitemapPaths.has(rule.source)).toBe(false);
    }
  });

  it("no readyToIndex: false route appears in the sitemap", async () => {
    // routes.insights.path is deliberately absent from this list: Insights
    // is now readyToIndex: true (docs/URL-DECISION-REGISTER.md D-016) and
    // is expected to appear in the sitemap — see the dedicated assertion
    // below and tests/unit/insights-seo.test.ts.
    const noindexPaths = [
      routes.jobs.path,
      routes.talentPool.path,
      routes.findTalent.path,
      routes.resources.path,
      routes.caseStudies.path,
      routes.experts.path,
    ];
    const entries = await sitemap();
    const sitemapPaths = new Set(entries.map((e) => new URL(e.url).pathname));
    for (const p of noindexPaths) {
      expect(sitemapPaths.has(p), `${p} should not be in the sitemap`).toBe(false);
    }
  });

  it("/insights/ and all 8 insight category pages now appear in the sitemap", async () => {
    const entries = await sitemap();
    const sitemapPaths = new Set(entries.map((e) => new URL(e.url).pathname));
    expect(sitemapPaths.has(routes.insights.path)).toBe(true);
    for (const category of insightCategories) {
      expect(sitemapPaths.has(`/insights/${category.slug}/`)).toBe(true);
    }
  });
});

describe("Hub pages — CollectionPage/ItemList structured data matches visible directory", () => {
  it("Services hub lists all 10 families with real, canonical paths", () => {
    const jsonLd = getCollectionPageJsonLd({
      path: routes.services.path,
      name: "HR & Recruitment Services",
      description: "test",
      items: serviceCategories.map((c) => ({ name: c.title, path: `/services/${c.slug}/` })),
    });
    expect(jsonLd.mainEntity.itemListElement).toHaveLength(10);
    expect(jsonLd.mainEntity.itemListElement.every((item) => item.url.startsWith("https://www.apexhrllc.co.uk/services/"))).toBe(true);
  });

  it("Sectors hub lists all 17 sectors; Locations hub lists all 16 locations", () => {
    const sectorLd = getCollectionPageJsonLd({
      path: routes.sectors.path,
      name: "Sectors We Support",
      description: "test",
      items: sectors.map((s) => ({ name: s.title, path: `/sector/${s.slug}/` })),
    });
    expect(sectorLd.mainEntity.numberOfItems).toBe(17);

    const locationLd = getCollectionPageJsonLd({
      path: routes.locations.path,
      name: "Locations We Support",
      description: "test",
      items: locations.map((l) => ({ name: l.title, path: `/locations/${l.slug}/` })),
    });
    expect(locationLd.mainEntity.numberOfItems).toBe(16);
  });
});

describe("Individual location pages — schema and FAQ safeguards", () => {
  it("buildLocationFaqs produces the exact FAQ set the template renders, for every location", () => {
    for (const location of locationContent) {
      const faqs = buildLocationFaqs(location.slug, location);
      expect(faqs.length).toBe(location.faqs.length + 3);
      expect(faqs.slice(0, location.faqs.length)).toEqual(location.faqs);
    }
  });

  it("no location page claims a physical office, local branch or resident consultant", () => {
    const OFFICE_CLAIM = /\bour office\b|\blocal branch\b|\bresident consultant\b|\bnear you\b/i;
    for (const location of locationContent) {
      expect(OFFICE_CLAIM.test(JSON.stringify(location))).toBe(false);
    }
  });

  it("every location's relatedServiceSlugs point to real, confirmed services (curated-only rule)", () => {
    for (const location of locationContent) {
      for (const slug of location.relatedServiceSlugs) {
        expect(services.some((s) => s.slug === slug), `${location.slug} -> unknown service ${slug}`).toBe(true);
      }
    }
  });
});

describe("Individual sector pages — data integrity", () => {
  it("has 17 sectors with unique meta descriptions and overviews", () => {
    expect(sectorContent.length).toBe(17);
    expect(new Set(sectorContent.map((s) => s.metaDescription)).size).toBe(17);
    expect(new Set(sectorContent.map((s) => s.overview)).size).toBe(17);
  });

  it("no sector claims fabricated clients, statistics, accreditations or named projects", () => {
    const FABRICATION = /\bclient(s)?\b.{0,20}(include|such as)|£\d|\d+%\s*(success|placement)|accredited by|award-winning/i;
    for (const sector of sectorContent) {
      expect(FABRICATION.test(JSON.stringify(sector))).toBe(false);
    }
  });
});

describe("Talent-acquisition role pages — no live-vacancy or fabrication claims", () => {
  it("has 62 roles with unique meta descriptions, each with a candidate-availability disclaimer", () => {
    expect(talentRoleContent.length).toBe(62);
    expect(new Set(talentRoleContent.map((r) => r.metaDescription)).size).toBe(62);
    for (const role of talentRoleContent) {
      expect(role.faqs.some((f) => /guarantee/i.test(f.answer) && /no/i.test(f.answer))).toBe(true);
    }
  });

  it("no role page fabricates salary figures, live vacancies, placement records or candidate numbers", () => {
    const FABRICATION = /£\d|\bcurrently hiring\b|\blive vacanc(y|ies)\b|\bplacement rate\b|\bcandidates? (available|on file|in our database)\b/i;
    for (const role of talentRoleContent) {
      expect(FABRICATION.test(JSON.stringify(role)), `${role.slug} fabrication check`).toBe(false);
    }
  });
});

describe("llms.txt — canonical link validity against route configuration", () => {
  const llmsTxt = fs.readFileSync(path.join(process.cwd(), "public/llms.txt"), "utf8");
  const links = [...llmsTxt.matchAll(/\((https:\/\/www\.apexhrllc\.co\.uk[^)]*)\)/g)].map((m) => m[1]);

  it("has no duplicate links", () => {
    expect(new Set(links).size).toBe(links.length);
  });

  it("every link uses a canonical trailing-slash path (or is the bare domain root)", () => {
    for (const link of links) {
      const url = new URL(link);
      expect(url.pathname === "/" || url.pathname.endsWith("/"), `${link} is not trailing-slash canonical`).toBe(true);
    }
  });

  it("every linked path is not a redirect source", () => {
    const redirectSources = new Set(redirectRules.map((r) => r.source));
    for (const link of links) {
      const pathname = new URL(link).pathname;
      expect(redirectSources.has(pathname), `${link} points to a redirect source`).toBe(false);
    }
  });

  it("every linked path resolves to a real, indexable manifest entry or an intentionally-noindex hub (locations)", () => {
    const manifestPaths = new Set(contentManifest.filter((e) => e.indexable).map((e) => e.canonicalPath));
    for (const link of links) {
      const pathname = new URL(link).pathname;
      const known = manifestPaths.has(pathname) || pathname === "/" || pathname === routes.locations.path;
      expect(known, `${link} does not resolve to a known indexable route`).toBe(true);
    }
  });

  it("contains the verified phone and email, and no fabricated street address or registration number", () => {
    expect(llmsTxt).toContain("+44 7762 272692");
    expect(llmsTxt).toContain("info@apexhrllc.com");
    expect(llmsTxt).not.toMatch(/\bpostcode\b|\bregistration number\b|\bcompany number\b/i);
  });

  it("uses the current www.apexhrllc.co.uk website domain throughout, with the @apexhrllc.com email preserved as the one legitimate exception", () => {
    expect(links.length).toBeGreaterThan(0);
    const withoutEmail = llmsTxt.replace("info@apexhrllc.com", "");
    expect(withoutEmail).not.toContain("apexhrllc.com");
    expect(llmsTxt).toContain("https://www.apexhrllc.co.uk");
  });
});

describe("Footer /case-study/ link — already correctly conditioned (no change needed)", () => {
  it("footer navigation only includes Case Studies once its route is readyToIndex", () => {
    const navSource = fs.readFileSync(path.join(process.cwd(), "src/config/navigation.ts"), "utf8");
    expect(navSource).toMatch(/routes\.caseStudies\.readyToIndex \? \[\{ route: routes\.caseStudies \}\] : \[\]/);
  });
});

describe("No duplicate FAQPage schema on pages that use FaqWithContactForm", () => {
  // FaqWithContactForm (src/components/content/faq-with-contact-form.tsx)
  // already emits its own FAQPage JSON-LD by default (`includeSchema` is
  // true unless explicitly disabled) from whatever `items` array it's
  // given. SectorPageTemplate, LocationPageTemplate and TalentRoleTemplate
  // all render their FAQs through it, so their route files must not also
  // call getFaqPageJsonLd themselves — this was a real bug caught and
  // fixed during the final consolidated SEO phase (Part 9), initially
  // introduced by this same phase's own schema additions.
  const routeFiles = [
    "src/app/sector/[slug]/page.tsx",
    "src/app/locations/[slug]/page.tsx",
    "src/app/talent-acquisition/[slug]/page.tsx",
  ];

  it.each(routeFiles)("%s does not import or call getFaqPageJsonLd", (relativePath) => {
    const source = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
    expect(source).not.toMatch(/getFaqPageJsonLd/);
  });

  it("service-location and category-location combo pages also do not call getFaqPageJsonLd (their FAQs are generic, not page-specific)", () => {
    const source = fs.readFileSync(path.join(process.cwd(), "src/app/services/[slug]/page.tsx"), "utf8");
    expect(source).not.toMatch(/getFaqPageJsonLd/);
  });
});

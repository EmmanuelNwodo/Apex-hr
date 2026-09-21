import { describe, expect, it } from "vitest";
import { services, serviceCategories } from "@/config/services";
import { serviceContent, serviceCategoryContent } from "@/content/services-data";
import { sectors } from "@/config/sectors";
import { sectorContent } from "@/content/sectors-data";
import { locationContent } from "@/content/locations-data";
import { talentRoleContent } from "@/content/talent-roles-data";
import { serviceLocationCombos, categoryLocationCombos } from "@/config/service-locations";
import { redirectRules } from "@/config/redirects";
import sitemap from "@/app/sitemap";

/**
 * URL-to-H1 Alignment Audit implementation regression coverage
 * (docs/URL-DECISION-REGISTER.md D-017). Every service/category URL is
 * "{title} Firm in the UK" and every sector URL is "HR Company for {title}
 * in the UK", both slugified with "&" -> "and" (not deleted) and the
 * pre-existing "M&A" -> "ma" convention preserved as a special case, per
 * explicit user decision. This file guards the URL structure itself
 * (distinct from tests/unit/master-seo-firm-keyphrase.test.tsx, which
 * guards the rendered title/H1/JSON-LD text).
 */

// Mirrors the approved conversion rule set exactly: "M&A" -> "ma" before the
// general "&" -> "and" pass, commas removed, parentheses unwrapped
// (preserving inner text), "/" treated as a word boundary, lowercased,
// hyphenated, no duplicate hyphens.
function slugifyTitle(title: string): string {
  let s = title;
  s = s.replace(/\bM&A\b/g, "MA");
  s = s.replace(/&/g, " and ");
  s = s.replace(/,/g, "");
  s = s.replace(/\(([^)]+)\)/g, "$1");
  s = s.replace(/\//g, " ");
  s = s.toLowerCase();
  s = s.replace(/[^a-z0-9]+/g, "-");
  s = s.replace(/^-+|-+$/g, "");
  return s;
}

function expectedServiceSlug(title: string): string {
  return `${slugifyTitle(title)}-firm-in-the-uk`;
}

function expectedSectorSlug(title: string): string {
  return `hr-company-for-${slugifyTitle(title)}-in-the-uk`;
}

describe("1. All 58 service/category URLs follow '{title}-firm-in-the-uk'", () => {
  it("every one of the 10 service family slugs is exactly slugify(title) + '-firm-in-the-uk'", () => {
    for (const category of serviceCategories) {
      expect(category.slug, category.title).toBe(expectedServiceSlug(category.title));
    }
  });

  it("every one of the 48 service slugs is exactly slugify(title) + '-firm-in-the-uk'", () => {
    expect(services.length).toBe(48);
    for (const service of services) {
      expect(service.slug, service.title).toBe(expectedServiceSlug(service.title));
    }
  });

  it("preserves the M&A special case: 'M&A People Due Diligence & Post-Merger Integration' -> 'ma-people-due-diligence-and-post-merger-integration-firm-in-the-uk'", () => {
    const maService = services.find((s) => s.title.startsWith("M&A"));
    expect(maService).toBeDefined();
    expect(maService!.slug).toBe("ma-people-due-diligence-and-post-merger-integration-firm-in-the-uk");
  });

  it("represents every other '&' in a title as 'and' in its slug, never deleted", () => {
    const ampersandServices = [...serviceCategories, ...services].filter((s) => s.title.includes("&") && !s.title.startsWith("M&A"));
    expect(ampersandServices.length).toBeGreaterThan(0);
    for (const entry of ampersandServices) {
      expect(entry.slug).toContain("-and-");
    }
  });

  it("has no punctuation characters (commas, ampersands, parentheses, slashes) in any of the 58 slugs", () => {
    const offenders = [...serviceCategories, ...services].filter((s) => /[,&()/]/.test(s.slug));
    expect(offenders.map((s) => s.slug)).toEqual([]);
  });
});

describe("2. All 17 sector URLs follow 'hr-company-for-{title}-in-the-uk'", () => {
  it("every sector slug is exactly 'hr-company-for-' + slugify(title) + '-in-the-uk'", () => {
    expect(sectors.length).toBe(17);
    for (const sector of sectors) {
      expect(sector.slug, sector.title).toBe(expectedSectorSlug(sector.title));
    }
  });

  it("represents 'Startups & Scale-ups' with 'and' in its slug", () => {
    const sector = sectors.find((s) => s.title === "Startups & Scale-ups");
    expect(sector?.slug).toBe("hr-company-for-startups-and-scale-ups-in-the-uk");
  });

  it("has no punctuation characters in any of the 17 sector slugs", () => {
    const offenders = sectors.filter((s) => /[,&()/]/.test(s.slug));
    expect(offenders.map((s) => s.slug)).toEqual([]);
  });
});

describe("3. Every service/sector H1 corresponds to its URL convention", () => {
  it("every service content record's rendered H1 basis (title) maps to its own URL slug", () => {
    for (const service of services) {
      const content = serviceContent.find((c) => c.slug === service.slug);
      expect(content, `No content record for ${service.slug}`).toBeDefined();
      expect(expectedServiceSlug(service.title)).toBe(service.slug);
    }
  });

  it("every service category content record's rendered H1 basis (title) maps to its own URL slug", () => {
    for (const category of serviceCategories) {
      const content = serviceCategoryContent.find((c) => c.slug === category.slug);
      expect(content, `No content record for ${category.slug}`).toBeDefined();
      expect(expectedServiceSlug(category.title)).toBe(category.slug);
    }
  });

  it("every sector content record's rendered H1 basis (title) maps to its own URL slug", () => {
    for (const sector of sectors) {
      const content = sectorContent.find((c) => c.slug === sector.slug);
      expect(content, `No content record for ${sector.slug}`).toBeDefined();
      expect(expectedSectorSlug(sector.title)).toBe(sector.slug);
    }
  });
});

describe("4. Every relatedServiceSlugs reference resolves to a real service", () => {
  const liveServiceSlugs = new Set(services.map((s) => s.slug));

  it("services-data.ts relatedFamilySlugs (on service category records) all resolve to real categories", () => {
    const liveCategorySlugs = new Set(serviceCategories.map((c) => c.slug));
    const offenders: string[] = [];
    for (const content of serviceCategoryContent) {
      for (const slug of content.relatedFamilySlugs) {
        if (!liveCategorySlugs.has(slug)) offenders.push(`${content.slug} -> ${slug}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("sectors-data.ts relatedServiceSlugs all resolve", () => {
    const offenders: string[] = [];
    for (const content of sectorContent) {
      for (const slug of content.relatedServiceSlugs) {
        if (!liveServiceSlugs.has(slug)) offenders.push(`${content.slug} -> ${slug}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("locations-data.ts relatedServiceSlugs all resolve", () => {
    const offenders: string[] = [];
    for (const location of locationContent) {
      for (const slug of location.relatedServiceSlugs) {
        if (!liveServiceSlugs.has(slug)) offenders.push(`${location.slug} -> ${slug}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("talent-roles-data.ts relatedServiceSlugs all resolve", () => {
    const offenders: string[] = [];
    for (const role of talentRoleContent) {
      for (const slug of role.relatedServiceSlugs) {
        if (!liveServiceSlugs.has(slug)) offenders.push(`${role.slug} -> ${slug}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});

describe("5. Every relatedSectorSlugs reference resolves to a real sector", () => {
  const liveSectorSlugs = new Set(sectors.map((s) => s.slug));

  it("services-data.ts relatedSectorSlugs all resolve", () => {
    const offenders: string[] = [];
    for (const content of serviceContent) {
      for (const slug of content.relatedSectorSlugs) {
        if (!liveSectorSlugs.has(slug)) offenders.push(`${content.slug} -> ${slug}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("locations-data.ts relatedSectorSlugs all resolve", () => {
    const offenders: string[] = [];
    for (const location of locationContent) {
      for (const slug of location.relatedSectorSlugs) {
        if (!liveSectorSlugs.has(slug)) offenders.push(`${location.slug} -> ${slug}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("talent-roles-data.ts relatedSectorSlugs all resolve", () => {
    const offenders: string[] = [];
    for (const role of talentRoleContent) {
      for (const slug of role.relatedSectorSlugs) {
        if (!liveSectorSlugs.has(slug)) offenders.push(`${role.slug} -> ${slug}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});

describe("6. All 48 service-location pages still exist", () => {
  it("has exactly 48 service-location combinations, each built from a live renamed service slug", () => {
    expect(serviceLocationCombos.length).toBe(48);
    const liveServiceSlugs = new Set(services.map((s) => s.slug));
    for (const combo of serviceLocationCombos) {
      expect(liveServiceSlugs.has(combo.serviceSlug), `${combo.slug} references unknown service ${combo.serviceSlug}`).toBe(true);
      expect(combo.slug).toBe(`${combo.serviceSlug}-${combo.locationSlug}`);
      expect(combo.slug.endsWith("-firm-in-the-uk-" + combo.locationSlug)).toBe(true);
    }
  });
});

describe("7. Both category-location pages still exist", () => {
  it("keeps exactly Outsourced HR Services–Worcester and Recruitment & Talent Acquisition–Liverpool", () => {
    expect(categoryLocationCombos.length).toBe(2);
    const slugs = categoryLocationCombos.map((c) => c.slug).sort();
    expect(slugs).toEqual(
      ["outsourced-hr-services-firm-in-the-uk-worcester", "recruitment-and-talent-acquisition-firm-in-the-uk-liverpool"].sort(),
    );
  });
});

describe("8 & 9. Sitemap contains only new canonical service/sector URLs; old URLs are absent", () => {
  it("every /services/ and /sector/ sitemap URL matches a live service, category, sector or service-location slug", async () => {
    const entries = await sitemap();
    const liveServiceSlugs = new Set(services.map((s) => `/services/${s.slug}/`));
    const liveCategorySlugs = new Set(serviceCategories.map((c) => `/services/${c.slug}/`));
    const liveSectorSlugs = new Set(sectors.map((s) => `/sector/${s.slug}/`));
    const liveComboSlugs = new Set(
      [...serviceLocationCombos, ...categoryLocationCombos].map((c) => `/services/${c.slug}/`),
    );

    const offenders: string[] = [];
    for (const entry of entries) {
      const path = new URL(entry.url).pathname;
      if (path === "/services/" || path === "/sector/") continue;
      if (path.startsWith("/services/") || path.startsWith("/sector/")) {
        const known =
          liveServiceSlugs.has(path) || liveCategorySlugs.has(path) || liveSectorSlugs.has(path) || liveComboSlugs.has(path);
        if (!known) offenders.push(path);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("does not contain any legacy pre-rename service or sector slug pattern lacking 'firm-in-the-uk' / 'hr-company-for'", async () => {
    const entries = await sitemap();
    const offenders: string[] = [];
    for (const entry of entries) {
      const path = new URL(entry.url).pathname;
      if (path === "/services/" || path === "/sector/") continue;
      if (/^\/services\//.test(path) && !path.includes("firm-in-the-uk")) offenders.push(path);
      if (/^\/sector\//.test(path) && !path.includes("hr-company-for-")) offenders.push(path);
    }
    expect(offenders).toEqual([]);
  });
});

describe("10. No new old-URL-to-new-URL redirect was created for this rename", () => {
  it("keeps exactly 116 redirect rules (the pre-rename baseline; none added, none removed)", () => {
    expect(redirectRules.length).toBe(116);
  });

  it("has no redirect rule whose source and destination are both current, renamed service/sector/category slugs (which would indicate a rename-only redirect)", () => {
    const liveServicePaths = new Set(services.map((s) => `/services/${s.slug}/`));
    const liveCategoryPaths = new Set(serviceCategories.map((c) => `/services/${c.slug}/`));
    const liveSectorPaths = new Set(sectors.map((s) => `/sector/${s.slug}/`));
    const liveAll = new Set([...liveServicePaths, ...liveCategoryPaths, ...liveSectorPaths]);

    const suspect = redirectRules.filter((rule) => liveAll.has(rule.source) && liveAll.has(rule.destination));
    expect(suspect.map((r) => `${r.source} -> ${r.destination}`)).toEqual([]);
  });

  it("has no redirect rule whose source is itself one of the 58 current service/category slugs or 17 current sector slugs", () => {
    const liveServicePaths = new Set(services.map((s) => `/services/${s.slug}/`));
    const liveCategoryPaths = new Set(serviceCategories.map((c) => `/services/${c.slug}/`));
    const liveSectorPaths = new Set(sectors.map((s) => `/sector/${s.slug}/`));
    const liveAll = new Set([...liveServicePaths, ...liveCategoryPaths, ...liveSectorPaths]);

    const conflicts = redirectRules.filter((rule) => liveAll.has(rule.source));
    expect(conflicts.map((r) => r.source)).toEqual([]);
  });
});

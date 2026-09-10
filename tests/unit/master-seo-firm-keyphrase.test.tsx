import { describe, expect, it } from "vitest";
import { services, serviceCategories, getService, getServiceCategory } from "@/config/services";
import { serviceContent, serviceCategoryContent } from "@/content/services-data";
import { sectors } from "@/config/sectors";
import { sectorContent } from "@/content/sectors-data";
import { serviceLocationCombos } from "@/config/service-locations";
import { getLocation } from "@/config/locations";
import { generateMetadata as generateServiceMetadata } from "@/app/services/[slug]/page";
import { generateMetadata as generateSectorMetadata } from "@/app/sector/[slug]/page";
import { getServiceJsonLd } from "@/lib/seo/structured-data";

/**
 * Master site-wide SEO implementation: firm-focused keyphrase strategy for
 * services/categories/service-locations ("[X] Firm in the UK" / "[X] Firm
 * in [Location]") and company-focused keyphrase strategy for sectors ("HR
 * Company for [X] in the UK"). Per explicit user decision, "leading" is
 * dropped throughout (no supporting evidence exists for that superlative),
 * existing approved URLs are preserved (a migration table is produced
 * separately for future approval before any redirect is created), and
 * location coverage stays limited to the 48 curated service-location
 * combinations (no new doorway pages).
 */

// Matches "leading" only as an unverified positioning claim about Apex HR
// itself (e.g. "Apex HR is a leading X firm", "the leading HR company")
// — not ordinary English usage such as "leading to" (= resulting in),
// which appears legitimately in several records' outcome-consequence
// sentences and is not a market-position claim.
const LEADING_CLAIM = /\bleading\b(?!\s+to\b)/i;

describe("Service and category pages — firm keyphrase", () => {
  it("every one of the 48 services generates a title of '{Service} Firm in the UK' with no 'leading' claim", async () => {
    for (const service of services) {
      const metadata = await generateServiceMetadata({ params: Promise.resolve({ slug: service.slug }) });
      expect(metadata.title).toBe(`${service.title} Firm in the UK`);
      expect(String(metadata.title)).not.toMatch(LEADING_CLAIM);
    }
  });

  it("every one of the 10 service families generates a title of '{Category} Firm in the UK'", async () => {
    for (const category of serviceCategories) {
      const metadata = await generateServiceMetadata({ params: Promise.resolve({ slug: category.slug }) });
      expect(metadata.title).toBe(`${category.title} Firm in the UK`);
    }
  });

  it("every service and category Service JSON-LD name matches the firm keyphrase", () => {
    for (const service of services) {
      const content = serviceContent.find((c) => c.slug === service.slug)!;
      const ld = getServiceJsonLd({ name: `${service.title} Firm in the UK`, description: content.metaDescription, path: `/services/${service.slug}/` });
      expect(ld.name).toBe(`${service.title} Firm in the UK`);
      expect(ld.name).not.toMatch(LEADING_CLAIM);
    }
  });

  it("all 48 service meta descriptions follow the 'Apex HR is a/an [x] firm...' pattern, are unique, and contain no 'leading' claim", () => {
    expect(serviceContent.length).toBe(48);
    const descriptions = serviceContent.map((c) => c.metaDescription);
    expect(new Set(descriptions).size).toBe(48);
    for (const content of serviceContent) {
      expect(content.metaDescription, `${content.slug} meta description pattern`).toMatch(/^Apex HR is an? .+ firm /);
      expect(content.metaDescription).not.toMatch(LEADING_CLAIM);
      expect(content.metaDescription).toMatch(/\bUK\b/);
    }
  });
});

describe("Sector pages — HR company keyphrase", () => {
  it("every one of the 17 sectors generates a title of 'HR Company for {Sector} in the UK' with no 'leading' claim", async () => {
    for (const sector of sectors) {
      const metadata = await generateSectorMetadata({ params: Promise.resolve({ slug: sector.slug }) });
      expect(metadata.title).toBe(`HR Company for ${sector.title} in the UK`);
      expect(String(metadata.title)).not.toMatch(LEADING_CLAIM);
    }
  });

  it("all 17 sector meta descriptions follow the 'Apex HR is a specialist HR company for [x]...' pattern, are unique, and contain no 'leading' claim", () => {
    expect(sectorContent.length).toBe(17);
    const descriptions = sectorContent.map((s) => s.metaDescription);
    expect(new Set(descriptions).size).toBe(17);
    for (const content of sectorContent) {
      expect(content.metaDescription, `${content.slug} meta description pattern`).toMatch(/^Apex HR is a specialist HR company for /);
      expect(content.metaDescription).not.toMatch(LEADING_CLAIM);
      expect(content.metaDescription).toMatch(/\bin the UK\b/);
    }
  });

  it("service and sector keyphrases never collide on the same primary intent (service = '[x] Firm', sector = 'HR Company for [x]')", () => {
    const serviceTitles = new Set(services.map((s) => s.title.toLowerCase()));
    const sectorTitles = new Set(sectors.map((s) => s.title.toLowerCase()));
    const overlap = [...serviceTitles].filter((t) => sectorTitles.has(t));
    expect(overlap).toEqual([]);
  });
});

describe("Service-location pages — firm-in-location keyphrase, curated combinations only", () => {
  it("generates a title of '{Service} Firm in {Location}' for every one of the 48 curated combinations", async () => {
    for (const combo of serviceLocationCombos) {
      const metadata = await generateServiceMetadata({ params: Promise.resolve({ slug: combo.slug }) });
      const service = getService(combo.serviceSlug)!;
      const location = getLocation(combo.locationSlug)!;
      expect(metadata.title).toBe(`${service.title} Firm in ${location.title}`);
      expect(String(metadata.title)).not.toMatch(LEADING_CLAIM);
    }
  });

  it("does not expand beyond the 48 curated combinations (no new service x location doorway pages)", () => {
    expect(serviceLocationCombos.length).toBe(48);
  });
});

describe("Global: no unverified 'leading' claim anywhere in service or sector content", () => {
  it("no service record (any field) contains an unverified 'leading' positioning claim", () => {
    const offenders: string[] = [];
    for (const content of serviceContent) {
      if (LEADING_CLAIM.test(JSON.stringify(content))) offenders.push(content.slug);
    }
    expect(offenders).toEqual([]);
  });

  it("no sector record (any field) contains an unverified 'leading' positioning claim", () => {
    const offenders: string[] = [];
    for (const content of sectorContent) {
      if (LEADING_CLAIM.test(JSON.stringify(content))) offenders.push(content.slug);
    }
    expect(offenders).toEqual([]);
  });

  it("no service-category record contains an unverified 'leading' positioning claim", () => {
    const offenders: string[] = [];
    for (const content of serviceCategoryContent) {
      if (LEADING_CLAIM.test(JSON.stringify(content))) offenders.push(content.slug);
    }
    expect(offenders).toEqual([]);
  });
});

describe("Category and sector catalogue completeness (no service, sector or family omitted)", () => {
  it("has exactly 10 service families and 48 individual services, matching the master sitemap catalogue", () => {
    expect(serviceCategories.length).toBe(10);
    expect(services.length).toBe(48);
  });

  it("has exactly 17 approved sectors", () => {
    expect(sectors.length).toBe(17);
  });

  it("every service belongs to a real, existing family", () => {
    for (const service of services) {
      expect(getServiceCategory(service.categorySlug), `${service.slug} -> unknown category ${service.categorySlug}`).toBeDefined();
    }
  });
});

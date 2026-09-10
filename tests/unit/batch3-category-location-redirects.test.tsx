import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { redirectRules } from "@/config/redirects";
import { contentManifest } from "@/content/manifest";
import {
  categoryLocationCombos,
  getChildServicesForCategoryCombo,
  serviceLocationCombos,
} from "@/config/service-locations";
import { locationContent } from "@/content/locations-data";
import { getLocation } from "@/config/locations";
import { getService, getServiceCategory, services } from "@/config/services";
import { serviceContent } from "@/content/services-data";
import { CategoryLocationTemplate } from "@/components/templates/category-location-template";

/**
 * SEO audit Phase 2 Batch 3 (docs/URL-DECISION-REGISTER.md D-015) safeguards.
 * These are data-driven against the actual source data (locationContent,
 * services, redirectRules, contentManifest) rather than a hardcoded list of
 * the 44 slugs, so they keep validating correctly if the underlying curated
 * data ever changes.
 */

// The 46 category-location combinations as D-014 originally defined them
// (>=1 curated child service), recomputed independently of the current
// >=2 threshold in src/config/service-locations.ts so this test can tell
// "redirected" apart from "never existed."
interface OriginalCombo {
  slug: string;
  categorySlug: string;
  locationSlug: string;
  childServiceSlugs: string[];
}

function computeOriginalCategoryLocationCombos(): OriginalCombo[] {
  const combos: OriginalCombo[] = [];
  for (const location of locationContent) {
    const byCategory = new Map<string, string[]>();
    for (const serviceSlug of location.relatedServiceSlugs) {
      const categorySlug = getService(serviceSlug)?.categorySlug;
      if (!categorySlug) continue;
      const list = byCategory.get(categorySlug) ?? [];
      list.push(serviceSlug);
      byCategory.set(categorySlug, list);
    }
    for (const [categorySlug, childServiceSlugs] of byCategory) {
      combos.push({
        slug: `${categorySlug}-${location.slug}`,
        categorySlug,
        locationSlug: location.slug,
        childServiceSlugs,
      });
    }
  }
  return combos;
}

const originalCombos = computeOriginalCategoryLocationCombos();
const retainedSlugs = new Set(categoryLocationCombos.map((combo) => combo.slug));
const retiredCombos = originalCombos.filter((combo) => !retainedSlugs.has(combo.slug));
const batch3Rules = redirectRules.filter((rule) => rule.reason.includes("D-015"));

const manifestPathToEntry = new Map(contentManifest.map((entry) => [entry.canonicalPath, entry]));
const sitemapPaths = new Set(contentManifest.filter((entry) => entry.indexable).map((entry) => entry.canonicalPath));
const serviceLocationSlugs = new Set(serviceLocationCombos.map((combo) => combo.slug));

describe("Batch 3 — retired combo count and threshold", () => {
  it("retires exactly the 44 single-child combinations and retains exactly the 2 multi-child ones", () => {
    expect(originalCombos.length).toBe(46);
    expect(retiredCombos.length).toBe(44);
    expect(categoryLocationCombos.length).toBe(2);
  });

  it("every retired combo had exactly one curated child service (the redirect's justification)", () => {
    const wrongChildCount = retiredCombos.filter((combo) => combo.childServiceSlugs.length !== 1);
    expect(
      wrongChildCount,
      `Retired combos without exactly one child service: ${wrongChildCount.map((c) => c.slug).join(", ")}`,
    ).toEqual([]);
  });

  it("every retained combo has two or more curated child services", () => {
    const wrongChildCount = originalCombos.filter(
      (combo) => retainedSlugs.has(combo.slug) && combo.childServiceSlugs.length < 2,
    );
    expect(wrongChildCount).toEqual([]);
  });
});

describe("Batch 3 — every retired combo has exactly one valid redirect", () => {
  it("has exactly 44 D-015 redirect rules, one per retired combo", () => {
    expect(batch3Rules.length).toBe(44);
  });

  it("has exactly one redirect rule per retired combo source, with no source missing or duplicated", () => {
    const retiredSources = retiredCombos.map((combo) => `/services/${combo.slug}/`);
    const ruleSources = batch3Rules.map((rule) => rule.source);

    const missing = retiredSources.filter((source) => !ruleSources.includes(source));
    expect(missing, `Retired combos with no redirect rule: ${missing.join(", ")}`).toEqual([]);

    const counts = new Map<string, number>();
    for (const source of ruleSources) counts.set(source, (counts.get(source) ?? 0) + 1);
    const duplicated = [...counts.entries()].filter(([, count]) => count > 1).map(([source]) => source);
    expect(duplicated, `Redirect sources with more than one rule: ${duplicated.join(", ")}`).toEqual([]);
  });

  it("redirects each retired combo to its own single curated child service's service-location URL", () => {
    const mismatches: string[] = [];
    for (const combo of retiredCombos) {
      const rule = batch3Rules.find((r) => r.source === `/services/${combo.slug}/`);
      if (!rule) continue; // covered by the previous test
      const expectedDestination = `/services/${combo.childServiceSlugs[0]}-${combo.locationSlug}/`;
      if (rule.destination !== expectedDestination) {
        mismatches.push(`${rule.source} -> ${rule.destination} (expected ${expectedDestination})`);
      }
    }
    expect(mismatches).toEqual([]);
  });
});

describe("Batch 3 — destination validity", () => {
  it("every D-015 destination is a real, generated service-location page", () => {
    const invalid = batch3Rules.filter((rule) => {
      const slug = rule.destination.replace(/^\/services\//, "").replace(/\/$/, "");
      return !serviceLocationSlugs.has(slug);
    });
    expect(invalid, `Destinations with no matching service-location page: ${invalid.map((r) => r.destination).join(", ")}`).toEqual([]);
  });

  it("every D-015 destination is indexable and present in the sitemap", () => {
    const notIndexable = batch3Rules.filter((rule) => !sitemapPaths.has(rule.destination));
    expect(
      notIndexable,
      `Destinations missing from the sitemap: ${notIndexable.map((r) => r.destination).join(", ")}`,
    ).toEqual([]);
  });

  it("every D-015 destination has a self-referencing canonical path recorded in the manifest", () => {
    const wrong = batch3Rules.filter((rule) => {
      const entry = manifestPathToEntry.get(rule.destination);
      return !entry || entry.canonicalPath !== rule.destination;
    });
    expect(wrong).toEqual([]);
  });
});

describe("Batch 3 — no chains, loops or self-redirects among the D-015 rules", () => {
  it("never redirects a source to itself", () => {
    expect(batch3Rules.filter((r) => r.source === r.destination)).toEqual([]);
  });

  it("has no destination that is itself any redirect rule's source (no chains)", () => {
    const allSources = new Set(redirectRules.map((r) => r.source));
    const chains = batch3Rules.filter((r) => allSources.has(r.destination));
    expect(chains, `Chained redirects: ${chains.map((r) => `${r.source} -> ${r.destination}`).join(", ")}`).toEqual([]);
  });

  it("has no cycle reachable by following redirects from any D-015 source", () => {
    const bySource = new Map(redirectRules.map((r) => [r.source, r.destination]));
    for (const rule of batch3Rules) {
      const visited = new Set<string>();
      let current: string | undefined = rule.source;
      while (current) {
        expect(visited.has(current), `Redirect loop detected starting at ${rule.source}`).toBe(false);
        visited.add(current);
        current = bySource.get(current);
      }
    }
  });
});

describe("Batch 3 — sitemap and route-record consistency", () => {
  it("has no retired combo source present in the content manifest (and therefore absent from the sitemap)", () => {
    const stillPresent = retiredCombos.filter((combo) => manifestPathToEntry.has(`/services/${combo.slug}/`));
    expect(
      stillPresent,
      `Retired combos still in the manifest: ${stillPresent.map((c) => c.slug).join(", ")}`,
    ).toEqual([]);
  });

  it("has no redirect source that is also a published canonical path (all 116 rules, not just D-015)", () => {
    const canonicalPaths = new Set(contentManifest.map((entry) => entry.canonicalPath));
    const conflicts = redirectRules.filter((rule) => canonicalPaths.has(rule.source));
    expect(conflicts).toEqual([]);
  });
});

describe("Batch 3 — no internal link configuration points to a retired combo source", () => {
  it("has no manifest relatedPages reference to a retired combo", () => {
    const retiredPaths = new Set(retiredCombos.map((combo) => `/services/${combo.slug}/`));
    const offenders: string[] = [];
    for (const entry of contentManifest) {
      for (const related of entry.relatedPages ?? []) {
        if (retiredPaths.has(related)) offenders.push(`${entry.canonicalPath} -> ${related}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("has no manifest parent reference to a retired combo", () => {
    const retiredPaths = new Set(retiredCombos.map((combo) => `/services/${combo.slug}/`));
    const offenders = contentManifest.filter((entry) => entry.parent && retiredPaths.has(entry.parent));
    expect(offenders.map((e) => e.canonicalPath)).toEqual([]);
  });
});

describe("Batch 3 — the two retained category-location pages", () => {
  it("keeps exactly Outsourced HR Services–Worcester and Recruitment & Talent Acquisition–Liverpool indexable", () => {
    const slugs = categoryLocationCombos.map((c) => c.slug).sort();
    expect(slugs).toEqual(["outsourced-hr-services-worcester", "recruitment-talent-acquisition-liverpool"].sort());

    for (const combo of categoryLocationCombos) {
      const entry = manifestPathToEntry.get(`/services/${combo.slug}/`);
      expect(entry?.indexable, `${combo.slug} should be indexable`).toBe(true);
    }
  });

  it("has each retained page's two-or-more curated child services actually confirmed under its category", () => {
    for (const combo of categoryLocationCombos) {
      const location = locationContent.find((l) => l.slug === combo.locationSlug);
      expect(location).toBeDefined();
      const childSlugs = (location?.relatedServiceSlugs ?? []).filter(
        (slug) => getService(slug)?.categorySlug === combo.categorySlug,
      );
      expect(childSlugs.length).toBeGreaterThanOrEqual(2);
      for (const childSlug of childSlugs) {
        const child = getService(childSlug);
        expect(child, `${childSlug} should be a confirmed service`).toBeDefined();
        expect(services.some((s) => s.slug === childSlug)).toBe(true);
      }
      const category = getServiceCategory(combo.categorySlug);
      expect(category).toBeDefined();
    }
  });

  it("renders a link to every one of its two-or-more child services on the page", () => {
    for (const combo of categoryLocationCombos) {
      const locationInfo = locationContent.find((l) => l.slug === combo.locationSlug);
      const locationItem = getLocation(combo.locationSlug);
      const category = getServiceCategory(combo.categorySlug);
      if (!locationInfo || !locationItem || !category) continue;

      const childServices = getChildServicesForCategoryCombo(combo).map((service) => {
        const content = serviceContent.find((entry) => entry.slug === service.slug);
        return {
          title: service.title,
          href: `/services/${service.slug}-${combo.locationSlug}/`,
          summary: content?.heroSummary ?? "",
        };
      });
      expect(childServices.length).toBeGreaterThanOrEqual(2);

      const { getAllByRole } = render(
        <CategoryLocationTemplate
          breadcrumbTrail={[]}
          categoryTitle={category.title}
          categoryHref={`/services/${category.slug}/`}
          categorySummary="Summary"
          bulletListTitle="Where this helps"
          bulletList={["Point one"]}
          childServices={childServices}
          locationTitle={locationItem.title}
          locationRegion={locationInfo.region}
          locationHref={`/locations/${combo.locationSlug}/`}
          localContext={locationInfo.localContext}
          faqs={[]}
        />,
      );

      const links = getAllByRole("link").map((el) => el.getAttribute("href")?.replace(/\/$/, ""));
      for (const service of childServices) {
        expect(links, `Missing link to ${service.href} on ${combo.slug}`).toContain(
          service.href.replace(/\/$/, ""),
        );
      }
    }
  });
});

describe("Batch 3 — /llms.txt still excludes every disputed combination URL", () => {
  it("contains none of the 46 original category-location URLs, redirected or retained", () => {
    const llmsTxt = readFileSync(join(process.cwd(), "public/llms.txt"), "utf-8");
    const present = originalCombos.filter((combo) => llmsTxt.includes(`/services/${combo.slug}/`));
    expect(present.map((c) => c.slug)).toEqual([]);
  });

  it("contains none of the 48 service-location combination URLs either", () => {
    const llmsTxt = readFileSync(join(process.cwd(), "public/llms.txt"), "utf-8");
    const present = serviceLocationCombos.filter((combo) => llmsTxt.includes(`/services/${combo.slug}/`));
    expect(present.map((c) => c.slug)).toEqual([]);
  });
});

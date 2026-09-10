import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import { ServiceLocationTemplate } from "@/components/templates/service-location-template";
import { CategoryLocationTemplate } from "@/components/templates/category-location-template";
import { serviceContent } from "@/content/services-data";
import { serviceCategoryContent } from "@/content/services-data";
import { serviceLocationCombos, categoryLocationCombos, getChildServicesForCategoryCombo } from "@/config/service-locations";
import { getLocation } from "@/config/locations";
import { locationContent } from "@/content/locations-data";
import { getService, getServiceCategory } from "@/config/services";

/**
 * Corrective QA pass on the final consolidated SEO phase. Covers a real
 * internal-linking gap found and fixed this pass: service-location and
 * category-location pages linked only to the generic /locations/ hub, never
 * to their own specific parent location page — weakening the intended
 * distinction that the individual location page owns the broader "HR
 * support in {location}" intent. Also covers the review-register count
 * clarification (5 notes, not 4, for the final eight services' review
 * documentation).
 */

describe("Service-location and category-location pages link to their specific parent location page", () => {
  it("ServiceLocationTemplate renders a link to locationHref with descriptive anchor text", () => {
    const combo = serviceLocationCombos[0];
    const service = getService(combo.serviceSlug)!;
    const content = serviceContent.find((c) => c.slug === combo.serviceSlug)!;
    const location = getLocation(combo.locationSlug)!;
    const locationInfo = locationContent.find((l) => l.slug === combo.locationSlug)!;

    const { getByRole } = render(
      <ServiceLocationTemplate
        breadcrumbTrail={[]}
        entityTitle={service.title}
        entityHref={`/services/${service.slug}/`}
        entitySummary={content.heroSummary}
        bulletListTitle="What this includes"
        bulletList={content.whatItIncludes}
        locationTitle={location.title}
        locationRegion={locationInfo.region}
        locationHref={`/locations/${location.slug}/`}
        localContext={locationInfo.localContext}
        faqs={[]}
      />,
    );
    const link = getByRole("link", { name: new RegExp(`support in ${location.title}`, "i") });
    // next/link strips the trailing slash when rendered under RTL/jsdom
    // (matches the normalisation already used by every other link-href
    // assertion in this suite), so compare with it stripped from both sides.
    expect(link.getAttribute("href")).toBe(`/locations/${location.slug}`);
  });

  it("CategoryLocationTemplate renders a link to locationHref with descriptive anchor text", () => {
    const combo = categoryLocationCombos[0];
    const category = getServiceCategory(combo.categorySlug)!;
    const content = serviceCategoryContent.find((c) => c.slug === combo.categorySlug)!;
    const location = getLocation(combo.locationSlug)!;
    const locationInfo = locationContent.find((l) => l.slug === combo.locationSlug)!;
    const childServices = getChildServicesForCategoryCombo(combo).map((s) => {
      const c = serviceContent.find((entry) => entry.slug === s.slug)!;
      return { title: s.title, href: `/services/${s.slug}-${combo.locationSlug}/`, summary: c.heroSummary };
    });

    const { getByRole } = render(
      <CategoryLocationTemplate
        breadcrumbTrail={[]}
        categoryTitle={category.title}
        categoryHref={`/services/${category.slug}/`}
        categorySummary={content.summary}
        bulletListTitle="Where this family helps"
        bulletList={content.challenges.map((c) => c.title)}
        childServices={childServices}
        locationTitle={location.title}
        locationRegion={locationInfo.region}
        locationHref={`/locations/${location.slug}/`}
        localContext={locationInfo.localContext}
        faqs={[]}
      />,
    );
    const link = getByRole("link", { name: new RegExp(`support in ${location.title}`, "i") });
    // next/link strips the trailing slash when rendered under RTL/jsdom
    // (matches the normalisation already used by every other link-href
    // assertion in this suite), so compare with it stripped from both sides.
    expect(link.getAttribute("href")).toBe(`/locations/${location.slug}`);
  });

  it("every one of the 48 service-location combos resolves to a real, existing location slug", () => {
    for (const combo of serviceLocationCombos) {
      expect(getLocation(combo.locationSlug), `${combo.slug} -> unknown location ${combo.locationSlug}`).toBeDefined();
    }
  });
});

describe("Review-register count clarification", () => {
  it("docs/CONTENT-REVIEW.md has exactly five distinct review notes for the final eight services' five flagged services, not four merged into fewer headings", () => {
    const doc = fs.readFileSync(path.join(process.cwd(), "docs/CONTENT-REVIEW.md"), "utf8");
    const headings = [
      "### HRIS Implementation",
      "### HR Software Selection",
      "### People Analytics & HR Dashboards",
      "### AI Workplace Policy & HR Integration",
      "### Global Mobility & Expatriate HR Management",
    ];
    for (const heading of headings) {
      const count = doc.split(heading).length - 1;
      expect(count, `Expected exactly one "${heading}" heading, found ${count}`).toBe(1);
    }
  });
});

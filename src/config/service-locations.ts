import { getService, type ServiceItem } from "@/config/services";
import { locationContent } from "@/content/locations-data";

/**
 * Curated service+location and category+location combination pages, per
 * docs/URL-DECISION-REGISTER.md D-014. CLAUDE.md section 9 explicitly gates
 * the full 58-service x 16-location cross-product (816 recorded
 * combinations) behind "approved demand or keyword intent... verified
 * service availability... editorial approval" precisely to avoid
 * publishing near-duplicate doorway pages that only swap a city name.
 *
 * Rather than generating all 928 possible pairs, this module derives pages
 * only from each location's own already-curated `relatedServiceSlugs`
 * (src/content/locations-data.ts) — the small set of services genuinely
 * picked as relevant to that location's real economic context.
 *
 * Category pages are derived the same way, but per the SEO audit Phase 2
 * Batch 3 category-location decision (docs/URL-DECISION-REGISTER.md D-015):
 * a category is only paired with a location when that location has at
 * least TWO curated services within it. A category page backed by only one
 * curated child service targeted a near-identical keyword to that one
 * service's own service-location page (e.g. "recruitment & talent
 * acquisition london" vs. "executive search london"), which is exactly the
 * near-duplicate-doorway-page risk CLAUDE.md section 9 gates against — so
 * those 44 single-child combinations were retired as pages (see
 * src/config/redirects.ts, 44 rules redirecting each to its one child
 * service-location page) rather than kept as thin, cannibalising
 * duplicates. Two locations curate two services within the same category
 * (Outsourced HR Services in Worcester, Recruitment & Talent Acquisition in
 * Liverpool) — those retain a genuinely justified category-location page.
 */

export interface ServiceLocationCombo {
  type: "service";
  slug: string;
  serviceSlug: string;
  locationSlug: string;
}

export interface CategoryLocationCombo {
  type: "category";
  slug: string;
  categorySlug: string;
  locationSlug: string;
}

export type LocationCombo = ServiceLocationCombo | CategoryLocationCombo;

export const serviceLocationCombos: ServiceLocationCombo[] = locationContent.flatMap((location) =>
  location.relatedServiceSlugs.map((serviceSlug) => ({
    type: "service" as const,
    slug: `${serviceSlug}-${location.slug}`,
    serviceSlug,
    locationSlug: location.slug,
  })),
);

export const categoryLocationCombos: CategoryLocationCombo[] = (() => {
  const combos: CategoryLocationCombo[] = [];

  for (const location of locationContent) {
    const servicesPerCategory = new Map<string, number>();
    for (const serviceSlug of location.relatedServiceSlugs) {
      const categorySlug = getService(serviceSlug)?.categorySlug;
      if (!categorySlug) continue;
      servicesPerCategory.set(categorySlug, (servicesPerCategory.get(categorySlug) ?? 0) + 1);
    }

    for (const [categorySlug, count] of servicesPerCategory) {
      if (count < 2) continue;
      combos.push({
        type: "category",
        slug: `${categorySlug}-${location.slug}`,
        categorySlug,
        locationSlug: location.slug,
      });
    }
  }

  return combos;
})();

export function getLocationCombo(slug: string): LocationCombo | undefined {
  return (
    serviceLocationCombos.find((combo) => combo.slug === slug) ??
    categoryLocationCombos.find((combo) => combo.slug === slug)
  );
}

/**
 * The confirmed child services that justify a retained category-location
 * page's existence (SEO audit Phase 2 Batch 3) — the same curated set used
 * to build `categoryLocationCombos` above, re-derived here so the page
 * template can introduce and link to each one by name rather than only the
 * category as a whole. Always returns 2+ services for a combo that actually
 * exists in `categoryLocationCombos`, since that's the threshold that
 * creates the combo in the first place.
 */
export function getChildServicesForCategoryCombo(combo: CategoryLocationCombo): ServiceItem[] {
  const location = locationContent.find((entry) => entry.slug === combo.locationSlug);
  if (!location) return [];
  return location.relatedServiceSlugs
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service): service is ServiceItem => Boolean(service) && service!.categorySlug === combo.categorySlug);
}

/**
 * Many locations share the same curated service, whose own base
 * `metaDescription` is identical everywhere it's used — appending a real,
 * location-specific clause keeps every combination page's meta description
 * genuinely unique, rather than duplicating the exact same description
 * across many location pages (a duplicate-content signal in its own
 * right, on top of the CLAUDE.md section 9 doorway-page concern).
 */
export function buildComboMetaDescription(baseDescription: string, locationTitle: string, region: string): string {
  return `${baseDescription} Serving employers in ${locationTitle} and the wider ${region}.`;
}

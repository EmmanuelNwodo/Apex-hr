/**
 * Canonical sector taxonomy. Source of truth: docs/MASTER-SITEMAP.md
 * section 8 and docs/URL-DECISION-REGISTER.md D-001/D-002. `/sector/` is
 * canonical; `/industries/` is a redirect-only alias, not implemented here.
 * Professional Services and IT are distinct sectors and must not
 * canonicalise to each other.
 */

export interface SectorItem {
  slug: string;
  title: string;
}

export const sectors: SectorItem[] = [
  { slug: "startups-scale-ups", title: "Startups & Scale-ups" },
  { slug: "professional-services", title: "Professional Services" },
  { slug: "health-care", title: "Healthcare" },
  { slug: "life-sciences", title: "Life Sciences" },
  { slug: "technology", title: "IT" },
  { slug: "financial-services", title: "Financial Services" },
  { slug: "accountants", title: "Accountants" },
  { slug: "architects", title: "Architects" },
  { slug: "care-homes", title: "Care Homes" },
  { slug: "charity", title: "Charity" },
  { slug: "construction", title: "Construction" },
  { slug: "distribution", title: "Distribution" },
  { slug: "education", title: "Education" },
  { slug: "engineers", title: "Engineers" },
  { slug: "leisure", title: "Leisure" },
  { slug: "manufacturers", title: "Manufacturers" },
  { slug: "hospitality", title: "Hospitality" },
];

export function getSector(slug: string) {
  return sectors.find((sector) => sector.slug === slug);
}

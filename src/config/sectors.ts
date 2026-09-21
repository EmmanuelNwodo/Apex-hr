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
  { slug: "hr-company-for-startups-and-scale-ups-in-the-uk", title: "Startups & Scale-ups" },
  { slug: "hr-company-for-professional-services-in-the-uk", title: "Professional Services" },
  { slug: "hr-company-for-healthcare-in-the-uk", title: "Healthcare" },
  { slug: "hr-company-for-life-sciences-in-the-uk", title: "Life Sciences" },
  { slug: "hr-company-for-it-in-the-uk", title: "IT" },
  { slug: "hr-company-for-financial-services-in-the-uk", title: "Financial Services" },
  { slug: "hr-company-for-accountants-in-the-uk", title: "Accountants" },
  { slug: "hr-company-for-architects-in-the-uk", title: "Architects" },
  { slug: "hr-company-for-care-homes-in-the-uk", title: "Care Homes" },
  { slug: "hr-company-for-charity-in-the-uk", title: "Charity" },
  { slug: "hr-company-for-construction-in-the-uk", title: "Construction" },
  { slug: "hr-company-for-distribution-in-the-uk", title: "Distribution" },
  { slug: "hr-company-for-education-in-the-uk", title: "Education" },
  { slug: "hr-company-for-engineers-in-the-uk", title: "Engineers" },
  { slug: "hr-company-for-leisure-in-the-uk", title: "Leisure" },
  { slug: "hr-company-for-manufacturers-in-the-uk", title: "Manufacturers" },
  { slug: "hr-company-for-hospitality-in-the-uk", title: "Hospitality" },
];

export function getSector(slug: string) {
  return sectors.find((sector) => sector.slug === slug);
}

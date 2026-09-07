/**
 * Canonical location taxonomy. Source of truth: docs/MASTER-SITEMAP.md
 * section 9 and docs/URL-DECISION-REGISTER.md D-004. Nottingham, Worcester
 * and Staffordshire use the corrected spellings — the legacy misspelled
 * URLs (nothingham, worchester, standfordshire) are redirect sources only,
 * implemented in src/config/redirects.ts, never published as pages.
 */

export interface LocationItem {
  slug: string;
  title: string;
}

export const locations: LocationItem[] = [
  { slug: "london", title: "London" },
  { slug: "manchester", title: "Manchester" },
  { slug: "birmingham", title: "Birmingham" },
  { slug: "leeds", title: "Leeds" },
  { slug: "bristol", title: "Bristol" },
  { slug: "edinburgh", title: "Edinburgh" },
  { slug: "glasgow", title: "Glasgow" },
  { slug: "nottingham", title: "Nottingham" },
  { slug: "newcastle", title: "Newcastle" },
  { slug: "warwickshire", title: "Warwickshire" },
  { slug: "worcester", title: "Worcester" },
  { slug: "yorkshire", title: "Yorkshire" },
  { slug: "staffordshire", title: "Staffordshire" },
  { slug: "liverpool", title: "Liverpool" },
  { slug: "oxford", title: "Oxford" },
  { slug: "leicester", title: "Leicester" },
];

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}

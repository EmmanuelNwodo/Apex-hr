import type { PageType } from "@/types/content";
import { contentManifest } from "@/content/manifest";
import { absoluteUrl } from "@/config/site";
import { isReservedSlug } from "@/config/reserved-slugs";
import { getAllPublishedPostsForSitemap } from "@/lib/wordpress";

/**
 * Single source of truth for grouped sitemap data, shared by every
 * sitemap route handler (src/app/sitemap.xml, page-sitemap.xml,
 * service-sitemap.xml, sector-sitemap.xml, location-sitemap.xml,
 * talent-acquisition-sitemap.xml, insight-sitemap.xml) and by the
 * sitemap test suite. There is deliberately no second, hand-maintained
 * URL list anywhere — every entry is derived from src/content/manifest.ts
 * (itself derived from the same records that render every page) and, for
 * Insights, the live WordPress article feed, exactly as the original
 * src/app/sitemap.ts did.
 *
 * `lastModified` is only ever set from a genuine tracked date (currently
 * only WordPress's own `modified` field). No local content record tracks
 * a real per-page modification date, so manifest-derived entries never
 * carry a fabricated `lastModified` — see docs/URL-DECISION-REGISTER.md
 * and the SEO audit final consolidated phase, Part 9.
 *
 * Local groups (page/service/sector/location/talentAcquisition) are
 * derived synchronously from the manifest alone, so their route handlers
 * never touch the WordPress feed and stay fully static. Only the insight
 * group and the sitemap index (which needs an honest insight `lastmod`)
 * fetch WordPress, inheriting its ~5-minute revalidation window
 * (src/lib/wordpress/client.ts) — matching the original src/app/sitemap.ts
 * behaviour exactly.
 */

export interface SitemapImage {
  loc: string;
  title?: string;
}

export interface SitemapUrlEntry {
  loc: string;
  lastModified?: Date;
  images?: SitemapImage[];
}

export const SITEMAP_GROUP_KEYS = [
  "page",
  "service",
  "sector",
  "location",
  "talentAcquisition",
  "insight",
] as const;

export type SitemapGroupKey = (typeof SITEMAP_GROUP_KEYS)[number];

export type SitemapGroups = Record<SitemapGroupKey, SitemapUrlEntry[]>;

type LocalGroupKey = Exclude<SitemapGroupKey, "insight">;
export type LocalSitemapGroups = Record<LocalGroupKey, SitemapUrlEntry[]>;

/**
 * Classifies every member of the closed `PageType` union into exactly one
 * sitemap group. Written as an exhaustive switch (not a lookup table or an
 * "else" fallback) so that adding a new `PageType` without updating this
 * function fails `tsc --noEmit`, rather than silently mis-grouping — or
 * silently dropping — a future page from every child sitemap.
 */
function classifyPageType(pageType: PageType): SitemapGroupKey {
  switch (pageType) {
    case "home":
    case "serviceHub":
    case "sectorHub":
    case "locationHub":
    case "talentAcquisitionHub":
    case "employerLanding":
    case "candidateLanding":
    case "insightsHub":
    case "generalInformation":
    case "resourcesHub":
    case "caseStudiesHub":
    case "expertsHub":
    case "conversionLanding":
      return "page";
    case "serviceCategory":
    case "service":
    case "serviceLocation":
    case "serviceCategoryLocation":
      return "service";
    case "sector":
      return "sector";
    case "location":
      return "location";
    case "talentAcquisitionRole":
      return "talentAcquisition";
    case "insightCategory":
      return "insight";
    default: {
      const exhaustiveCheck: never = pageType;
      return exhaustiveCheck;
    }
  }
}

/**
 * The five manifest-only groups (everything except Insights/WordPress).
 * Synchronous and free of any network call, so the route handlers that
 * only need one of these groups (page-sitemap.xml, service-sitemap.xml,
 * sector-sitemap.xml, location-sitemap.xml, talent-acquisition-sitemap.xml)
 * stay fully static.
 */
export function getLocalSitemapGroups(): LocalSitemapGroups {
  const groups: LocalSitemapGroups = { page: [], service: [], sector: [], location: [], talentAcquisition: [] };

  for (const entry of contentManifest) {
    if (!entry.indexable) continue;
    const key = classifyPageType(entry.pageType);
    if (key === "insight") continue;
    groups[key].push({ loc: absoluteUrl(entry.canonicalPath) });
  }

  return groups;
}

/**
 * The Insights group: indexable `insightCategory` manifest entries plus
 * every currently-published WordPress article. Fetches WordPress, so this
 * (unlike `getLocalSitemapGroups`) carries the ~5-minute revalidation
 * window and never throws — an unreachable or misconfigured WordPress
 * simply contributes zero article entries.
 */
export async function getInsightSitemapEntries(): Promise<SitemapUrlEntry[]> {
  const entries: SitemapUrlEntry[] = [];

  for (const entry of contentManifest) {
    if (!entry.indexable) continue;
    if (classifyPageType(entry.pageType) !== "insight") continue;
    entries.push({ loc: absoluteUrl(entry.canonicalPath) });
  }

  const posts = await getAllPublishedPostsForSitemap();
  for (const post of posts) {
    if (isReservedSlug(post.slug)) continue;
    const modified = new Date(post.modifiedAt);
    entries.push({
      loc: absoluteUrl(`/${post.slug}/`),
      ...(Number.isNaN(modified.getTime()) ? {} : { lastModified: modified }),
      ...(post.featuredImage
        ? { images: [{ loc: post.featuredImage.url, ...(post.featuredImage.alt ? { title: post.featuredImage.alt } : {}) }] }
        : {}),
    });
  }

  return entries;
}

/** All six groups together — for the sitemap index (needs every group's lastmod) and for tests wanting the full picture. */
export async function getSitemapGroups(): Promise<SitemapGroups> {
  const local = getLocalSitemapGroups();
  const insight = await getInsightSitemapEntries();
  return { ...local, insight };
}

export function flattenSitemapGroups(groups: SitemapGroups): SitemapUrlEntry[] {
  return SITEMAP_GROUP_KEYS.flatMap((key) => groups[key]);
}

/** The most recent `lastModified` among a group's entries, or undefined if none carry one — never fabricated. */
export function latestLastModified(entries: SitemapUrlEntry[]): Date | undefined {
  const dates = entries.map((e) => e.lastModified).filter((d): d is Date => d instanceof Date);
  if (dates.length === 0) return undefined;
  return new Date(Math.max(...dates.map((d) => d.getTime())));
}

import { absoluteUrl } from "@/config/site";
import { getSitemapGroups, latestLastModified } from "@/lib/seo/sitemap-data";
import { buildSitemapIndexXml, SITEMAP_CONTENT_TYPE, type SitemapIndexEntry } from "@/lib/seo/xml-sitemap";

/**
 * Sitemap index at /sitemap.xml — kept as the single URL submitted to
 * Search Console and referenced by robots.txt (src/app/robots.ts), now
 * pointing at the six grouped child sitemaps below instead of listing
 * every URL directly. Touches the WordPress feed (to compute an honest
 * `lastmod` for insight-sitemap.xml), so this matches the original
 * src/app/sitemap.ts's revalidation window.
 */
export const revalidate = 300;

export async function GET(): Promise<Response> {
  const groups = await getSitemapGroups();

  const entries: SitemapIndexEntry[] = [
    { loc: absoluteUrl("/page-sitemap.xml"), lastModified: latestLastModified(groups.page) },
    { loc: absoluteUrl("/service-sitemap.xml"), lastModified: latestLastModified(groups.service) },
    { loc: absoluteUrl("/sector-sitemap.xml"), lastModified: latestLastModified(groups.sector) },
    { loc: absoluteUrl("/location-sitemap.xml"), lastModified: latestLastModified(groups.location) },
    { loc: absoluteUrl("/talent-acquisition-sitemap.xml"), lastModified: latestLastModified(groups.talentAcquisition) },
    { loc: absoluteUrl("/insight-sitemap.xml"), lastModified: latestLastModified(groups.insight) },
  ];

  const xml = buildSitemapIndexXml(entries, "/sitemap.xsl");
  return new Response(xml, { headers: { "Content-Type": SITEMAP_CONTENT_TYPE } });
}

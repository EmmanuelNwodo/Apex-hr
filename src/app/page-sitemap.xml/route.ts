import { getLocalSitemapGroups } from "@/lib/seo/sitemap-data";
import { buildUrlsetXml, SITEMAP_CONTENT_TYPE } from "@/lib/seo/xml-sitemap";

/**
 * Homepage and standalone pages (About, Contact, Services index, Sector
 * index, Locations index, For Employers, For Candidates, Insights index).
 * Derived entirely from src/content/manifest.ts — no WordPress fetch is
 * made here, so this sitemap is fully static.
 */
export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const groups = getLocalSitemapGroups();
  const xml = buildUrlsetXml(groups.page, "/sitemap.xsl");
  return new Response(xml, { headers: { "Content-Type": SITEMAP_CONTENT_TYPE } });
}

import { getLocalSitemapGroups } from "@/lib/seo/sitemap-data";
import { buildUrlsetXml, SITEMAP_CONTENT_TYPE } from "@/lib/seo/xml-sitemap";

/**
 * All 58 service/category pages, all 48 service-location pages and both
 * category-location pages — see docs/URL-DECISION-REGISTER.md D-017.
 */
export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const groups = getLocalSitemapGroups();
  const xml = buildUrlsetXml(groups.service, "/sitemap.xsl");
  return new Response(xml, { headers: { "Content-Type": SITEMAP_CONTENT_TYPE } });
}

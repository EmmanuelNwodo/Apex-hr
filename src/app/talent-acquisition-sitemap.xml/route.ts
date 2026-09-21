import { getLocalSitemapGroups } from "@/lib/seo/sitemap-data";
import { buildUrlsetXml, SITEMAP_CONTENT_TYPE } from "@/lib/seo/xml-sitemap";

/** All individual talent-acquisition-by-role pages. */
export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const groups = getLocalSitemapGroups();
  const xml = buildUrlsetXml(groups.talentAcquisition, "/sitemap.xsl");
  return new Response(xml, { headers: { "Content-Type": SITEMAP_CONTENT_TYPE } });
}

import { getVacancySitemapEntries } from "@/lib/seo/sitemap-data";
import { buildUrlsetXml, SITEMAP_CONTENT_TYPE } from "@/lib/seo/xml-sitemap";

export const revalidate = 300;

export async function GET(): Promise<Response> {
  const entries = await getVacancySitemapEntries();
  const xml = buildUrlsetXml(entries, "/sitemap.xsl");
  return new Response(xml, { headers: { "Content-Type": SITEMAP_CONTENT_TYPE } });
}

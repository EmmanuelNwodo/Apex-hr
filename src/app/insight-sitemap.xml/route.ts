import { getInsightSitemapEntries } from "@/lib/seo/sitemap-data";
import { buildUrlsetXml, SITEMAP_CONTENT_TYPE } from "@/lib/seo/xml-sitemap";

/**
 * All indexable insight category pages and every live WordPress article
 * currently included in the sitemap. Touches the WordPress feed, so this
 * matches the original src/app/sitemap.ts's revalidation window (see
 * src/lib/wordpress/client.ts) instead of being force-static.
 */
export const revalidate = 300;

export async function GET(): Promise<Response> {
  const entries = await getInsightSitemapEntries();
  const xml = buildUrlsetXml(entries, "/sitemap.xsl");
  return new Response(xml, { headers: { "Content-Type": SITEMAP_CONTENT_TYPE } });
}

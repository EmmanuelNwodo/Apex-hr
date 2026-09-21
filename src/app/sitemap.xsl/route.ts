import { sitemapStylesheet } from "@/lib/seo/sitemap-stylesheet";
import { XSL_CONTENT_TYPE } from "@/lib/seo/xml-sitemap";

/** Fully static — the stylesheet text never depends on request-time data. */
export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  return new Response(sitemapStylesheet, {
    headers: {
      "Content-Type": XSL_CONTENT_TYPE,
    },
  });
}

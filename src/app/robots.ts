import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * SEO audit Batch 2 item 4. Current official OpenAI crawler guidance
 * (developers.openai.com/api/docs/bots, checked 10 September 2026):
 *
 * - OAI-SearchBot: surfaces pages in ChatGPT's search features — the bot
 *   that actually drives ChatGPT Search citations. Explicitly allowed
 *   below rather than left to the implicit wildcard default, per this
 *   batch's instruction to make that decision deliberate and documented.
 * - GPTBot: crawls content that may be used to train OpenAI's models —
 *   a separate, later decision from ChatGPT Search visibility. Left
 *   under the general "*" allow rule, i.e. unchanged from the site's
 *   prior implicit-allow behaviour — per this batch's explicit
 *   instruction not to change the training preference without separate
 *   approval.
 * - ChatGPT-User: fetches a page only when a user's own ChatGPT session
 *   triggers it (not an automatic crawler), and OpenAI's own guidance
 *   notes robots.txt rules may not even apply to it. No dedicated rule is
 *   written for it here — per this batch's explicit instruction not to
 *   treat it as the automatic search-indexing crawler, i.e. don't manage
 *   it as if it were one. It falls under the general "*" rule like any
 *   other unlisted agent.
 *
 * `/api/` is disallowed for all agents: it currently holds only the
 * generated Open Graph image endpoint (src/app/api/og/route.tsx), not
 * page content — nothing there should be crawled or indexed as a page.
 * No admin, preview or internal-search routes exist in this codebase to
 * disallow.
 *
 * SEO audit Batch 2 corrective pass, item 1: the blanket `Disallow: /api/`
 * above also shadowed `/api/og/` — the generated Open Graph image that
 * every page's `og:image`/`twitter:image` meta tag points to (see
 * buildMetadata() in src/lib/seo/metadata.ts). Social/chat crawlers that
 * respect robots.txt need to fetch that image URL directly, so each rule
 * group below adds an explicit `Allow: /api/og/` alongside the broader
 * `Disallow: /api/`. Per the standard (Google-documented) robots.txt
 * conflict rule, the most specific matching path wins regardless of
 * ordering, so the longer, more specific `/api/og/` allow rule overrides
 * the shorter `/api/` disallow for that one path, while every other
 * `/api/` route stays disallowed. The route itself
 * (src/app/api/og/route.tsx) takes no request input — no params, no
 * query string is read — so there is no user-controlled or
 * query-generated content it could ever expose.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/og/"],
        disallow: ["/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: ["/", "/api/og/"],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.productionUrl}/sitemap.xml`,
  };
}

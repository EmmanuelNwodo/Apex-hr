import type { MetadataRoute } from "next";
import { contentManifest } from "@/content/manifest";
import { absoluteUrl } from "@/config/site";
import { isReservedSlug } from "@/config/reserved-slugs";
import { getAllPublishedPostsForSitemap } from "@/lib/wordpress";

/**
 * Generated from two sources: the content manifest (src/content/manifest.ts,
 * itself derived from the same records that render every local page) and,
 * since the WordPress/Insights integration (docs/URL-DECISION-REGISTER.md),
 * every currently-published WordPress article. Only `indexable: true`
 * manifest entries are included — Provisional/Future routes and draft-only
 * content stay out of the production sitemap regardless of route status,
 * per docs/MASTER-SITEMAP.md and this phase's rules.
 *
 * `lastModified` is omitted for manifest entries: no local content record
 * tracks a real modification date, and stamping every URL with the current
 * build time on every generation is misleading (SEO audit final
 * consolidated phase, Part 9) — it would tell crawlers every page changed
 * on every deploy, regardless of whether it actually did. WordPress
 * articles are different: `modified` is a genuine, WordPress-tracked date,
 * so it is used as `lastModified` for those entries specifically.
 *
 * Article URLs are root-level (`/{slug}/`, never `/insights/{slug}/` and
 * never the `blog.apexhrllc.co.uk` WordPress frontend URL — see
 * src/app/[slug]/page.tsx) and are defensively filtered against the same
 * reserved-slug guard the article route itself uses, so a post can never
 * appear in the sitemap under a URL that actually belongs to an existing
 * Apex HR page. `getAllPublishedPostsForSitemap` never throws — an
 * unreachable or misconfigured WordPress simply contributes zero article
 * entries, leaving every existing manifest-driven entry unaffected.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const manifestEntries: MetadataRoute.Sitemap = contentManifest
    .filter((entry) => entry.indexable)
    .map((entry) => ({
      url: absoluteUrl(entry.canonicalPath),
    }));

  const posts = await getAllPublishedPostsForSitemap();
  const articleEntries: MetadataRoute.Sitemap = posts
    .filter((post) => !isReservedSlug(post.slug))
    .map((post) => {
      const modified = new Date(post.modifiedAt);
      return {
        url: absoluteUrl(`/${post.slug}/`),
        ...(Number.isNaN(modified.getTime()) ? {} : { lastModified: modified }),
      };
    });

  return [...manifestEntries, ...articleEntries];
}

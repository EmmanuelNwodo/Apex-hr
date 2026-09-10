import type { MetadataRoute } from "next";
import { contentManifest } from "@/content/manifest";
import { absoluteUrl } from "@/config/site";

/**
 * Generated from the content manifest (src/content/manifest.ts), which is
 * itself derived from the same records that render every page. Only
 * `indexable: true` entries are included — Provisional/Future routes and
 * draft-only content stay out of the production sitemap regardless of
 * route status, per docs/MASTER-SITEMAP.md and this phase's rules.
 *
 * `lastModified` is deliberately omitted: no content record tracks a real
 * modification date, and stamping every URL with the current build time on
 * every generation is misleading (SEO audit final consolidated phase, Part
 * 9) — it would tell crawlers every page changed on every deploy,
 * regardless of whether it actually did. Add a genuine per-record date
 * field and pass it through here if one is ever introduced; until then,
 * omitting the field is more honest than inventing one.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return contentManifest
    .filter((entry) => entry.indexable)
    .map((entry) => ({
      url: absoluteUrl(entry.canonicalPath),
    }));
}

import type { MetadataRoute } from "next";
import { contentManifest } from "@/content/manifest";
import { absoluteUrl } from "@/config/site";

/**
 * Generated from the content manifest (src/content/manifest.ts), which is
 * itself derived from the same records that render every page. Only
 * `indexable: true` entries are included — Provisional/Future routes and
 * draft-only content stay out of the production sitemap regardless of
 * route status, per docs/MASTER-SITEMAP.md and this phase's rules.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return contentManifest
    .filter((entry) => entry.indexable)
    .map((entry) => ({
      url: absoluteUrl(entry.canonicalPath),
      lastModified: new Date(),
    }));
}

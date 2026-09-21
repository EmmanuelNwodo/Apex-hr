import type { SitemapUrlEntry } from "@/lib/seo/sitemap-data";

/**
 * Raw XML string builders for the sitemap index and every child sitemap.
 * Used instead of the `sitemap.ts` metadata file convention because that
 * convention has no way to attach an `<?xml-stylesheet?>` processing
 * instruction or to serve several separately-named files
 * (page-sitemap.xml, service-sitemap.xml, ...) — see the route handlers
 * under src/app/*-sitemap.xml/route.ts and src/app/sitemap.xml/route.ts.
 *
 * Namespaces follow https://www.sitemaps.org/protocol.html exactly;
 * `xmlns:image` is only declared on a document that actually contains an
 * `<image:image>` element, so a plain child sitemap stays a minimal,
 * standard `<urlset>`.
 */

export const SITEMAP_CONTENT_TYPE = "application/xml; charset=UTF-8";
export const XSL_CONTENT_TYPE = "text/xsl; charset=UTF-8";

const SITEMAP_XMLNS = "http://www.sitemaps.org/schemas/sitemap/0.9";
const IMAGE_XMLNS = "http://www.google.com/schemas/sitemap-image/1.1";

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function xmlStylesheetInstruction(stylesheetHref: string): string {
  return `<?xml-stylesheet type="text/xsl" href="${escapeXml(stylesheetHref)}"?>`;
}

export function buildUrlsetXml(entries: SitemapUrlEntry[], stylesheetHref: string): string {
  const hasImages = entries.some((entry) => entry.images && entry.images.length > 0);

  const urlBlocks = entries.map((entry) => {
    const lines = [`  <url>`, `    <loc>${escapeXml(entry.loc)}</loc>`];
    for (const image of entry.images ?? []) {
      lines.push(`    <image:image>`);
      lines.push(`      <image:loc>${escapeXml(image.loc)}</image:loc>`);
      if (image.title) lines.push(`      <image:title>${escapeXml(image.title)}</image:title>`);
      lines.push(`    </image:image>`);
    }
    if (entry.lastModified) lines.push(`    <lastmod>${entry.lastModified.toISOString()}</lastmod>`);
    lines.push(`  </url>`);
    return lines.join("\n");
  });

  const namespaces = hasImages ? `xmlns="${SITEMAP_XMLNS}" xmlns:image="${IMAGE_XMLNS}"` : `xmlns="${SITEMAP_XMLNS}"`;

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    xmlStylesheetInstruction(stylesheetHref),
    `<urlset ${namespaces}>`,
    ...urlBlocks,
    `</urlset>`,
    "",
  ].join("\n");
}

export interface SitemapIndexEntry {
  loc: string;
  lastModified?: Date;
}

export function buildSitemapIndexXml(entries: SitemapIndexEntry[], stylesheetHref: string): string {
  const sitemapBlocks = entries.map((entry) => {
    const lines = [`  <sitemap>`, `    <loc>${escapeXml(entry.loc)}</loc>`];
    if (entry.lastModified) lines.push(`    <lastmod>${entry.lastModified.toISOString()}</lastmod>`);
    lines.push(`  </sitemap>`);
    return lines.join("\n");
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    xmlStylesheetInstruction(stylesheetHref),
    `<sitemapindex xmlns="${SITEMAP_XMLNS}">`,
    ...sitemapBlocks,
    `</sitemapindex>`,
    "",
  ].join("\n");
}

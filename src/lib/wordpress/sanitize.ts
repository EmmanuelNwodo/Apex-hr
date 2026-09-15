import sanitizeHtml from "sanitize-html";
import { wordpressConfig } from "./config";

/**
 * Elements/attributes allowed in sanitised article body HTML — ordinary
 * Gutenberg editorial content only. Scripts, inline event handlers, iframes
 * and unsafe embeds are excluded by omission (sanitize-html defaults to
 * stripping anything not explicitly allowed).
 */
const ALLOWED_TAGS = [
  "p",
  "br",
  "hr",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "mark",
  "sub",
  "sup",
  "blockquote",
  "cite",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "figure",
  "figcaption",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "pre",
  "code",
  "span",
  "div",
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "title", "rel", "target"],
  img: ["src", "alt", "width", "height", "loading", "srcset", "sizes"],
  "*": ["class"],
  th: ["scope", "colspan", "rowspan"],
  td: ["colspan", "rowspan"],
};

const ALLOWED_SCHEMES = ["http", "https", "mailto", "tel"];

/**
 * Rewrites a public-facing WordPress frontend article link
 * (`{WORDPRESS_SITE_URL}/{slug}/`) to the equivalent public Next.js route
 * (`{NEXT_PUBLIC_SITE_URL}/{slug}/`). Deliberately leaves `/wp-content/`,
 * `/wp-admin/` and `/wp-json/` URLs untouched — those still resolve on the
 * WordPress origin (media files, the editorial backend and the API itself),
 * they are never public article pages.
 */
export function rewriteWordPressLink(href: string, publicSiteUrl: string): string {
  const wpOrigin = wordpressConfig.siteUrl;
  if (!wpOrigin || !href.startsWith(wpOrigin)) return href;

  const path = href.slice(wpOrigin.length);
  if (/^\/(wp-content|wp-admin|wp-json)(\/|$)/.test(path)) return href;

  // Only rewrite what looks like a plain top-level article permalink
  // (`/{slug}/`), never a path with additional segments (category
  // archives, feeds, author pages, etc.), which have no equivalent route.
  const slugMatch = path.match(/^\/([a-z0-9-]+)\/?$/);
  if (!slugMatch) return href;

  return `${publicSiteUrl.replace(/\/+$/, "")}/${slugMatch[1]}/`;
}

function rewriteLinksInHtml(html: string, publicSiteUrl: string): string {
  if (!wordpressConfig.siteUrl) return html;
  const escapedOrigin = wordpressConfig.siteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const hrefPattern = new RegExp(`href="(${escapedOrigin}[^"]*)"`, "g");
  return html.replace(hrefPattern, (full, href: string) => `href="${rewriteWordPressLink(href, publicSiteUrl)}"`);
}

/**
 * Sanitises raw WordPress `content.rendered` HTML for safe display: allows
 * ordinary editorial elements (paragraphs, headings, lists, links,
 * blockquotes, images, figures/captions, tables, code blocks), strips
 * scripts/event handlers/unsafe protocols/embeds, preserves Gutenberg
 * classes used for article styling, and rewrites public article links from
 * the WordPress origin to the public Next.js origin.
 */
export function sanitizeArticleHtml(rawHtml: string, publicSiteUrl: string): string {
  if (!rawHtml) return "";
  const rewritten = rewriteLinksInHtml(rawHtml, publicSiteUrl);
  return sanitizeHtml(rewritten, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ALLOWED_SCHEMES,
    allowedSchemesByTag: { img: ["http", "https", "data"] },
    // Keep every class WordPress/Gutenberg emits (e.g. wp-block-*,
    // has-*-color, alignwide) so the block's intended presentation
    // survives — styling is scoped in globals.css's .wp-content block.
    allowedClasses: { "*": ["*"] },
    // Strip <script>/<style>/<iframe> and everything else not allowlisted
    // entirely (tag and contents), rather than unwrapping to plain text.
    nonTextTags: ["script", "style", "iframe", "object", "embed", "noscript"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
    },
  }).trim();
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
};

/** Decodes standard HTML entities (named and numeric) with no DOM dependency. */
export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (full, name: string) => NAMED_ENTITIES[name] ?? full);
}

/**
 * Strips all HTML tags and decodes entities — for metadata (title,
 * description) and plain-text excerpts, which must never contain markup.
 */
export function stripHtmlToPlainText(html: string): string {
  if (!html) return "";
  const withoutTags = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
  return decodeHtmlEntities(withoutTags).replace(/\s+/g, " ").trim();
}

/**
 * Finds the first `<img>` in already-sanitised article HTML, for the
 * "first safe image in the article content" step of the featured-image
 * fallback chain (src/lib/wordpress/client.ts's `resolveFeaturedImage`).
 * Only ever called on HTML that has already been through
 * `sanitizeArticleHtml` — never on raw WordPress content — so the `src` it
 * returns has already had unsafe protocols and hosts excluded.
 */
export function extractFirstImageFromHtml(sanitizedHtml: string): { url: string; alt: string } | null {
  if (!sanitizedHtml) return null;
  const imgMatch = sanitizedHtml.match(/<img\b[^>]*>/i);
  if (!imgMatch) return null;

  const tag = imgMatch[0];
  const srcMatch = tag.match(/\bsrc="([^"]*)"/i);
  if (!srcMatch || !srcMatch[1]) return null;

  const altMatch = tag.match(/\balt="([^"]*)"/i);
  return {
    url: decodeHtmlEntities(srcMatch[1]),
    alt: altMatch ? decodeHtmlEntities(altMatch[1]) : "",
  };
}

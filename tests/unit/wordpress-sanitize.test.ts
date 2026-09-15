import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

const PUBLIC_SITE_URL = "https://www.apexhrllc.co.uk";

/**
 * `sanitize.ts`'s link-rewriting reads `WORDPRESS_SITE_URL` from
 * `src/lib/wordpress/config.ts`, which is computed once at module load —
 * so the env var must be stubbed before this module is first imported,
 * hence the dynamic import in beforeAll rather than a static top-level one.
 */
let sanitizeArticleHtml: typeof import("@/lib/wordpress/sanitize").sanitizeArticleHtml;
let rewriteWordPressLink: typeof import("@/lib/wordpress/sanitize").rewriteWordPressLink;
let stripHtmlToPlainText: typeof import("@/lib/wordpress/sanitize").stripHtmlToPlainText;
let decodeHtmlEntities: typeof import("@/lib/wordpress/sanitize").decodeHtmlEntities;
let extractFirstImageFromHtml: typeof import("@/lib/wordpress/sanitize").extractFirstImageFromHtml;

beforeAll(async () => {
  vi.stubEnv("WORDPRESS_SITE_URL", "https://blog.apexhrllc.co.uk");
  const mod = await import("@/lib/wordpress/sanitize");
  sanitizeArticleHtml = mod.sanitizeArticleHtml;
  rewriteWordPressLink = mod.rewriteWordPressLink;
  stripHtmlToPlainText = mod.stripHtmlToPlainText;
  decodeHtmlEntities = mod.decodeHtmlEntities;
  extractFirstImageFromHtml = mod.extractFirstImageFromHtml;
});

afterAll(() => {
  vi.unstubAllEnvs();
});

describe("sanitizeArticleHtml", () => {
  it("strips scripts entirely, including their contents", () => {
    const html = sanitizeArticleHtml('<p>Safe</p><script>alert("xss")</script>', PUBLIC_SITE_URL);
    expect(html).not.toContain("<script");
    expect(html).not.toContain("alert");
    expect(html).toContain("<p>Safe</p>");
  });

  it("strips inline event handler attributes", () => {
    const html = sanitizeArticleHtml('<p onclick="alert(1)">Click</p>', PUBLIC_SITE_URL);
    expect(html).not.toContain("onclick");
  });

  it("strips a javascript: protocol link", () => {
    const html = sanitizeArticleHtml('<a href="javascript:alert(1)">Link</a>', PUBLIC_SITE_URL);
    expect(html).not.toContain("javascript:");
  });

  it("strips unsafe embeds (iframe/object/embed)", () => {
    const html = sanitizeArticleHtml('<p>Before</p><iframe src="https://evil.example"></iframe><p>After</p>', PUBLIC_SITE_URL);
    expect(html).not.toContain("<iframe");
    expect(html).toContain("Before");
    expect(html).toContain("After");
  });

  it("allows ordinary editorial elements", () => {
    const html = sanitizeArticleHtml(
      '<h2>Heading</h2><p>Para with <a href="https://example.com">a link</a>.</p>' +
        "<ul><li>Item</li></ul><blockquote>Quote</blockquote>" +
        '<figure><img src="https://blog.apexhrllc.co.uk/wp-content/uploads/x.jpg" alt="Alt text"/><figcaption>Caption</figcaption></figure>' +
        "<table><thead><tr><th>A</th></tr></thead><tbody><tr><td>B</td></tr></tbody></table>" +
        "<pre><code>const x = 1;</code></pre>",
      PUBLIC_SITE_URL,
    );
    expect(html).toContain("<h2>Heading</h2>");
    expect(html).toContain("<blockquote>Quote</blockquote>");
    expect(html).toContain("<figcaption>Caption</figcaption>");
    expect(html).toContain("<table>");
    expect(html).toContain("<pre><code>const x = 1;</code></pre>");
    expect(html).toContain('alt="Alt text"');
  });

  it("preserves Gutenberg block classes used for article styling", () => {
    const html = sanitizeArticleHtml('<p class="has-text-align-center wp-block-paragraph">Centred</p>', PUBLIC_SITE_URL);
    expect(html).toContain('class="has-text-align-center wp-block-paragraph"');
  });

  it("rewrites a public WordPress article link to the public Next.js route", () => {
    const html = sanitizeArticleHtml(
      '<a href="https://blog.apexhrllc.co.uk/how-to-build-a-great-hr-team/">read more</a>',
      PUBLIC_SITE_URL,
    );
    expect(html).toContain('href="https://www.apexhrllc.co.uk/how-to-build-a-great-hr-team/"');
    expect(html).not.toContain("blog.apexhrllc.co.uk");
  });

  it("does not rewrite /wp-content/uploads/ media links", () => {
    const html = sanitizeArticleHtml(
      '<a href="https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/report.pdf">Download</a>',
      PUBLIC_SITE_URL,
    );
    expect(html).toContain("https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/report.pdf");
  });

  it("does not rewrite /wp-admin/ or /wp-json/ links", () => {
    const html = sanitizeArticleHtml(
      '<p><a href="https://blog.apexhrllc.co.uk/wp-admin/">Admin</a> <a href="https://blog.apexhrllc.co.uk/wp-json/wp/v2/posts">API</a></p>',
      PUBLIC_SITE_URL,
    );
    expect(html).toContain("https://blog.apexhrllc.co.uk/wp-admin/");
    expect(html).toContain("https://blog.apexhrllc.co.uk/wp-json/wp/v2/posts");
  });

  it("returns an empty string for empty input without throwing", () => {
    expect(sanitizeArticleHtml("", PUBLIC_SITE_URL)).toBe("");
  });
});

describe("rewriteWordPressLink", () => {
  it("rewrites a bare article permalink", () => {
    expect(rewriteWordPressLink("https://blog.apexhrllc.co.uk/great-hiring-advice/", PUBLIC_SITE_URL)).toBe(
      "https://www.apexhrllc.co.uk/great-hiring-advice/",
    );
  });

  it("leaves an unrelated host untouched", () => {
    const href = "https://example.com/great-hiring-advice/";
    expect(rewriteWordPressLink(href, PUBLIC_SITE_URL)).toBe(href);
  });
});

describe("stripHtmlToPlainText", () => {
  it("strips tags and decodes common HTML entities", () => {
    expect(stripHtmlToPlainText("<p>Apex HR&#8217;s guide &amp; checklist</p>")).toBe("Apex HR’s guide & checklist");
  });

  it("collapses whitespace left behind by stripped tags", () => {
    expect(stripHtmlToPlainText("<p>Line one</p>\n<p>Line two</p>")).toBe("Line one Line two");
  });

  it("returns an empty string for empty input", () => {
    expect(stripHtmlToPlainText("")).toBe("");
  });
});

describe("decodeHtmlEntities", () => {
  it("decodes named entities", () => {
    expect(decodeHtmlEntities("Tom &amp; Jerry &mdash; a classic")).toBe("Tom & Jerry — a classic");
  });

  it("decodes numeric and hex entities", () => {
    expect(decodeHtmlEntities("&#8217;&#x2019;")).toBe("’’");
  });

  it("leaves unrecognised entities untouched", () => {
    expect(decodeHtmlEntities("&unknownentity;")).toBe("&unknownentity;");
  });
});

describe("extractFirstImageFromHtml", () => {
  it("finds the first <img> and its alt text in sanitised article HTML", () => {
    const html = '<p>Intro.</p><figure><img src="https://blog.apexhrllc.co.uk/wp-content/uploads/a.jpg" alt="First image"/></figure><img src="https://blog.apexhrllc.co.uk/wp-content/uploads/b.jpg" alt="Second image"/>';
    expect(extractFirstImageFromHtml(html)).toEqual({
      url: "https://blog.apexhrllc.co.uk/wp-content/uploads/a.jpg",
      alt: "First image",
    });
  });

  it("returns an empty alt string when the image has no alt attribute", () => {
    const html = '<img src="https://blog.apexhrllc.co.uk/wp-content/uploads/bare.jpg"/>';
    expect(extractFirstImageFromHtml(html)).toEqual({
      url: "https://blog.apexhrllc.co.uk/wp-content/uploads/bare.jpg",
      alt: "",
    });
  });

  it("decodes HTML entities inside the src/alt attributes", () => {
    const html = '<img src="https://blog.apexhrllc.co.uk/wp-content/uploads/q.jpg?a=1&amp;b=2" alt="Tom &amp; Jerry"/>';
    expect(extractFirstImageFromHtml(html)).toEqual({
      url: "https://blog.apexhrllc.co.uk/wp-content/uploads/q.jpg?a=1&b=2",
      alt: "Tom & Jerry",
    });
  });

  it("returns null when there is no image in the content", () => {
    expect(extractFirstImageFromHtml("<p>No images here.</p>")).toBeNull();
  });

  it("returns null for empty input", () => {
    expect(extractFirstImageFromHtml("")).toBeNull();
  });

  it("returns null for an <img> with no src attribute", () => {
    expect(extractFirstImageFromHtml('<img alt="Missing src"/>')).toBeNull();
  });
});

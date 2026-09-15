/**
 * WordPress connection configuration. Reads from environment variables and
 * never throws at import time — pages must be able to render (with an empty
 * state) before the CMS has any published content. Code that queries
 * WordPress should check `isWordPressConfigured` first and degrade
 * gracefully when it is false, rather than throwing.
 *
 * WordPress is the source of truth for Insights/blog editorial content only
 * (see docs/URL-DECISION-REGISTER.md and docs/CONTENT-MODEL.md section 13).
 * It does not replace Sanity for any other content type, and does not
 * replace Supabase for operational data.
 */
export const wordpressConfig = {
  /** REST API base, e.g. https://blog.apexhrllc.co.uk/wp-json/wp/v2 */
  apiUrl: (process.env.WORDPRESS_API_URL ?? "").replace(/\/+$/, ""),
  /** WordPress origin (CMS/API host only — never used as a public canonical). */
  siteUrl: (process.env.WORDPRESS_SITE_URL ?? "").replace(/\/+$/, ""),
};

export const isWordPressConfigured = Boolean(wordpressConfig.apiUrl);

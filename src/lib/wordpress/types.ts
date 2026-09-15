/**
 * Raw WordPress REST API v2 response shapes (`/wp-json/wp/v2/posts`,
 * `?_embed`) and the normalised internal Apex HR article model UI
 * components should depend on instead. Nothing outside src/lib/wordpress/
 * should import the `WpRest*` raw types — see normalize.ts.
 */

export type WpPostStatus = "publish" | "draft" | "pending" | "private" | "future" | "trash";

export interface WpRenderedField {
  rendered: string;
  protected?: boolean;
}

export interface WpEmbeddedAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_urls?: Record<string, string>;
}

export interface WpMediaSize {
  source_url: string;
  width: number;
  height: number;
}

export interface WpEmbeddedFeaturedMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<string, WpMediaSize>;
  };
}

export interface WpEmbeddedTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: "category" | "post_tag" | string;
}

/**
 * Yoast SEO's `yoast_head_json` field, when the Yoast plugin is active.
 * Only the fields this integration actually reads are typed; the raw
 * response may contain more.
 */
export interface WpYoastHeadJson {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: { index?: string; follow?: string };
  og_title?: string;
  og_description?: string;
  og_image?: Array<{ url: string; width?: number; height?: number }>;
  twitter_title?: string;
  twitter_description?: string;
  article_published_time?: string;
  article_modified_time?: string;
}

/** Raw shape of one entry from `/wp-json/wp/v2/posts?_embed`. */
export interface WpRestPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: WpPostStatus;
  link: string;
  title: WpRenderedField;
  content: WpRenderedField;
  excerpt: WpRenderedField;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  yoast_head_json?: WpYoastHeadJson;
  _embedded?: {
    author?: WpEmbeddedAuthor[];
    "wp:featuredmedia"?: WpEmbeddedFeaturedMedia[];
    "wp:term"?: WpEmbeddedTerm[][];
  };
}

export interface WpRestCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description?: string;
}

// --- Normalised internal model -------------------------------------------

export interface ArticleImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ArticleTerm {
  id: number;
  name: string;
  slug: string;
}

export interface ArticleAuthor {
  name: string;
  avatarUrl?: string;
}

export interface ArticleSeo {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Internal Apex HR article model. UI components and page templates depend
 * only on this shape — never on `WpRestPost`'s nested, WordPress-specific
 * structure. `contentHtml` has already been sanitised and had internal
 * WordPress frontend links rewritten (see sanitize.ts) by the time an
 * article reaches this shape.
 */
export interface Article {
  id: number;
  slug: string;
  status: WpPostStatus;
  publishedAt: string;
  modifiedAt: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  featuredImage: ArticleImage | null;
  categories: ArticleTerm[];
  tags: ArticleTerm[];
  author: ArticleAuthor | null;
  seo: ArticleSeo;
}

export interface GetPostsOptions {
  page?: number;
  perPage?: number;
  categorySlug?: string;
  search?: string;
}

export interface GetPostsResult {
  posts: Article[];
  total: number;
  totalPages: number;
  page: number;
  /**
   * True when the request to WordPress itself failed (unconfigured,
   * unreachable, non-2xx, malformed response) — distinct from a genuinely
   * empty `posts` array, so callers can show "WordPress is temporarily
   * unavailable" rather than "no articles have been published yet" for
   * the right situation.
   */
  unavailable: boolean;
}

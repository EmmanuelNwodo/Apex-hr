import { siteConfig } from "@/config/site";
import { isWordPressConfigured, wordpressConfig } from "./config";
import { extractFirstImageFromHtml, sanitizeArticleHtml, stripHtmlToPlainText } from "./sanitize";
import type {
  Article,
  ArticleImage,
  ArticleTerm,
  GetPostsOptions,
  GetPostsResult,
  WpEmbeddedTerm,
  WpRestCategory,
  WpRestPost,
} from "./types";

/**
 * Server-only data layer — every function here uses `fetch` from a
 * server component or route handler. Never import this module from a
 * "use client" component; fetch data in a server component and pass the
 * normalised `Article`/`Article[]` down as props instead.
 */

/** ~5-minute revalidation window, per this integration's data-freshness requirement. */
const REVALIDATE_SECONDS = 300;

/**
 * Low-level fetch wrapper for the WordPress REST API. Never throws to the
 * caller and never leaks a raw upstream error message to a visitor — every
 * failure (network error, non-2xx response, malformed JSON, unconfigured
 * CMS) is logged server-side and surfaces as `null`, which every public
 * function in this module turns into an honest empty state.
 */
async function wpFetch<T>(path: string): Promise<{ data: T; headers: Headers } | null> {
  if (!isWordPressConfigured) return null;

  const url = `${wordpressConfig.apiUrl}${path}`;
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error(`[wordpress] ${response.status} ${response.statusText} fetching ${path}`);
      return null;
    }

    const data = (await response.json()) as T;
    return { data, headers: response.headers };
  } catch (error) {
    console.error("[wordpress] request failed", error);
    return null;
  }
}

function normaliseTerms(terms: WpEmbeddedTerm[] | undefined, taxonomy: "category" | "post_tag"): ArticleTerm[] {
  if (!terms) return [];
  return terms
    .filter((term) => term.taxonomy === taxonomy)
    .map((term) => ({ id: term.id, name: term.name, slug: term.slug }));
}

/**
 * Resolves one article's featured image through a fixed priority chain, so
 * every consumer (article hero, Insights archive cards, homepage feed,
 * related-article cards) sees the same image for the same post rather than
 * each re-implementing its own fallback:
 *
 *  1. WordPress featured media (`_embedded["wp:featuredmedia"]`) — the
 *     post's own deliberately-chosen image, own alt text preferred.
 *  2. Yoast's Open Graph image (`yoast_head_json.og_image`) — sourced from
 *     Yoast's own resolution logic (often the same image, but present even
 *     when a plugin/theme quirk leaves `_embedded` featured media empty).
 *  3. The first `<img>` inside the sanitised article body — a genuine image
 *     the author placed in the post, better than no image at all.
 *  4. `null` — every presentation component falls back to the same local
 *     Apex HR placeholder image at this point (never an external service).
 *
 * Returns `null`, never a broken/empty-src image object, when none of the
 * three real sources yield a usable URL.
 */
function resolveFeaturedImage(
  post: WpRestPost,
  contentHtml: string,
  title: string,
): ArticleImage | null {
  const embeddedMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  if (embeddedMedia?.source_url) {
    return {
      url: embeddedMedia.source_url,
      alt: embeddedMedia.alt_text || title,
      width: embeddedMedia.media_details?.width,
      height: embeddedMedia.media_details?.height,
    };
  }

  const ogImage = post.yoast_head_json?.og_image?.[0];
  if (ogImage?.url) {
    return { url: ogImage.url, alt: title, width: ogImage.width, height: ogImage.height };
  }

  const contentImage = extractFirstImageFromHtml(contentHtml);
  if (contentImage) {
    return { url: contentImage.url, alt: contentImage.alt || title };
  }

  return null;
}

/**
 * Normalises one raw `WpRestPost` (as returned by `?_embed`) into the
 * internal `Article` model. Every embedded relationship (author, featured
 * image, categories, tags) is optional here and degrades to a safe default
 * — a post with no embedded author, no featured image or no terms is
 * common (a draft author account, a post published before a featured image
 * was set) and must render correctly, not throw.
 */
export function normalizePost(post: WpRestPost, publicSiteUrl: string = siteConfig.productionUrl): Article {
  const embeddedAuthor = post._embedded?.author?.[0];
  const embeddedTerms = post._embedded?.["wp:term"]?.flat();
  const yoast = post.yoast_head_json;
  const title = stripHtmlToPlainText(post.title?.rendered ?? "");
  const contentHtml = sanitizeArticleHtml(post.content?.rendered ?? "", publicSiteUrl);

  return {
    id: post.id,
    slug: post.slug,
    status: post.status,
    publishedAt: post.date_gmt ? `${post.date_gmt}Z` : post.date,
    modifiedAt: post.modified_gmt ? `${post.modified_gmt}Z` : post.modified,
    title,
    excerpt: stripHtmlToPlainText(post.excerpt?.rendered ?? ""),
    contentHtml,
    featuredImage: resolveFeaturedImage(post, contentHtml, title),
    categories: normaliseTerms(embeddedTerms, "category"),
    tags: normaliseTerms(embeddedTerms, "post_tag"),
    author: embeddedAuthor
      ? { name: embeddedAuthor.name, avatarUrl: embeddedAuthor.avatar_urls?.["96"] }
      : null,
    seo: {
      title: yoast?.title ? stripHtmlToPlainText(yoast.title) : undefined,
      description: yoast?.description ? stripHtmlToPlainText(yoast.description) : undefined,
      // Yoast's own canonical always points at the WordPress origin — it is
      // never used as the public canonical (see sanitize.ts/metadata.ts);
      // captured here only in case a future consumer needs the raw value.
      canonical: yoast?.canonical,
      ogImage: yoast?.og_image?.[0]?.url,
      publishedTime: yoast?.article_published_time,
      modifiedTime: yoast?.article_modified_time,
    },
  };
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    search.set(key, String(value));
  }
  return search.toString();
}

/**
 * Fetches a page of published posts, newest first, with embedded
 * author/media/terms resolved in one request. Supports pagination,
 * category filtering and search only — the current Insights UI needs
 * nothing more. Returns an honest empty result (never throws, never
 * fabricates posts) when WordPress is unconfigured, unreachable or returns
 * a malformed response.
 */
export async function getPosts(options: GetPostsOptions = {}): Promise<GetPostsResult> {
  const page = options.page ?? 1;
  const perPage = options.perPage ?? 12;

  const query = buildQuery({
    status: "publish",
    _embed: 1,
    orderby: "date",
    order: "desc",
    page,
    per_page: perPage,
    categories: options.categorySlug ? await resolveCategoryId(options.categorySlug) : undefined,
    search: options.search,
  });

  const result = await wpFetch<WpRestPost[]>(`/posts?${query}`);
  if (!result || !Array.isArray(result.data)) {
    return { posts: [], total: 0, totalPages: 0, page, unavailable: true };
  }

  const posts = result.data.filter((post) => post.status === "publish");
  const total = Number(result.headers.get("X-WP-Total") ?? posts.length);
  const totalPages = Number(result.headers.get("X-WP-TotalPages") ?? (posts.length > 0 ? 1 : 0));

  return {
    posts: posts.map((post) => normalizePost(post)),
    total: Number.isFinite(total) ? total : posts.length,
    totalPages: Number.isFinite(totalPages) ? totalPages : posts.length > 0 ? 1 : 0,
    page,
    unavailable: false,
  };
}

/**
 * Fetches one published article by its exact slug, using WordPress's own
 * `?slug=` filter (never by fetching every post and searching client-side).
 * Returns `null` for an unknown slug, a draft/non-published post, or any
 * upstream failure — callers should treat `null` as "call notFound()".
 */
export async function getPostBySlug(slug: string): Promise<Article | null> {
  const query = buildQuery({ slug: encodeURIComponent(slug), status: "publish", _embed: 1 });
  const result = await wpFetch<WpRestPost[]>(`/posts?${query}`);
  if (!result || !Array.isArray(result.data) || result.data.length === 0) return null;

  const post = result.data[0];
  if (post.status !== "publish") return null;

  return normalizePost(post);
}

export async function getCategories(): Promise<ArticleTerm[]> {
  const result = await wpFetch<WpRestCategory[]>("/categories?per_page=100&hide_empty=true");
  if (!result || !Array.isArray(result.data)) return [];
  return result.data.map((category) => ({ id: category.id, name: category.name, slug: category.slug }));
}

async function resolveCategoryId(categorySlug: string): Promise<number | undefined> {
  const result = await wpFetch<WpRestCategory[]>(`/categories?slug=${encodeURIComponent(categorySlug)}`);
  if (!result || !Array.isArray(result.data) || result.data.length === 0) return undefined;
  return result.data[0].id;
}

/** Convenience wrapper over `getPosts` for homepage/sidebar "recent posts" feeds. */
export async function getRecentPosts(limit: number): Promise<Article[]> {
  const { posts } = await getPosts({ perPage: limit });
  return posts;
}

/**
 * Finds articles related to `post` by shared category, excluding `post`
 * itself. Falls back to the most recent other published posts when the
 * source post has no categories, so a "related articles" section never
 * silently disappears for an uncategorised post.
 */
export async function getRelatedPosts(post: Article, limit: number): Promise<Article[]> {
  const categoryIds = post.categories.map((category) => category.id);

  if (categoryIds.length > 0) {
    const query = buildQuery({
      status: "publish",
      _embed: 1,
      orderby: "date",
      order: "desc",
      per_page: limit,
      categories: categoryIds.join(","),
      exclude: post.id,
    });
    const result = await wpFetch<WpRestPost[]>(`/posts?${query}`);
    if (result && Array.isArray(result.data) && result.data.length > 0) {
      return result.data.filter((entry) => entry.status === "publish").map((entry) => normalizePost(entry));
    }
  }

  const fallback = await getPosts({ perPage: limit + 1 });
  return fallback.posts.filter((entry) => entry.id !== post.id).slice(0, limit);
}

/**
 * Fetches every published post across all pages, for sitemap generation
 * only (never for slug lookup — see `getPostBySlug`). Bounded to a
 * generous but finite number of pages so a misbehaving upstream can never
 * cause an unbounded loop.
 */
export async function getAllPublishedPostsForSitemap(): Promise<Article[]> {
  const maxPages = 20;
  const perPage = 100;
  const all: Article[] = [];

  const first = await getPosts({ page: 1, perPage });
  all.push(...first.posts);

  const totalPages = Math.min(first.totalPages, maxPages);
  for (let page = 2; page <= totalPages; page += 1) {
    const next = await getPosts({ page, perPage });
    if (next.posts.length === 0) break;
    all.push(...next.posts);
  }

  return all;
}

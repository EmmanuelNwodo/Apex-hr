import { siteConfig } from "@/config/site";
import { isWordPressConfigured, wordpressConfig } from "./config";
import {
  extractFirstImageFromHtml,
  sanitizeArticleHtml,
  sanitizeVacancyHtml,
  stripHtmlToPlainText,
} from "./sanitize";
import type {
  Article,
  ArticleImage,
  ArticleTerm,
  GetVacanciesResult,
  GetPostsOptions,
  GetPostsResult,
  Vacancy,
  VacancyEmploymentType,
  VacancyQuery,
  VacancyStatus,
  VacancyWorkArrangement,
  WpEmbeddedTerm,
  WpRestCategory,
  WpRestPost,
  WpRestVacancy,
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

function getVacancyStatus(value: string | undefined): VacancyStatus {
  const status = value?.trim().toLowerCase();
  return status === "open" || status === "closed" || status === "filled" ? status : "closed";
}

function splitVacancyLines(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(/\r?\n/)
    .map((line) => stripHtmlToPlainText(line))
    .filter(Boolean);
}

function parseSalary(value: number | null | undefined): number | null {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return null;
  return Number(value);
}

/** Maps the vacancy CPT response into the site-owned, provider-neutral model. */
export function normalizeVacancy(raw: WpRestVacancy): Vacancy {
  const meta = raw.meta ?? {};
  return {
    id: raw.id,
    slug: raw.slug,
    status: getVacancyStatus(meta.apex_hr_vacancy_status),
    title: stripHtmlToPlainText(raw.title?.rendered ?? ""),
    reference: stripHtmlToPlainText(meta.apex_hr_vacancy_reference ?? ""),
    summary: stripHtmlToPlainText(raw.excerpt?.rendered ?? ""),
    descriptionHtml: sanitizeVacancyHtml(raw.content?.rendered ?? ""),
    responsibilities: splitVacancyLines(meta.apex_hr_responsibilities),
    requirements: splitVacancyLines(meta.apex_hr_requirements),
    desirableSkills: splitVacancyLines(meta.apex_hr_desirable_skills),
    benefits: splitVacancyLines(meta.apex_hr_benefits),
    sector: stripHtmlToPlainText(meta.apex_hr_sector ?? ""),
    department: stripHtmlToPlainText(meta.apex_hr_department ?? ""),
    location: stripHtmlToPlainText(meta.apex_hr_location ?? ""),
    employmentType: isEmploymentType(meta.apex_hr_employment_type)
      ? meta.apex_hr_employment_type
      : "",
    workplaceArrangement: isWorkArrangement(meta.apex_hr_workplace_arrangement)
      ? meta.apex_hr_workplace_arrangement
      : "",
    seniority: stripHtmlToPlainText(meta.apex_hr_seniority ?? ""),
    salaryMin: parseSalary(meta.apex_hr_salary_min),
    salaryMax: parseSalary(meta.apex_hr_salary_max),
    salaryCurrency: stripHtmlToPlainText(meta.apex_hr_salary_currency ?? ""),
    salaryDisplay: stripHtmlToPlainText(meta.apex_hr_salary_display ?? ""),
    salaryUnit: stripHtmlToPlainText(meta.apex_hr_salary_unit ?? ""),
    closingDate: meta.apex_hr_closing_date ?? "",
    applicationEmail: stripHtmlToPlainText(meta.apex_hr_application_email ?? ""),
    featured: meta.apex_hr_featured === true,
    seoTitle: stripHtmlToPlainText(meta.apex_hr_seo_title ?? ""),
    metaDescription: stripHtmlToPlainText(meta.apex_hr_meta_description ?? ""),
    publishedAt: raw.date_gmt ? `${raw.date_gmt}Z` : raw.date,
    modifiedAt: raw.modified_gmt ? `${raw.modified_gmt}Z` : raw.modified,
  };
}

function isEmploymentType(value: string | undefined): value is VacancyEmploymentType {
  return [
    "Permanent",
    "Temporary",
    "Contract",
    "Fixed-term",
    "Internship",
    "Part-time",
  ].includes(value ?? "");
}

function isWorkArrangement(value: string | undefined): value is VacancyWorkArrangement {
  return ["On-site", "Hybrid", "Remote"].includes(value ?? "");
}

export function isVacancyExpired(vacancy: Pick<Vacancy, "closingDate">, now = new Date()): boolean {
  if (!vacancy.closingDate) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(vacancy.closingDate)) return true;
  return vacancy.closingDate < now.toISOString().slice(0, 10);
}

export function isVacancyOpen(vacancy: Vacancy, now = new Date()): boolean {
  return vacancy.status === "open" && !isVacancyExpired(vacancy, now);
}

export function filterVacancies(vacancies: Vacancy[], filters: VacancyQuery): Vacancy[] {
  const normalise = (value: string | undefined) => value?.trim().toLocaleLowerCase("en-GB") ?? "";
  const keyword = normalise(filters.keyword);
  const location = normalise(filters.location);
  const sector = normalise(filters.sector);
  const employmentType = normalise(filters.employmentType);
  const workplaceArrangement = normalise(filters.workplaceArrangement);
  const seniority = normalise(filters.seniority);

  return vacancies.filter((vacancy) => {
    const searchable = [
      vacancy.title,
      vacancy.reference,
      vacancy.summary,
      vacancy.department,
      vacancy.sector,
      vacancy.location,
      ...vacancy.requirements,
    ]
      .join(" ")
      .toLocaleLowerCase("en-GB");

    return (
      (!keyword || searchable.includes(keyword)) &&
      (!location || normalise(vacancy.location) === location) &&
      (!sector || normalise(vacancy.sector) === sector) &&
      (!employmentType || normalise(vacancy.employmentType) === employmentType) &&
      (!workplaceArrangement || normalise(vacancy.workplaceArrangement) === workplaceArrangement) &&
      (!seniority || normalise(vacancy.seniority) === seniority)
    );
  });
}

async function fetchPublishedVacancies(params: Record<string, string | number | undefined>) {
  const maxPages = 20;
  const perPage = 100;
  const vacancies: Vacancy[] = [];

  for (let page = 1; page <= maxPages; page += 1) {
    const query = buildQuery({
      status: "publish",
      _embed: 1,
      orderby: "date",
      order: "desc",
      per_page: perPage,
      page,
      ...params,
    });
    const result = await wpFetch<WpRestVacancy[]>(`/vacancies?${query}`);
    if (!result || !Array.isArray(result.data)) {
      return { vacancies: [], unavailable: true };
    }

    vacancies.push(...result.data.filter((item) => item.status === "publish").map(normalizeVacancy));
    const totalPages = Number(result.headers.get("X-WP-TotalPages") ?? 1);
    if (!Number.isFinite(totalPages) || page >= Math.min(totalPages, maxPages) || result.data.length === 0) {
      break;
    }
  }

  return { vacancies, unavailable: false };
}

/** Gets all currently open, published vacancies for server-rendered archive use. */
export async function getOpenVacancies(): Promise<GetVacanciesResult> {
  const result = await fetchPublishedVacancies({});
  return {
    vacancies: result.vacancies.filter((vacancy) => isVacancyOpen(vacancy)),
    unavailable: result.unavailable,
  };
}

/** Gets the current open vacancies marked as featured in WordPress. */
export async function getFeaturedVacancies(limit = 3): Promise<Vacancy[]> {
  const result = await getOpenVacancies();
  return result.vacancies.filter((vacancy) => vacancy.featured).slice(0, limit);
}

/** Looks up a published vacancy by exact slug; closed vacancies remain available for a clear status page. */
export async function getVacancyBySlug(slug: string): Promise<Vacancy | null> {
  const query = buildQuery({ slug: encodeURIComponent(slug), status: "publish", _embed: 1 });
  const result = await wpFetch<WpRestVacancy[]>(`/vacancies?${query}`);
  if (!result || !Array.isArray(result.data)) return null;
  const raw = result.data.find((item) => item.status === "publish" && item.slug === slug);
  return raw ? normalizeVacancy(raw) : null;
}

/** Fetches open vacancies and applies only the finite, approved archive filters. */
export async function getFilteredVacancies(filters: VacancyQuery): Promise<GetVacanciesResult> {
  const result = await getOpenVacancies();
  return { ...result, vacancies: filterVacancies(result.vacancies, filters) };
}

/** Open live vacancy URLs for the vacancy child sitemap only. */
export async function getOpenVacanciesForSitemap(): Promise<Vacancy[]> {
  const result = await getOpenVacancies();
  return result.vacancies;
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

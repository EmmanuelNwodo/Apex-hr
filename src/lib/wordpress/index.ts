/**
 * Public entry point for the WordPress data layer. Import from
 * "@/lib/wordpress" — never reach into client.ts/types.ts/sanitize.ts
 * directly, so this module stays the single place that knows about
 * WordPress's REST response shape (docs/CONTENT-MODEL.md section 18
 * "provider-neutral content repository boundary" applies here too).
 */
export {
  getPosts,
  getPostBySlug,
  getCategories,
  getRecentPosts,
  getRelatedPosts,
  getAllPublishedPostsForSitemap,
  normalizeVacancy,
  isVacancyExpired,
  isVacancyOpen,
  filterVacancies,
  getOpenVacancies,
  getVacancyBySlug,
  getFeaturedVacancies,
  getFilteredVacancies,
  getOpenVacanciesForSitemap,
  normalizePost,
} from "./client";
export { isWordPressConfigured, wordpressConfig } from "./config";
export { toInsightPreview, INSIGHT_IMAGE_PLACEHOLDER } from "./adapters";
export { sanitizeArticleHtml, stripHtmlToPlainText, rewriteWordPressLink, decodeHtmlEntities } from "./sanitize";
export type {
  Article,
  ArticleAuthor,
  ArticleImage,
  ArticleSeo,
  ArticleTerm,
  GetPostsOptions,
  GetPostsResult,
  WpRestPost,
  WpRestCategory,
  Vacancy,
  VacancyEmploymentType,
  VacancyQuery,
  VacancyStatus,
  VacancyWorkArrangement,
  WpRestVacancy,
} from "./types";

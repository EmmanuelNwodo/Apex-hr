import type { InsightPreview } from "@/content/home";
import type { Article } from "./types";

/**
 * The one local Apex HR image every Insights/article image consumer falls
 * back to (never an external placeholder service) when a post has no
 * WordPress featured media, no Yoast OG image and no image in its own
 * content — see `resolveFeaturedImage` in src/lib/wordpress/client.ts for
 * the three real sources tried first. Exported from here, the module
 * responsible for shaping WordPress data for display, so every consumer
 * (InsightCard, ArticlePageTemplate) shares the same default rather than
 * each hard-coding its own path.
 */
export const INSIGHT_IMAGE_PLACEHOLDER = "/images/why-apex-section.png";

function formatDisplayDate(iso: string): string | undefined {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

/**
 * Adapts a normalised WordPress `Article` to the existing `InsightPreview`
 * shape the site's `InsightCard` component already renders (homepage
 * insights feed, insights archive) — so neither component needs to change
 * its own design/markup to display WordPress content. `href` is always the
 * root-level article route (`/{slug}/`), per this integration's URL
 * decision — never `/insights/{slug}/`.
 */
export function toInsightPreview(article: Article): InsightPreview {
  const primaryCategory = article.categories[0];
  return {
    id: String(article.id),
    contentType: "Article",
    title: article.title,
    summary: article.excerpt,
    date: article.publishedAt,
    dateDisplay: formatDisplayDate(article.publishedAt),
    topic: primaryCategory?.name ?? "Insights",
    href: `/${article.slug}/`,
    image: article.featuredImage,
  };
}

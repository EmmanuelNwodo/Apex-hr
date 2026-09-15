import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isReservedSlug } from "@/config/reserved-slugs";
import { getPostBySlug, getRelatedPosts } from "@/lib/wordpress";
import { ArticlePageTemplate } from "@/components/templates/article-page-template";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBlogPostingJsonLd, getBreadcrumbJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Root-level WordPress article route (`/[slug]/`), per this integration's
 * URL decision (docs/URL-DECISION-REGISTER.md): the Insights archive lives
 * at `/insights/`, but individual articles are NOT `/insights/[slug]/` —
 * they sit at the site root, matching WordPress's own flat permalink
 * structure. No `generateStaticParams` here deliberately: WordPress posts
 * are published on the CMS side between deploys, so every request is
 * resolved live (with `fetch`'s own ~5-minute revalidation window inside
 * the data layer — see src/lib/wordpress/client.ts) rather than requiring a
 * rebuild for a new post to appear.
 *
 * `isReservedSlug` runs before any WordPress fetch: every existing Apex HR
 * route already wins this exact path via Next.js's own static-over-dynamic
 * routing, but a post slug matching a reserved segment (a stale or
 * maliciously chosen slug, for instance) must never be fetched or rendered
 * here regardless — see src/config/reserved-slugs.ts.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (isReservedSlug(slug)) {
    return buildMetadata({ title: "Not found", path: `/${slug}/`, index: false });
  }

  const article = await getPostBySlug(slug);
  if (!article) {
    return buildMetadata({ title: "Not found", path: `/${slug}/`, index: false });
  }

  const title = article.seo.title || article.title;
  const description = article.seo.description || article.excerpt || undefined;

  const base = buildMetadata({
    title,
    description,
    path: `/${slug}/`,
    // Deliberately never reads yoast_head_json's own robots/noindex
    // value — a published WordPress post is always indexable from the
    // Next.js side; see this integration's documented decision.
    index: true,
    ogImagePath: article.seo.ogImage ?? article.featuredImage?.url,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt,
      ...(article.author ? { authors: [article.author.name] } : {}),
    },
  };
}

function toRoute(label: string, path: string): RouteRecord {
  return { id: path, label, path, status: "confirmed", readyToIndex: true };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (isReservedSlug(slug)) notFound();

  const article = await getPostBySlug(slug);
  if (!article) notFound();

  const relatedArticles = await getRelatedPosts(article, 3);

  const breadcrumbTrail = [routes.insights, toRoute(article.title, `/${slug}/`)];
  const jsonLd = [
    getBlogPostingJsonLd({
      path: `/${slug}/`,
      headline: article.title,
      description: article.excerpt,
      imageUrl: article.featuredImage?.url,
      authorName: article.author?.name,
      datePublished: article.publishedAt,
      dateModified: article.modifiedAt,
    }),
    getBreadcrumbJsonLd(routes.home.label, breadcrumbTrail),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }} />
      <ArticlePageTemplate article={article} breadcrumbTrail={breadcrumbTrail} relatedArticles={relatedArticles} />
    </>
  );
}

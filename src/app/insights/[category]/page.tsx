import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { getInsightCategory, insightCategories } from "@/config/insight-categories";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";
import { getBreadcrumbJsonLd, getCollectionPageJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return insightCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getInsightCategory(slug);
  return buildMetadata({
    title: category ? `${category.title} Insights` : "Insight Category",
    description: category?.summary,
    path: `/insights/${slug}/`,
    index: routes.insights.readyToIndex,
  });
}

export default async function InsightCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getInsightCategory(slug);

  if (!category) {
    notFound();
  }

  const categoryRoute: RouteRecord = {
    id: category.slug,
    label: category.title,
    path: `/insights/${category.slug}/`,
    status: "confirmed",
    readyToIndex: routes.insights.readyToIndex,
  };

  // SEO renderability audit remediation: CollectionPage/ItemList JSON-LD
  // for this category. `items` is genuinely empty because this page does
  // not yet fetch or list any category-filtered articles — it currently
  // always renders EmptyEditorialState below. Wiring up real
  // category-filtered WordPress articles is a separate, out-of-scope
  // change; this schema accurately reflects the page's real current
  // content rather than fabricating an article list. Update `items` here
  // if/when this page starts rendering real per-category articles.
  const jsonLd = [
    getCollectionPageJsonLd({
      path: categoryRoute.path,
      name: `${category.title} Insights`,
      description: category.summary,
      items: [],
    }),
    getBreadcrumbJsonLd(routes.home.label, [routes.insights, categoryRoute]),
  ];

  return (
    <Section tone="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }} />
      <Breadcrumbs trail={[routes.insights, categoryRoute]} />
      <div className="mt-6 max-w-[var(--container-reading)]">
        <SectionKicker>Insights</SectionKicker>
        <h1 className="mt-3 font-display text-h1 font-bold text-navy">{category.title} Insights</h1>
        <p className="mt-4 text-lead text-text-secondary">{category.summary}</p>
      </div>
      <div className="mt-10">
        <EmptyEditorialState message={`No ${category.title.toLowerCase()} articles are published yet.`} />
      </div>
    </Section>
  );
}

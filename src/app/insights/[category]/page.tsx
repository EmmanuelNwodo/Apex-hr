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

  return (
    <Section tone="page">
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

import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { InsightCard } from "@/components/content/insight-card";
import { LinkButton } from "@/components/ui/link-button";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { insightCategories } from "@/config/insight-categories";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPosts, toInsightPreview } from "@/lib/wordpress";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Insights",
  description: "HR and workforce insights from Apex HR, organised by topic.",
  path: routes.insights.path,
  index: routes.insights.readyToIndex,
});

interface InsightsPageProps {
  searchParams: Promise<{ page?: string }>;
}

const POSTS_PER_PAGE = 12;

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const { page: pageParam } = await searchParams;
  const requestedPage = Number(pageParam);
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const { posts, totalPages, unavailable } = await getPosts({ page, perPage: POSTS_PER_PAGE });
  const insights = posts.map(toInsightPreview);

  return (
    <Section tone="page">
      <Breadcrumbs trail={[routes.insights]} />
      <div className="mt-6 max-w-[var(--container-reading)]">
        <SectionKicker>Insights</SectionKicker>
        <h1 className="mt-3 font-display text-h1 font-bold text-navy">
          HR and workforce insights
        </h1>
        <p className="mt-4 text-lead text-text-secondary">
          Articles, guides and commentary on HR, recruitment and workforce
          strategy, organised by topic below.
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {insightCategories.map((category) => (
          <li key={category.slug} className="border border-border-subtle p-5">
            <Link href={`/insights/${category.slug}/`} className="font-display text-h4 font-bold text-navy hover:underline">
              {category.title}
            </Link>
            <p className="mt-2 text-body text-text-secondary">{category.summary}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        {unavailable ? (
          <EmptyEditorialState message="Articles can't be loaded right now. Please check back shortly." />
        ) : insights.length > 0 ? (
          <>
            <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {insights.map((insight) => (
                <StaggerItem key={insight.id}>
                  <InsightCard insight={insight} />
                </StaggerItem>
              ))}
            </StaggerContainer>
            {totalPages > 1 && (
              <nav aria-label="Insights pagination" className="mt-10 flex items-center justify-between gap-4">
                {page > 1 ? (
                  <LinkButton href={`${routes.insights.path}?page=${page - 1}`} variant="secondary" surface="light">
                    Previous
                  </LinkButton>
                ) : (
                  <span />
                )}
                <p className="text-small text-text-secondary">
                  Page {page} of {totalPages}
                </p>
                {page < totalPages ? (
                  <LinkButton href={`${routes.insights.path}?page=${page + 1}`} variant="secondary" surface="light">
                    Next
                  </LinkButton>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </>
        ) : (
          <EmptyEditorialState message="Approved articles and reports will appear here once published. No articles are published yet." />
        )}
      </div>
    </Section>
  );
}

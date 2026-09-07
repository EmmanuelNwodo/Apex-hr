import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { insightCategories } from "@/config/insight-categories";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Insights",
  description: "HR and workforce insights from Apex HR, organised by topic.",
  path: routes.insights.path,
  index: routes.insights.readyToIndex,
});

export default function InsightsPage() {
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
        <EmptyEditorialState message="Approved articles and reports will appear here once published. No articles are published yet." />
      </div>
    </Section>
  );
}

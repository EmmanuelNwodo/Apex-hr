import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { InsightCard } from "@/components/content/insight-card";
import { LinkButton } from "@/components/ui/link-button";
import { Reveal } from "@/components/motion/reveal";
import { insightPreviews } from "@/content/home";
import { routes } from "@/config/routes";

/**
 * Homepage insights feed per DESIGN.md 17.10. No approved published
 * articles exist yet — the card design below exists ready for when
 * approved entries land.
 */
export function InsightsSection() {
  return (
    <Section tone="page" gutter="always">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading kicker="Insights" title="Latest thinking on HR and workforce strategy" />
        <LinkButton href={routes.insights.path} variant="tertiary" surface="light">
          Browse insights
        </LinkButton>
      </div>
      <Reveal className="mt-8">
        {insightPreviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {insightPreviews.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        ) : (
          <EmptyEditorialState message="Approved articles and reports will appear here once published." />
        )}
      </Reveal>
    </Section>
  );
}

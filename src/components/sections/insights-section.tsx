import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { InsightCard } from "@/components/content/insight-card";
import { LinkButton } from "@/components/ui/link-button";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { getRecentPosts, toInsightPreview } from "@/lib/wordpress";
import { routes } from "@/config/routes";

/** Number of cards shown, matching the section's existing 3-column grid. */
const FEED_LIMIT = 3;

/**
 * Homepage insights feed per DESIGN.md 17.10, sourced live from WordPress
 * (see src/lib/wordpress). Renders nothing at all — not even an empty
 * state — until BOTH real published content exists AND the destination
 * route is approved indexable (`routes.insights.readyToIndex`, the single
 * source of truth also gating nav visibility in src/config/navigation.ts),
 * matching this section's previous behaviour exactly. `getRecentPosts`
 * already degrades to an empty array (never throws) if WordPress is
 * unreachable or returns a malformed response, so an outage here simply
 * keeps the section hidden rather than showing a broken homepage section.
 */
export async function InsightsSection() {
  if (!routes.insights.readyToIndex) return null;

  const posts = await getRecentPosts(FEED_LIMIT);
  if (posts.length === 0) return null;

  const insights = posts.map(toInsightPreview);

  return (
    <Section tone="page" gutter="always">
      <RevealHeading className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading kicker="Insights" title="Latest thinking on HR and workforce strategy" />
        <LinkButton href={routes.insights.path} variant="tertiary" surface="light">
          Browse insights
        </LinkButton>
      </RevealHeading>
      <div className="mt-8">
        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight) => (
            <StaggerItem key={insight.id}>
              <InsightCard insight={insight} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}

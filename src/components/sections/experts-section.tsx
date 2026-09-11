import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { ExpertCard } from "@/components/content/expert-card";
import { LinkButton } from "@/components/ui/link-button";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { expertPreviews } from "@/content/home";
import { routes } from "@/config/routes";

/**
 * Apex experts per DESIGN.md 17.8. No approved practitioner profiles exist
 * yet — never generate a fake practitioner or AI-generated portrait. The
 * card design below exists ready for when approved profiles land.
 */
export function ExpertsSection() {
  return (
    <Section tone="card" gutter="always">
      <RevealHeading className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading kicker="Apex experts" title="The people behind Apex HR" />
        <LinkButton href={routes.experts.path} variant="tertiary" surface="light">
          Meet the team
        </LinkButton>
      </RevealHeading>
      <div className="mt-8">
        {expertPreviews.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {expertPreviews.map((expert) => (
              <StaggerItem key={expert.id}>
                <ExpertCard expert={expert} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <EmptyEditorialState message="Approved practitioner profiles will appear here once confirmed." />
        )}
      </div>
    </Section>
  );
}

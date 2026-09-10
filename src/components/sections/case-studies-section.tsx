import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { CaseStudyCard } from "@/components/content/case-study-card";
import { LinkButton } from "@/components/ui/link-button";
import { caseStudyPreviews } from "@/content/home";
import { routes } from "@/config/routes";

/**
 * Case studies and results per DESIGN.md 17.8. No verified case studies
 * are approved yet — do not fabricate client names, results or outcomes.
 * The card design below exists ready for when approved case studies land.
 * SEO audit Phase 3 Batch 4 corrective pass: the "View all case studies"
 * link only renders once BOTH real case studies exist AND the destination
 * route is approved indexable (routes.caseStudies.readyToIndex, the single
 * source of truth in routes.ts) — preview data alone isn't enough, since
 * /case-study/ is currently readyToIndex: false while it stays empty.
 */
export function CaseStudiesSection() {
  const canLinkToHub = caseStudyPreviews.length > 0 && routes.caseStudies.readyToIndex;

  return (
    <Section tone="page" gutter="always">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading kicker="Case studies" title="Results for the employers we work with" />
        {canLinkToHub && (
          <LinkButton href={routes.caseStudies.path} variant="tertiary" surface="light">
            View all case studies
          </LinkButton>
        )}
      </div>
      <div className="mt-8">
        {caseStudyPreviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudyPreviews.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
        ) : (
          <EmptyEditorialState message="Verified case studies with approved evidence will appear here once published." />
        )}
      </div>
    </Section>
  );
}

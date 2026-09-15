import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Case Studies",
  description: "Verified results and case studies from Apex HR's work with employers.",
  path: routes.caseStudies.path,
  index: routes.caseStudies.readyToIndex,
});

export default function CaseStudiesPage() {
  return (
    <Section tone="page">
      <Breadcrumbs trail={[routes.caseStudies]} />
      <div className="mt-6 max-w-[var(--container-reading)]">
        <SectionKicker>Case studies</SectionKicker>
        <h1 className="mt-3 font-display text-h1 font-bold text-navy">
          Results for the employers we work with
        </h1>
        <p className="mt-4 text-lead text-text-secondary">
          Verified case studies, with evidence approved for publication, will
          appear here.
        </p>
      </div>
      <div className="mt-10">
        <EmptyEditorialState message="No verified case studies are published yet. None are fabricated to fill this page." />
      </div>
    </Section>
  );
}

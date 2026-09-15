import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Experts",
  description: "Meet the people behind Apex HR.",
  path: routes.experts.path,
  index: routes.experts.readyToIndex,
});

export default function ExpertsPage() {
  return (
    <Section tone="page">
      <Breadcrumbs trail={[routes.experts]} />
      <div className="mt-6 max-w-[var(--container-reading)]">
        <SectionKicker>Apex experts</SectionKicker>
        <h1 className="mt-3 font-display text-h1 font-bold text-navy">
          The people behind Apex HR
        </h1>
        <p className="mt-4 text-lead text-text-secondary">
          Approved practitioner profiles will appear here once confirmed.
        </p>
      </div>
      <div className="mt-10">
        <EmptyEditorialState message="No practitioner profiles are published yet. None are fabricated to fill this page." />
      </div>
    </Section>
  );
}

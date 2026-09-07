import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Resources",
  description: "Guides, reports and resources from Apex HR for employers and candidates.",
  path: routes.resources.path,
  index: routes.resources.readyToIndex,
});

export default function ResourcesPage() {
  return (
    <Section tone="page">
      <Breadcrumbs trail={[routes.resources]} />
      <div className="mt-6 max-w-[var(--container-reading)]">
        <SectionKicker>Resources</SectionKicker>
        <h1 className="mt-3 font-display text-h1 font-bold text-navy">Resources</h1>
        <p className="mt-4 text-lead text-text-secondary">
          Guides, reports and downloadable resources for employers and
          candidates will be published here.
        </p>
      </div>
      <div className="mt-10">
        <EmptyEditorialState message="No resources are published yet. Reports, events and webinars are planned for a later phase." />
      </div>
    </Section>
  );
}

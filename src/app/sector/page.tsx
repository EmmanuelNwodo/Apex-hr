import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { sectors } from "@/config/sectors";
import { sectorContent } from "@/content/sectors-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Sectors We Support",
  path: routes.sectors.path,
  index: routes.sectors.readyToIndex,
});

export default function SectorsPage() {
  return (
    <Section tone="page">
      <Breadcrumbs trail={[routes.sectors]} />
      <div className="mt-6 max-w-[var(--container-reading)]">
        <SectionKicker>Sectors</SectionKicker>
        <h1 className="mt-3 font-display text-h1 font-bold text-navy">
          Sectors Apex HR can support
        </h1>
        <p className="mt-4 text-lead text-text-secondary">
          Every sector has its own workforce and recruitment considerations.
          Explore a sector below to see how Apex HR can support employers
          like yours.
        </p>
      </div>
      <div className="mt-8">
        <LinkButton href={routes.findTalent.path} variant="primary" surface="light">
          {routes.findTalent.label}
        </LinkButton>
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((sector) => {
          const content = sectorContent.find((entry) => entry.slug === sector.slug);
          return (
            <li key={sector.slug} className="border border-border-subtle p-5">
              <Link href={`/sector/${sector.slug}/`} className="font-display text-h4 font-bold text-navy hover:underline">
                {sector.title}
              </Link>
              {content && <p className="mt-2 text-body text-text-secondary">{content.overview}</p>}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/link-button";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";
import type { LocationContent } from "@/content/locations-data";
import { getService } from "@/config/services";
import { getSector } from "@/config/sectors";

interface LocationPageTemplateProps {
  title: string;
  breadcrumbTrail: RouteRecord[];
  location: LocationContent;
}

/**
 * Reusable location page template. Never states or implies a physical
 * Apex HR office in any location — see CLAUDE.md section 9 and this
 * phase's location-content rules.
 */
export function LocationPageTemplate({ title, breadcrumbTrail, location }: LocationPageTemplateProps) {
  const relatedServices = location.relatedServiceSlugs
    .map((slug) => getService(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const relatedSectors = location.relatedSectorSlugs
    .map((slug) => getSector(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <>
      <Section tone="page">
        <Breadcrumbs trail={breadcrumbTrail} />
        <div className="mt-6 max-w-[var(--container-reading)]">
          <SectionKicker>{location.region}</SectionKicker>
          <h1 className="mt-3 font-display text-h1 font-bold text-navy">
            HR and recruitment support in {title}
          </h1>
          <p className="mt-4 text-lead text-text-secondary">{location.coverageStatement}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <LinkButton href={routes.findTalent.path} variant="primary" surface="light">
            {routes.findTalent.label}
          </LinkButton>
          <LinkButton href={routes.contact.path} variant="secondary" surface="light">
            Discuss your needs
          </LinkButton>
        </div>
      </Section>

      <Section tone="card" containerSize="reading">
        <SectionHeading title="Local context" />
        <p className="mt-4 text-body-lg text-text-secondary">{location.localContext}</p>
      </Section>

      {(relatedServices.length > 0 || relatedSectors.length > 0) && (
        <Section tone="page">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {relatedServices.length > 0 && (
              <div>
                <SectionHeading title="Relevant services" as="h3" />
                <ul className="mt-4 flex flex-col gap-2">
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}/`}
                        className="text-body font-semibold text-navy underline-offset-4 hover:underline"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {relatedSectors.length > 0 && (
              <div>
                <SectionHeading title="Relevant sectors" as="h3" />
                <ul className="mt-4 flex flex-col gap-2">
                  {relatedSectors.map((sector) => (
                    <li key={sector.slug}>
                      <Link
                        href={`/sector/${sector.slug}/`}
                        className="text-body font-semibold text-navy underline-offset-4 hover:underline"
                      >
                        {sector.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section tone="card" containerSize="reading">
        <SectionHeading title="Frequently asked questions" />
        <div className="mt-8">
          <FaqAccordion items={location.faqs} />
        </div>
      </Section>

      <Section tone="dark" className="text-center">
        <h2 className="mx-auto max-w-2xl font-display text-h2 font-bold text-white">
          Ready to talk about hiring or HR support in {title}?
        </h2>
        <LinkButton
          href={routes.findTalent.path}
          variant="primary"
          surface="dark"
          className="mt-8"
          data-analytics-id={`location-cta-${location.slug}`}
        >
          {routes.findTalent.label}
        </LinkButton>
      </Section>
    </>
  );
}

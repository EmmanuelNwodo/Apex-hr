import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/link-button";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";
import type { ServiceContent } from "@/content/services-data";
import { getService } from "@/config/services";
import { getSector } from "@/config/sectors";

interface ServicePageTemplateProps {
  title: string;
  breadcrumbTrail: RouteRecord[];
  service: ServiceContent;
}

/**
 * Reusable template implementing the 17-section individual service page
 * structure from this phase's brief (and CLAUDE.md section 12). Sections
 * 13-15 (case study / expert / insight) render an honest empty state when
 * no genuine, approved content exists yet, rather than being omitted or
 * fabricated.
 */
export function ServicePageTemplate({ title, breadcrumbTrail, service }: ServicePageTemplateProps) {
  const relatedServices = service.relatedServiceSlugs
    .map((slug) => getService(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const relatedSectors = service.relatedSectorSlugs
    .map((slug) => getSector(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <>
      {/* 1. Breadcrumbs + 2. hero */}
      <Section tone="page">
        <Breadcrumbs trail={breadcrumbTrail} />
        <div className="mt-6 max-w-[var(--container-reading)]">
          <SectionKicker>{service.primaryKeyword}</SectionKicker>
          <h1 className="mt-3 font-display text-h1 font-bold text-navy">{title}</h1>
          <p className="mt-4 text-lead text-text-secondary">{service.heroSummary}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href={routes.findTalent.path} variant="primary" surface="light">
              {routes.findTalent.label}
            </LinkButton>
            <LinkButton href={routes.contact.path} variant="secondary" surface="light">
              Discuss your needs
            </LinkButton>
          </div>
        </div>
      </Section>

      {/* 3. Employer challenge */}
      <Section tone="card" containerSize="reading">
        <SectionHeading title="The employer challenge" />
        <p className="mt-4 text-body-lg text-text-secondary">{service.employerChallenge}</p>
      </Section>

      {/* 4. Business outcomes */}
      <Section tone="page" containerSize="reading">
        <SectionHeading title="Business outcomes" />
        <ul className="mt-6 flex flex-col gap-3">
          {service.businessOutcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-3 text-body text-text-primary">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" />
              {outcome}
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. What it includes + 6. When needed + 7. Who we support */}
      <Section tone="card">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading title="What the service includes" as="h3" />
            <ul className="mt-4 flex flex-col gap-2">
              {service.whatItIncludes.map((item) => (
                <li key={item} className="text-body text-text-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="When you may need this" as="h3" />
            <ul className="mt-4 flex flex-col gap-2">
              {service.whenNeeded.map((item) => (
                <li key={item} className="text-body text-text-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Who we support" as="h3" />
            <p className="mt-4 text-body text-text-secondary">{service.whoWeSupport}</p>
          </div>
        </div>
      </Section>

      {/* 8. Delivery approach + 9. Engagement options */}
      <Section tone="page">
        <SectionHeading title="Our delivery approach" />
        <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.deliveryApproach.map((step, index) => (
            <li key={step} className="border-t-2 border-gold pt-4">
              <span className="font-display text-h4 font-bold text-navy">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-body text-text-secondary">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <SectionHeading title="Engagement options" as="h3" />
          <ul className="mt-4 flex flex-wrap gap-3">
            {service.engagementOptions.map((option) => (
              <li
                key={option}
                className="border border-border-strong bg-surface-card px-4 py-2 text-small font-semibold text-navy"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 10. Why choose Apex HR */}
      <Section tone="card" containerSize="reading">
        <SectionHeading title="Why choose Apex HR" />
        <p className="mt-4 text-body-lg text-text-secondary">{service.whyApex}</p>
      </Section>

      {/* 11. Related services + 12. Relevant sectors */}
      {(relatedServices.length > 0 || relatedSectors.length > 0) && (
        <Section tone="page">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {relatedServices.length > 0 && (
              <div>
                <SectionHeading title="Related services" as="h3" />
                <ul className="mt-4 flex flex-col gap-2">
                  {relatedServices.map((related) => (
                    <li key={related.slug}>
                      <Link
                        href={`/services/${related.slug}/`}
                        className="text-body font-semibold text-navy underline-offset-4 hover:underline"
                      >
                        {related.title}
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
                  {relatedSectors.map((related) => (
                    <li key={related.slug}>
                      <Link
                        href={`/sector/${related.slug}/`}
                        className="text-body font-semibold text-navy underline-offset-4 hover:underline"
                      >
                        {related.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* 13-15. Case study / expert / insight areas — honest empty states */}
      <Section tone="card">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <EmptyEditorialState message="A relevant case study will appear here once verified evidence is approved." />
          <EmptyEditorialState message="A relevant Apex expert will appear here once an approved profile exists." />
          <EmptyEditorialState message="A relevant insight article will appear here once published." />
        </div>
      </Section>

      {/* 16. FAQs */}
      <Section tone="page" containerSize="reading">
        <SectionHeading title="Frequently asked questions" />
        <div className="mt-8">
          <FaqAccordion items={service.faqs} />
        </div>
      </Section>

      {/* 17. Service-specific CTA */}
      <Section tone="dark" className="text-center">
        <h2 className="mx-auto max-w-2xl font-display text-h2 font-bold text-white">
          Ready to talk about {title.toLowerCase()}?
        </h2>
        <LinkButton
          href={routes.findTalent.path}
          variant="primary"
          surface="dark"
          className="mt-8"
          data-analytics-id={`service-cta-${title.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {routes.findTalent.label}
        </LinkButton>
      </Section>
    </>
  );
}

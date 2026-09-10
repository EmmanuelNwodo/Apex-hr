import Link from "next/link";
import { ArrowUpRight, CheckCircle2, CircleSlash, TriangleAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { FaqWithContactForm } from "@/components/content/faq-with-contact-form";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { serviceCategoryIcons } from "@/lib/service-category-icons";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";
import type { ServiceContent } from "@/content/services-data";
import { getService, getServiceCategory } from "@/config/services";
import { getSector } from "@/config/sectors";
import { getLocation } from "@/config/locations";
import { serviceLocationCombos } from "@/config/service-locations";

interface ServicePageTemplateProps {
  title: string;
  breadcrumbTrail: RouteRecord[];
  service: ServiceContent;
  /**
   * SEO audit Phase 3 Batch 6A: renders an additional "For Employers" link
   * in the closing CTA row. Defaults to false so the other 42 service pages
   * outside this batch render exactly as before — only the six Outsourced
   * HR Services children opt in (see src/app/services/[slug]/page.tsx).
   */
  showForEmployersLink?: boolean;
}

/**
 * Individual (sub-)service page template, per the approved reference
 * layout, generalised across all 48 services using only fields already
 * authored in services-data.ts — no per-service bespoke copy was
 * invented to match the reference exactly. Notably:
 * - the reference's three-item "trust strip" and its interactive
 *   deal-lifecycle "scope explorer" were both written for one specific
 *   service (M&A due diligence) with data no other service has (distinct
 *   phase titles/copy/deliverables per phase) — reproducing them for all
 *   48 pages would mean fabricating that structure 47 more times, so
 *   neither was built;
 * - the "risks we help uncover" aside reuses the existing `whenNeeded`
 *   list (already phrased as trigger/signal statements) under an
 *   honest, generic heading instead;
 * - "Our delivery approach" keeps deliveryApproach as a static numbered
 *   timeline rather than an interactive picker, since each step is one
 *   sentence, not a title/description pair.
 * Sections 13-15 (case study / expert / insight) still render an honest
 * empty state when no genuine, approved content exists yet. Each section
 * is a full-width band with no side margin (per later user instruction;
 * previously a single rounded cream "page shell" card inset from the
 * browser edges).
 */
export function ServicePageTemplate({ title, breadcrumbTrail, service, showForEmployersLink = false }: ServicePageTemplateProps) {
  const parentCategory = getServiceCategory(service.categorySlug);
  const CategoryIcon = parentCategory ? serviceCategoryIcons[parentCategory.slug] : undefined;
  const relatedServices = service.relatedServiceSlugs
    .map((slug) => getService(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const relatedSectors = service.relatedSectorSlugs
    .map((slug) => getSector(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  // Only the curated, demand-justified service-location combinations for
  // this specific service (src/config/service-locations.ts) — never a
  // generated list of every UK location, per CLAUDE.md section 9's
  // doorway-page restriction.
  const availableLocations = serviceLocationCombos
    .filter((combo) => combo.serviceSlug === service.slug)
    .map((combo) => ({ combo, location: getLocation(combo.locationSlug) }))
    .filter((entry): entry is { combo: (typeof serviceLocationCombos)[number]; location: NonNullable<ReturnType<typeof getLocation>> } =>
      Boolean(entry.location),
    );
  // SEO audit Phase 3 Batch 6A: additionalFaqs is a separate field from
  // faqs specifically so service-location combination pages (which read
  // service.faqs.slice(0, 3) directly) never see it — see the doc comment
  // on ServiceContent.additionalFaqs. Combined only here, for the
  // canonical page's own visible FAQ section and schema.
  const allFaqs = [...service.faqs, ...(service.additionalFaqs ?? [])];

  return (
    <div className="bg-surface-page">
      <header className="grid grid-cols-1 overflow-hidden bg-navy lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
              <Breadcrumbs trail={breadcrumbTrail} tone="dark" />
              <div>
                <SectionKicker tone="dark">{service.primaryKeyword}</SectionKicker>
                <h1 className="mt-4 max-w-xl font-display text-display font-bold text-white">{title} Firm in the UK</h1>
              </div>
              <p className="max-w-lg text-lead text-white/70">{service.heroSummary}</p>
              <div className="flex flex-wrap items-center gap-4">
                <LinkButton href={routes.contact.path} variant="primary" surface="dark">
                  Discuss your needs
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </LinkButton>
                <LinkButton href={routes.findTalent.path} variant="secondary" surface="dark">
                  {routes.findTalent.label}
                </LinkButton>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center gap-8 border-t border-white/10 p-10 lg:border-t-0 lg:border-l lg:p-14">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="absolute h-72 w-72 rounded-full border border-white/10" />
                <span className="absolute h-44 w-44 rounded-full border border-white/10" />
              </div>

              <div className="relative z-10 flex flex-wrap justify-center gap-3">
                {service.businessOutcomes.slice(0, 4).map((outcome) => (
                  <span
                    key={outcome}
                    className="inline-flex max-w-52 items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-caption font-semibold text-white"
                  >
                    {outcome}
                  </span>
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2 rounded-md bg-cream px-10 py-7 text-center shadow-(--shadow-modal)">
                {CategoryIcon && <CategoryIcon aria-hidden="true" className="h-7 w-7 text-navy" />}
                {parentCategory && (
                  <p className="mt-1 max-w-44 text-small text-text-secondary">
                    Part of{" "}
                    <Link href={`/services/${parentCategory.slug}/`} className="font-semibold text-navy underline-offset-4 hover:underline">
                      {parentCategory.title}
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
            <div>
              <SectionKicker tone="light">The employer challenge</SectionKicker>
              <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-navy">
                Where {title.toLowerCase()} helps
              </h2>
              <p className="mt-4 max-w-lg text-body-lg text-text-secondary">{service.employerChallenge}</p>
            </div>

            {service.whenNeeded.length > 0 && (
              <aside className="rounded-md bg-navy p-8">
                <span className="text-caption font-semibold uppercase tracking-widest text-gold">
                  Signs you may need this
                </span>
                <div className="mt-5 flex flex-col">
                  {service.whenNeeded.map((sign) => (
                    <div key={sign} className="flex items-start gap-3 border-t border-white/10 py-4 first:border-t-0">
                      <TriangleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <p className="text-body text-white/85">{sign}</p>
                    </div>
                  ))}
                </div>
              </aside>
            )}
          </section>

          <section aria-label="Business outcomes" className="bg-navy px-8 py-16 sm:px-10 lg:px-14 lg:py-20">
            <SectionKicker tone="dark">Business outcomes</SectionKicker>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {service.businessOutcomes.map((outcome, index) => (
                <div key={outcome} className="border-t border-white/20 pt-6">
                  <span className="font-display text-body-lg text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 max-w-xs font-display text-h4 font-bold text-white">{outcome}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-10 bg-surface-card p-8 sm:p-10 lg:grid-cols-3 lg:p-14">
            <div className="lg:col-span-2">
              <SectionKicker tone="light">What the service includes</SectionKicker>
              <ul className="mt-6 flex flex-col gap-3">
                {service.whatItIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body text-text-primary">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" />
                    {item}
                  </li>
                ))}
              </ul>
              {service.outOfScope && service.outOfScope.length > 0 && (
                <div className="mt-10">
                  <SectionKicker tone="light">Not included in this service</SectionKicker>
                  <ul className="mt-6 flex flex-col gap-3">
                    {service.outOfScope.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-body text-text-secondary">
                        <CircleSlash aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-text-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div>
              <SectionKicker tone="light">Who we support</SectionKicker>
              <p className="mt-6 text-body text-text-secondary">{service.whoWeSupport}</p>
            </div>
          </section>

          <section className="p-8 sm:p-10 lg:p-14">
            <SectionKicker tone="light">Our delivery approach</SectionKicker>
            <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-navy">
              Clear steps, from first conversation to delivery
            </h2>
            <ol className="mt-10 grid grid-cols-1 gap-8 border-t border-border-subtle pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {service.deliveryApproach.map((step, index) => (
                <li key={step} className="relative pl-6">
                  <span aria-hidden="true" className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-gold" />
                  <span className="font-display text-small text-gold-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-body text-text-secondary">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {service.engagementOptions.length > 0 && (
            <section className="bg-navy p-8 sm:p-10 lg:p-14">
              <SectionKicker tone="dark">Engagement options</SectionKicker>
              <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-white">
                Choose the way you want to work together
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.engagementOptions.map((option) => (
                  <div
                    key={option}
                    className="flex flex-col justify-between gap-8 rounded-md border border-white/15 bg-white/5 p-6"
                  >
                    <h3 className="font-display text-h4 font-bold text-white">{option}</h3>
                    <Link
                      href={routes.contact.path}
                      className="inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-[0.08em] text-gold"
                    >
                      Discuss this option
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(relatedServices.length > 0 || relatedSectors.length > 0) && (
            <section className="p-8 sm:p-10 lg:p-14">
              <SectionKicker tone="light">Continue exploring</SectionKicker>
              <h2 className="mt-4 max-w-lg font-display text-h2 font-bold text-navy">Related expertise</h2>
              {service.differentiationNote && (
                <p className="mt-4 max-w-3xl text-body text-text-secondary">{service.differentiationNote}</p>
              )}
              <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
                {relatedServices.length > 0 && (
                  <ul className="flex flex-col">
                    {relatedServices.map((related) => (
                      <li key={related.slug} className="border-t border-border-subtle first:border-t-0">
                        <Link
                          href={`/services/${related.slug}/`}
                          className="flex items-center justify-between gap-4 py-4 font-semibold text-navy hover:text-gold-ink"
                        >
                          {related.title}
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {relatedSectors.length > 0 && (
                  <div>
                    <h3 className="font-display text-h4 font-bold text-navy">Relevant sectors</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {relatedSectors.map((related) => (
                        <li key={related.slug}>
                          <Link
                            href={`/sector/${related.slug}/`}
                            className="rounded-full border border-border-subtle bg-surface-card px-4 py-2 text-small text-navy underline-offset-4 hover:border-navy hover:underline"
                          >
                            {related.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="mt-10">
                <h3 className="font-display text-h4 font-bold text-navy">
                  {availableLocations.length > 0 ? `${title} in these UK locations` : "UK-wide coverage"}
                </h3>
                {availableLocations.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {availableLocations.map(({ combo, location }) => (
                      <li key={combo.slug}>
                        <Link
                          href={`/services/${combo.slug}/`}
                          className="rounded-full border border-border-subtle bg-surface-card px-4 py-2 text-small text-navy underline-offset-4 hover:border-navy hover:underline"
                        >
                          {location.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 max-w-md text-body text-text-secondary">
                    {`${title} is available to employers across the UK, delivered remotely and, where useful, on-site.`}
                  </p>
                )}
                <Link
                  href={routes.locations.path}
                  className="mt-4 inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold-ink underline-offset-4 hover:underline"
                >
                  View all UK locations Apex HR supports
                </Link>
              </div>
            </section>
          )}

          {allFaqs.length > 0 && (
            <section className="bg-surface-card p-8 sm:p-10 lg:p-14">
              <SectionKicker tone="light">Frequently asked questions</SectionKicker>
              <h2 className="mt-4 max-w-lg font-display text-h2 font-bold text-navy">What clients usually ask</h2>
              <div className="mt-10">
                <FaqWithContactForm items={allFaqs} />
              </div>
            </section>
          )}

          <section className="p-8 sm:p-10 lg:p-14">
            <SectionKicker tone="light">Still deciding</SectionKicker>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <EmptyEditorialState message="A relevant case study will appear here once verified evidence is approved." />
              <EmptyEditorialState message="A relevant Apex expert will appear here once an approved profile exists." />
              <EmptyEditorialState message="A relevant insight article will appear here once published." />
            </div>
          </section>

      <div className="flex flex-col gap-6 bg-gold p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-14">
        <div>
          <h3 className="font-display text-h2 font-bold text-navy">
            Ready to talk about {title.toLowerCase()}?
          </h3>
          <p className="mt-2 max-w-md text-body text-navy/80">{service.whyApex}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-4">
          {showForEmployersLink && (
            <LinkButton href={routes.forEmployers.path} variant="tertiary" surface="light">
              More employer support
            </LinkButton>
          )}
          <LinkButton
            href={routes.findTalent.path}
            variant="primary"
            surface="light"
            data-analytics-id={`service-cta-${title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {routes.findTalent.label}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

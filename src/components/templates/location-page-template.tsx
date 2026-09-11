import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Gauge,
  HeartHandshake,
  MapPin,
  MessagesSquare,
  Settings2,
  UsersRound,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { FaqWithContactForm } from "@/components/content/faq-with-contact-form";
import { LocationContextSection } from "@/components/locations/LocationContextSection";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { SlideInLeft, SlideInRight } from "@/components/motion/slide-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { serviceCategoryIcons } from "@/lib/service-category-icons";
import { sectorIcons } from "@/lib/sector-icons";
import { sectorImages } from "@/lib/sector-images";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";
import type { LocationContent } from "@/content/locations-data";
import { getLocation } from "@/config/locations";
import { getService } from "@/config/services";
import { getSector } from "@/config/sectors";
import { serviceContent } from "@/content/services-data";
import { sectorContent } from "@/content/sectors-data";

interface LocationPageTemplateProps {
  title: string;
  breadcrumbTrail: RouteRecord[];
  location: LocationContent;
}

// Generic, non-quantified trust bullets — identical wording is intentional
// (the same three things are true of Apex HR's support in every location),
// not a location-specific claim, so nothing here needs per-city sourcing.
const trustPointsPrimary = [
  { icon: UsersRound, title: "Flexible HR support", detail: "Tailored to your business needs" },
  { icon: Settings2, title: "Specialist recruitment", detail: "Access to top talent in the region" },
  { icon: MessagesSquare, title: "Practical people advice", detail: "Real-world solutions, not just theory" },
];

const trustPointsSecondary = [
  { icon: Clock, title: "Responsive support", detail: "We act quickly and keep things moving" },
  { icon: HeartHandshake, title: "Practical advice", detail: "Straightforward, actionable guidance" },
  { icon: Gauge, title: "Flexible engagement", detail: "Support when and how you need it" },
];

const whyApexPoints = [
  {
    title: "Local market understanding",
    detail: "We know the regional talent market and what makes it unique.",
  },
  {
    title: "Senior HR expertise",
    detail: "Get direct access to experienced HR professionals, not just junior support.",
  },
  {
    title: "Support that scales with you",
    detail: "Whether you're a growing SME or an established employer, we tailor our support to your needs.",
  },
];

/**
 * Reusable location page template, per the approved reference layout.
 * Never states or implies a physical Apex HR office in any location — see
 * CLAUDE.md section 9 and this phase's location-content rules; the hero
 * and "why Apex HR" photos are the same generic, non-location-specific
 * stock images already used elsewhere on the site (no city skyline or
 * office implied). The reference's literal illustrated regional map (with
 * pinned neighbouring cities) was simplified to a decorative coverage
 * panel — accurately pinning real neighbouring towns on a mini-map for
 * all 16 locations is a cartography task, not a content one, and getting
 * it wrong would be a real geographic error, not just a simplification.
 * "Relevant HR and recruitment services" cards link to the curated
 * service+location pages (src/config/service-locations.ts) rather than
 * the generic service pages, since a more specific real page exists.
 *
 * Every section below uses the site-wide "Layered Rise and Reveal"
 * on-scroll entrance system (src/components/motion/*): headings rise via
 * RevealHeading, supporting copy via FadeUp, card/list grids stagger via
 * StaggerContainer/StaggerItem, and the hero/photo panels slide in from
 * their own side. Nothing here changes layout, copy, colour or
 * functionality — only how each block enters as a visitor scrolls to it.
 */
/**
 * The location page's full visible FAQ list — location.faqs plus three
 * generic, location-agnostic questions the template always adds. Exported
 * so the route file can build matching FAQPage JSON-LD without the schema
 * ever drifting from what's actually rendered (see SEO audit final
 * consolidated phase, Part 4).
 */
export function buildLocationFaqs(title: string, location: LocationContent) {
  return [
    ...location.faqs,
    {
      id: "business-types",
      question: `What types of businesses do you work with in ${title}?`,
      answer: `Apex HR supports employers of all sizes in ${title} and the wider ${location.region}, from growing startups to established organisations.`,
    },
    {
      id: "permanent-and-temporary",
      question: "Can you help with both permanent and temporary recruitment?",
      answer: "Yes. Apex HR supports permanent, contract and interim recruitment, alongside wider HR and workforce advisory services.",
    },
    {
      id: "start-timeline",
      question: "How quickly can you start supporting our business?",
      answer: "Timelines vary by need, but an Apex HR advisor responds promptly to discuss your requirements and the right way to get started.",
    },
  ];
}

export function LocationPageTemplate({ title, breadcrumbTrail, location }: LocationPageTemplateProps) {
  const locationItem = getLocation(location.slug);
  const relatedServices = location.relatedServiceSlugs
    .map((slug) => getService(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const relatedSectors = location.relatedSectorSlugs
    .map((slug) => getSector(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const locationFaqs = buildLocationFaqs(title, location);

  return (
    <div className="bg-surface-page">
      <header className="grid grid-cols-1 overflow-hidden bg-navy lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
          <Breadcrumbs trail={breadcrumbTrail} tone="dark" />
          <RevealHeading>
            <SectionKicker tone="dark">{location.region}</SectionKicker>
            <h1 className="mt-4 max-w-xl font-display text-display font-bold text-white">
              HR and recruitment support in {title}
            </h1>
          </RevealHeading>
          <FadeUp delay={0.15} className="flex flex-col gap-6">
            <p className="max-w-lg text-lead text-white/70">{location.coverageStatement}</p>
            <div className="flex flex-wrap items-center gap-4">
              <LinkButton href={routes.findTalent.path} variant="primary" surface="dark">
                {routes.findTalent.label}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </LinkButton>
              <LinkButton href={routes.contact.path} variant="secondary" surface="dark">
                Discuss your needs
              </LinkButton>
            </div>
          </FadeUp>
        </div>

        <SlideInRight className="relative min-h-64 lg:min-h-full">
          <Image
            src="/images/why-apex-section.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute right-4 bottom-4 left-4 z-10 flex items-center gap-3 rounded-md bg-cream px-5 py-4 shadow-(--shadow-modal) sm:right-6 sm:bottom-6 sm:left-auto">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/20 text-gold-ink">
              <MapPin aria-hidden="true" className="h-4 w-4" />
            </span>
            <p className="text-small font-semibold text-navy">
              Local insight.
              <br />
              UK-wide expertise.
            </p>
          </div>
        </SlideInRight>
      </header>

      <StaggerContainer
        as="section"
        aria-label="Why work with Apex HR here"
        className="grid grid-cols-1 gap-px overflow-hidden border-b border-border-subtle bg-border-subtle sm:grid-cols-3"
      >
        {trustPointsPrimary.map((point) => (
          <StaggerItem key={point.title} className="flex items-center gap-4 bg-surface-card p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-success/10 text-success">
              <point.icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-body-lg font-bold text-navy">{point.title}</p>
              <p className="mt-1 text-small text-text-secondary">{point.detail}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {locationItem && (
        <LocationContextSection
          title={title}
          location={locationItem}
          region={location.region}
          localContext={location.localContext}
        />
      )}

      {relatedServices.length > 0 && (
        <section id="relevant-services" className="bg-surface-card p-8 sm:p-10 lg:p-14">
          <RevealHeading>
            <SectionKicker tone="light">{`How we can help in ${title}`}</SectionKicker>
            <h2 className="mt-4 max-w-2xl font-display text-h1 font-bold text-navy">
              Relevant HR and recruitment services
            </h2>
          </RevealHeading>

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((service) => {
              const content = serviceContent.find((entry) => entry.slug === service.slug);
              const Icon = serviceCategoryIcons[service.categorySlug];
              return (
                <StaggerItem key={service.slug} className="flex flex-col gap-4 rounded-md border border-border-subtle bg-surface-page p-6">
                  {Icon && (
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/20 text-gold-ink">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  )}
                  <div>
                    <h3 className="font-display text-h4 font-bold text-navy">
                      {service.title} in {title}
                    </h3>
                    {content && (
                      <p className="mt-2 text-body text-text-secondary">{content.heroSummary}</p>
                    )}
                  </div>
                  <Link
                    href={`/services/${service.slug}-${location.slug}/`}
                    className="group mt-auto inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold-ink"
                  >
                    Find out more
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>
      )}

      {relatedSectors.length > 0 && (
        <section className="bg-navy p-8 sm:p-10 lg:p-14">
          <RevealHeading className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionKicker tone="dark">Sector expertise</SectionKicker>
              <h2 className="mt-4 max-w-xl font-display text-h1 font-bold text-white">
                {`Experience across ${title}'s key sectors`}
              </h2>
            </div>
            <Link
              href={routes.sectors.path}
              className="group inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold"
            >
              View all sectors
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </RevealHeading>

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedSectors.map((sector) => {
              const Icon = sectorIcons[sector.slug];
              const imageSrc = sectorImages[sector.slug];
              const content = sectorContent.find((entry) => entry.slug === sector.slug);
              return (
                <StaggerItem key={sector.slug}>
                  <Link
                    href={`/sector/${sector.slug}/`}
                    className="group flex flex-col overflow-hidden rounded-md border border-white/15 bg-white/5 transition-colors duration-(--duration-fast) hover:border-gold"
                  >
                    <div className="relative h-36 w-full overflow-hidden bg-navy">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover transition-transform duration-(--duration-slow) group-hover:scale-105"
                        />
                      ) : (
                        Icon && (
                          <span className="grid h-full w-full place-items-center text-white/30">
                            <Icon aria-hidden="true" className="h-10 w-10" />
                          </span>
                        )
                      )}
                      {Icon && (
                        <span className="absolute bottom-0 left-5 grid h-11 w-11 translate-y-1/2 place-items-center rounded-full bg-gold text-navy">
                          <Icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-5 pt-8">
                      <h3 className="font-display text-body-lg font-bold text-white">{sector.title}</h3>
                      {content && <p className="text-small text-white/70">{content.tagline}</p>}
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-auto h-4 w-4 text-gold transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>
      )}

      <StaggerContainer
        as="section"
        aria-label="How we support you here"
        className="grid grid-cols-1 gap-px overflow-hidden border-b border-border-subtle bg-border-subtle sm:grid-cols-3"
      >
        {trustPointsSecondary.map((point) => (
          <StaggerItem key={point.title} className="flex items-center gap-4 bg-surface-card p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-success/10 text-success">
              <point.icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-body-lg font-bold text-navy">{point.title}</p>
              <p className="mt-1 text-small text-text-secondary">{point.detail}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <section className="grid grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:items-center lg:p-14">
        <SlideInLeft className="relative aspect-4/3 w-full overflow-hidden rounded-md">
          <Image
            src="/images/candidates.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </SlideInLeft>
        <div>
          <RevealHeading>
            <SectionKicker tone="light">Why employers choose Apex HR</SectionKicker>
            <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-navy">
              A local partner, national expertise
            </h2>
          </RevealHeading>
          <StaggerContainer className="mt-8 flex flex-col gap-6">
            {whyApexPoints.map((point, index) => (
              <StaggerItem key={point.title} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/20 text-small font-bold text-gold-ink">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-body-lg font-bold text-navy">{point.title}</h3>
                  <p className="mt-1 text-body text-text-secondary">{point.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-surface-card p-8 sm:p-10 lg:p-14">
        <RevealHeading className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionKicker tone="light">Frequently asked questions</SectionKicker>
            <h2 className="mt-4 max-w-xl font-display text-h1 font-bold text-navy">
              {title} HR and recruitment FAQs
            </h2>
          </div>
          <Link
            href={routes.contact.path}
            className="group inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold-ink"
          >
            Still have a question? Get in touch
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </RevealHeading>
        <div className="mt-10">
          <FaqWithContactForm items={locationFaqs} />
        </div>
      </section>

      <div className="flex flex-col gap-6 bg-gold p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-14">
        <RevealHeading>
          <h3 className="font-display text-h2 font-bold text-navy">
            {`Let's solve your people challenge`}
          </h3>
          <p className="mt-2 max-w-md text-body text-navy/80">
            Whether you need to hire, improve your HR processes or plan for growth, we&apos;re
            here to help.
          </p>
        </RevealHeading>
        <FadeUp delay={0.15} className="flex flex-col items-start gap-3 sm:items-end">
          <LinkButton href={routes.contact.path} variant="primary" surface="light" className="shrink-0">
            Start a conversation
          </LinkButton>
          <Link
            href={routes.jobs.path}
            className="group inline-flex items-center gap-2 text-caption font-bold uppercase tracking-widest text-navy"
          >
            Search jobs
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeUp>
      </div>

      <div className="flex flex-wrap gap-4 bg-surface-page px-8 py-10 sm:px-10 lg:px-14">
        <Link
          href={routes.locations.path}
          className="text-body font-semibold text-navy underline-offset-4 hover:underline"
        >
          View all locations
        </Link>
        <Link
          href={routes.services.path}
          className="text-body font-semibold text-navy underline-offset-4 hover:underline"
        >
          View all services
        </Link>
      </div>
    </div>
  );
}

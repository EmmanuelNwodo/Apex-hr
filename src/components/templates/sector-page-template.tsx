import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { FaqWithContactForm } from "@/components/content/faq-with-contact-form";
import { SectorServiceExplorer } from "@/components/content/sector-service-explorer";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { SlideInLeft, SlideInRight } from "@/components/motion/slide-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { AnimatedSection } from "@/components/motion/animated-section";
import { sectorIcons } from "@/lib/sector-icons";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";
import type { SectorContent } from "@/content/sectors-data";
import { getService } from "@/config/services";
import { talentRoleContent } from "@/content/talent-roles-data";

interface SectorPageTemplateProps {
  title: string;
  breadcrumbTrail: RouteRecord[];
  sector: SectorContent;
}

/**
 * Individual sector page template, per the approved reference layout,
 * generalised across all 17 sectors using only fields already authored in
 * sectors-data.ts. Notably:
 * - the reference's three-item "focus strip" was written specifically for
 *   Financial Services (Specialist talent / Reward governance / Robust HR
 *   practice) with no equivalent generic field for any sector — building
 *   it for all 17 would mean inventing 51 new phrases, so it was dropped;
 * - the "How Apex HR can help" interactive picker is keyed by each
 *   sector's own curated `relatedServiceSlugs` (real services, each with
 *   its own real heroSummary/whatItIncludes) rather than the reference's
 *   bespoke Hire/Reward/Govern groupings, which again only existed for
 *   the one example sector;
 * - the recruitment-considerations checklist was dropped in favour of the
 *   existing single `recruitmentConsiderations` paragraph, since there's
 *   no per-sector checklist data to reuse honestly.
 * Each section is a full-width band with no side margin (per later user
 * instruction; previously a single rounded cream "page shell" card inset
 * from the browser edges).
 *
 * Every section below uses the site-wide "Layered Rise and Reveal"
 * on-scroll entrance system (src/components/motion/*): headings rise via
 * RevealHeading, supporting copy via FadeUp, card/list grids stagger via
 * StaggerContainer/StaggerItem, and side imagery/decorative panels slide
 * in from their own side. Nothing here changes layout, copy, colour or
 * functionality — only how each block enters as a visitor scrolls to it.
 */
export function SectorPageTemplate({ title, breadcrumbTrail, sector }: SectorPageTemplateProps) {
  const Icon = sectorIcons[sector.slug];
  const relatedServices = sector.relatedServiceSlugs
    .map((slug) => getService(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const relatedRoles = talentRoleContent.filter((role) => role.relatedSectorSlugs.includes(sector.slug));

  return (
    <div className="bg-surface-page">
      <header className="grid grid-cols-1 overflow-hidden bg-navy lg:grid-cols-[1.06fr_0.94fr]">
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
              <Breadcrumbs trail={breadcrumbTrail} tone="dark" />
              <RevealHeading>
                <SectionKicker tone="dark">Sector expertise</SectionKicker>
                <h1 className="mt-4 max-w-xl font-display text-display font-bold text-white">{`HR Company for ${title} in the UK`}</h1>
                <p className="mt-3 max-w-xl font-display text-h3 font-bold text-gold">{sector.tagline}</p>
              </RevealHeading>
              <FadeUp delay={0.15} className="flex flex-col gap-6">
                <p className="max-w-lg text-lead text-white/70">{sector.overview}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <LinkButton href={routes.contact.path} variant="primary" surface="dark">
                    Discuss your workforce
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </LinkButton>
                  {relatedServices.length > 0 && (
                    <LinkButton href="#help" variant="secondary" surface="dark">
                      See how we help
                    </LinkButton>
                  )}
                </div>
              </FadeUp>
            </div>

            <SlideInRight className="relative flex flex-col items-center justify-center gap-8 border-t border-white/10 p-10 lg:border-t-0 lg:border-l lg:p-14">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="absolute h-72 w-72 rounded-full border border-white/10" />
                <span className="absolute h-44 w-44 rounded-full border border-white/10" />
              </div>

              <div className="relative z-10 flex flex-wrap justify-center gap-3">
                {relatedServices.slice(0, 4).map((service) => (
                  <span
                    key={service.slug}
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-small font-semibold text-white"
                  >
                    {service.title}
                  </span>
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2 rounded-md bg-cream px-10 py-7 text-center shadow-(--shadow-modal)">
                {Icon && <Icon aria-hidden="true" className="h-7 w-7 text-navy" />}
                <p className="mt-1 max-w-44 text-small text-text-secondary">
                  People strategy built for {title.toLowerCase()}
                </p>
              </div>
            </SlideInRight>
          </header>

          <section className="p-8 sm:p-10 lg:p-14">
            <RevealHeading className="grid grid-cols-1 gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
              <div>
                <SectionKicker tone="light">Common workforce challenges</SectionKicker>
                <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-navy">
                  Where people risk meets business risk
                </h2>
              </div>
              <p className="text-body text-text-secondary">
                Sector context shapes which HR and recruitment priorities matter most —
                here&apos;s where Apex HR most often helps {title.toLowerCase()} employers.
              </p>
            </RevealHeading>

            <StaggerContainer className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border-subtle bg-border-subtle sm:grid-cols-2">
              {sector.challenges.map((challenge, index) => (
                <StaggerItem key={challenge} className="flex flex-col gap-4 bg-surface-card p-7">
                  <div className="flex items-center justify-between">
                    {Icon && (
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-success/10 text-success">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                    )}
                    <span className="font-display text-small text-gold-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-body-lg text-navy">{challenge}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          <section className="grid grid-cols-1 bg-navy lg:grid-cols-2">
            <SlideInLeft className="relative min-h-64 overflow-hidden bg-linear-to-br from-navy via-slate to-gold/40 p-8 sm:p-10 lg:min-h-full lg:p-12">
              <div className="flex h-full items-end">
                <div className="w-full rounded-md border border-white/20 bg-navy/70 p-5 backdrop-blur-sm">
                  <p className="font-display text-h4 font-bold text-white">
                    Recruitment with sector context
                  </p>
                  <p className="mt-1 text-small text-white/70">
                    Capability, fit and culture considered together
                  </p>
                </div>
              </div>
            </SlideInLeft>
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10 lg:p-14">
              <RevealHeading>
                <SectionKicker tone="dark">Recruitment considerations</SectionKicker>
                <h2 className="max-w-lg font-display text-h1 font-bold text-white">
                  More than matching a CV to a vacancy
                </h2>
              </RevealHeading>
              <FadeUp delay={0.15}>
                <p className="max-w-lg text-body text-white/70">{sector.recruitmentConsiderations}</p>
              </FadeUp>
            </div>
          </section>

          {relatedServices.length > 0 && (
            <section id="help" className="p-8 sm:p-10 lg:p-14">
              <RevealHeading className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
                <div>
                  <SectionKicker tone="light">How Apex HR can help</SectionKicker>
                  <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-navy">
                    Start with the outcome you need
                  </h2>
                </div>
                <p className="text-body text-text-secondary">{sector.howApexHelps}</p>
              </RevealHeading>

              <AnimatedSection delay={0.1} className="mt-10">
                <SectorServiceExplorer services={relatedServices} />
              </AnimatedSection>
            </section>
          )}

          {relatedRoles.length > 0 && (
            <section className="bg-navy p-8 sm:p-10 lg:p-14">
              <RevealHeading>
                <SectionKicker tone="dark">Relevant talent needs</SectionKicker>
                <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-white">
                  Roles that keep {title.toLowerCase()} moving
                </h2>
              </RevealHeading>
              <StaggerContainer className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {relatedRoles.slice(0, 6).map((role) => (
                  <StaggerItem key={role.slug}>
                    <Link
                      href={`/talent-acquisition/${role.slug}/`}
                      className="flex items-center justify-between gap-4 rounded-md border border-white/15 bg-white/5 px-5 py-4 text-body font-semibold text-white transition-colors duration-(--duration-fast) hover:border-gold hover:bg-white/10"
                    >
                      {role.title}
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          )}

          {sector.faqs.length > 0 && (
            <section className="bg-surface-card p-8 sm:p-10 lg:p-14">
              <RevealHeading>
                <SectionKicker tone="light">Frequently asked questions</SectionKicker>
                <h2 className="mt-4 max-w-2xl font-display text-h2 font-bold text-navy">
                  Questions {title.toLowerCase()} employers ask
                </h2>
              </RevealHeading>
              <div className="mt-10">
                <FaqWithContactForm items={sector.faqs} />
              </div>
            </section>
          )}

      <div className="flex flex-col gap-6 bg-gold p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-14">
        <RevealHeading>
          <h3 className="font-display text-h2 font-bold text-navy">
            Hiring or strengthening HR in {title.toLowerCase()}?
          </h3>
          <p className="mt-2 max-w-md text-body text-navy/80">
            Tell us what&apos;s changing in your workforce. Apex HR can connect the right
            recruitment, reward and HR advisory support around your priorities.
          </p>
        </RevealHeading>
        <FadeUp delay={0.15} className="shrink-0">
          <LinkButton
            href={routes.findTalent.path}
            variant="primary"
            surface="light"
            data-analytics-id={`sector-cta-${sector.slug}`}
          >
            {routes.findTalent.label}
          </LinkButton>
        </FadeUp>
      </div>
    </div>
  );
}

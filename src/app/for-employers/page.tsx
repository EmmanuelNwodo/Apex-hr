import Link from "next/link";
import {
  ArrowUpRight,
  BadgePlus,
  Building2,
  ChartNoAxesCombined,
  ClipboardList,
  ShieldCheck,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { AnimatedSection } from "@/components/motion/animated-section";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { SlideInRight } from "@/components/motion/slide-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { FaqWithContactForm } from "@/components/content/faq-with-contact-form";
import { EmployerNeedsExplorer } from "@/components/content/employer-needs-explorer";
import { forEmployersPageContent } from "@/content/supporting-pages-data";
import { serviceCategoryContent } from "@/content/services-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";

// SEO audit Phase 3 Batch 4: title made intent-descriptive (was the generic
// nav label "For Employers") to better match this page's principal intent
// — "HR support and recruitment support for UK employers" — while staying
// concise; the H1 itself is unchanged per this batch's explicit preservation
// instruction.
export const metadata = buildMetadata({
  title: "HR & Recruitment Support for Employers",
  description: forEmployersPageContent.lead,
  path: routes.forEmployers.path,
  index: routes.forEmployers.readyToIndex,
});

// Reuses the same three real service categories highlighted on the About
// page — see src/content/services-data.ts.
const supportPillars = [
  { categorySlug: "recruitment-talent-acquisition", title: "Recruitment", icon: UserRoundSearch },
  { categorySlug: "outsourced-hr-services", title: "Outsourced HR", icon: UsersRound },
  { categorySlug: "strategic-hr-and-workforce-advisory", title: "People advisory", icon: ShieldCheck },
];

// Original, non-quantified descriptions of how an engagement can be
// scoped — no claim, figure or history that would need verification.
const engagementModels = [
  {
    icon: ClipboardList,
    title: "Project support",
    detail: "A defined outcome, scope and timetable for a specific recruitment, HR or people initiative.",
  },
  {
    icon: BadgePlus,
    title: "Retained partnership",
    detail: "Ongoing access to practical HR advice and support, scaled around the organisation's needs.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Interim or fractional",
    detail: "Experienced HR leadership or delivery capacity added for change, growth or temporary cover.",
  },
];

const valuePoints = [
  {
    title: "One connected partner",
    detail: "Recruitment, day-to-day HR and strategic people advice can work together instead of sitting in separate silos.",
  },
  {
    title: "Practical, not theoretical",
    detail: "Recommendations are translated into decisions, tools and actions that managers can use.",
  },
  {
    title: "Support scaled to the need",
    detail: "Engagements can flex from a focused project to an ongoing partnership or interim leadership.",
  },
];

const growthStages = [
  { title: "Build", detail: "Contracts, policies, hiring processes and core HR foundations." },
  { title: "Scale", detail: "Management capability, consistent process and faster recruitment." },
  { title: "Strengthen", detail: "Performance, reward, employee experience and workforce planning." },
  { title: "Transform", detail: "Organisation design, culture change, HR technology and strategic advisory." },
];

/**
 * For Employers page, restructured per the approved reference layout: a
 * dark hero, a support strip (reusing real service-category content), an
 * interactive "where to start" needs picker (see EmployerNeedsExplorer,
 * built from the existing forEmployersPageContent needs list), an
 * engagement-models grid, a value-proposition list, a growth-stage grid,
 * an FAQ section (existing forEmployersPageContent.faqs), and a closing
 * CTA — all inside the same rounded cream page shell used across the
 * site's other rebuilt pages. As with the About page, the engagement
 * models / value points / growth stages are original positioning copy
 * authored directly for this one-off page — none assert a fact, number
 * or history that would need verification (CLAUDE.md section 32).
 *
 * Every section below uses the site-wide "Layered Rise and Reveal"
 * on-scroll entrance system (src/components/motion/*): headings rise via
 * RevealHeading, supporting copy via FadeUp, card/list grids stagger via
 * StaggerContainer/StaggerItem. Nothing here changes layout, copy, colour
 * or functionality — only how each block enters as a visitor scrolls to
 * it.
 */
export default function ForEmployersPage() {
  const jsonLd = getBreadcrumbJsonLd(routes.home.label, [routes.forEmployers]);

  return (
    <div className="bg-surface-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }} />
      <header className="grid grid-cols-1 overflow-hidden bg-navy lg:grid-cols-[1.06fr_0.94fr]">
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
              <Breadcrumbs trail={[routes.forEmployers]} tone="dark" />
              <RevealHeading>
                <SectionKicker tone="dark">For employers</SectionKicker>
                <h1 className="mt-4 max-w-xl font-display text-display font-bold text-white">
                  The right people support, exactly when you need it
                </h1>
              </RevealHeading>
              <FadeUp delay={0.15} className="flex flex-col gap-6">
                <p className="max-w-lg text-lead text-white/70">{forEmployersPageContent.lead}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <LinkButton href={routes.contact.path} variant="primary" surface="dark">
                    Discuss your needs
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </LinkButton>
                  <LinkButton href="#needs" variant="secondary" surface="dark">
                    Find where to start
                  </LinkButton>
                </div>
              </FadeUp>
            </div>

            <SlideInRight className="relative flex flex-col items-center justify-center gap-8 border-t border-white/10 p-10 lg:border-t-0 lg:border-l lg:p-14">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="absolute h-72 w-72 rounded-full border border-white/10" />
                <span className="absolute h-44 w-44 rounded-full border border-white/10" />
              </div>

              <div className="relative z-10 flex flex-wrap justify-center gap-3">
                {["Hire", "Protect", "Support", "Grow"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-small font-semibold text-white"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2 rounded-md bg-cream px-10 py-7 text-center shadow-(--shadow-modal)">
                <Building2 aria-hidden="true" className="h-7 w-7 text-navy" />
                <p className="mt-1 font-display text-h4 font-bold text-navy">Your business</p>
                <p className="max-w-44 text-small text-text-secondary">Supported to move forward</p>
              </div>
            </SlideInRight>
          </header>

          <StaggerContainer
            as="section"
            aria-label="Core employer support"
            className="grid grid-cols-1 gap-px overflow-hidden border-b border-border-subtle bg-border-subtle sm:grid-cols-3"
          >
            {supportPillars.map((pillar) => {
              const content = serviceCategoryContent.find((entry) => entry.slug === pillar.categorySlug);
              return (
                <StaggerItem key={pillar.categorySlug}>
                  <Link
                    href={`/services/${pillar.categorySlug}/`}
                    className="flex items-center gap-4 bg-surface-card p-6 transition-colors duration-(--duration-fast) hover:bg-surface-warm"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-success/10 text-success">
                      <pillar.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display text-body-lg font-bold text-navy">{pillar.title}</p>
                      {content && <p className="mt-1 text-small text-text-secondary">{content.summary}</p>}
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <section id="needs" className="p-8 sm:p-10 lg:p-14">
            <RevealHeading className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <SectionKicker tone="light">Where to start</SectionKicker>
                <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-navy">
                  Begin with the challenge, not the service name
                </h2>
              </div>
              <p className="text-body text-text-secondary">
                Select the challenge closest to yours to see a clear explanation and a direct
                route to relevant support.
              </p>
            </RevealHeading>

            <AnimatedSection delay={0.1} className="mt-10">
              <EmployerNeedsExplorer />
            </AnimatedSection>
          </section>

          <section className="bg-navy p-8 sm:p-10 lg:p-14">
            <RevealHeading className="grid grid-cols-1 gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
              <div>
                <SectionKicker tone="dark">How engagements work</SectionKicker>
                <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-white">
                  Flexible support with a clear scope
                </h2>
              </div>
              <p className="text-body text-white/70">
                Apex HR can support a defined project, provide ongoing cover, or add senior
                capability temporarily, whichever fits how your organisation needs to work.
              </p>
            </RevealHeading>

            <StaggerContainer className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-white/15 bg-white/15 sm:grid-cols-3">
              {engagementModels.map((model) => (
                <StaggerItem key={model.title} className="flex flex-col justify-between gap-8 bg-navy p-7">
                  <div>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-gold">
                      <model.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 font-display text-h4 font-bold text-white">{model.title}</h3>
                    <p className="mt-2 text-body text-white/70">{model.detail}</p>
                  </div>
                  <Link
                    href={routes.contact.path}
                    className="inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold"
                  >
                    Discuss this option
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          <section className="grid grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:p-14">
            <RevealHeading>
              <SectionKicker tone="light">Why Apex HR</SectionKicker>
              <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-navy">
                Advice your managers can actually use
              </h2>
            </RevealHeading>
            <StaggerContainer>
              <div className="flex flex-col">
                {valuePoints.map((point, index) => (
                  <StaggerItem key={point.title} className="grid grid-cols-[auto_1fr] gap-4 border-b border-border-subtle py-6 first:border-t">
                    <span className="font-display text-body-lg text-gold-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-h4 font-bold text-navy">{point.title}</h3>
                      <p className="mt-1 text-body text-text-secondary">{point.detail}</p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </section>

          <section className="bg-navy p-8 sm:p-10 lg:p-14">
            <RevealHeading>
              <SectionKicker tone="dark">Built for every growth stage</SectionKicker>
              <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-white">
                Support that evolves with the organisation
              </h2>
            </RevealHeading>
            <StaggerContainer className="mt-10 grid grid-cols-1 gap-8 border-t border-white/20 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {growthStages.map((stage, index) => (
                <StaggerItem key={stage.title}>
                  <span className="font-display text-small text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-h4 font-bold text-white">{stage.title}</h3>
                  <p className="mt-2 text-body text-white/70">{stage.detail}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          {forEmployersPageContent.faqs && forEmployersPageContent.faqs.length > 0 && (
            <section className="bg-surface-card p-8 sm:p-10 lg:p-14">
              <RevealHeading>
                <SectionKicker tone="light">Frequently asked questions</SectionKicker>
                <h2 className="mt-4 max-w-lg font-display text-h2 font-bold text-navy">What employers usually ask</h2>
              </RevealHeading>
              <div className="mt-10">
                <FaqWithContactForm items={forEmployersPageContent.faqs} />
              </div>
            </section>
          )}

      <div className="flex flex-col gap-6 bg-gold p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-14">
        <RevealHeading>
          <h3 className="font-display text-h2 font-bold text-navy">
            What does your organisation need next?
          </h3>
          <p className="mt-2 max-w-md text-body text-navy/80">
            Whether the priority is hiring, dependable HR support or a complex people
            challenge, Apex HR can help you identify the right place to start.
          </p>
        </RevealHeading>
        {forEmployersPageContent.primaryCta && (
          <FadeUp delay={0.15} className="shrink-0">
            <LinkButton href={forEmployersPageContent.primaryCta.href} variant="primary" surface="light">
              {forEmployersPageContent.primaryCta.label}
            </LinkButton>
          </FadeUp>
        )}
      </div>
    </div>
  );
}

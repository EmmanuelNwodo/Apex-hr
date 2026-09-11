import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Compass,
  Handshake,
  Link2,
  MessagesSquare,
  Rocket,
  Telescope,
  TrendingUp,
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
import { AboutProcessExplorer } from "@/components/content/about-process-explorer";
import { aboutPageContent } from "@/content/supporting-pages-data";
import { processSteps } from "@/content/home";
import { serviceCategoryContent } from "@/content/services-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAboutPageJsonLd, getBreadcrumbJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";

// Bare page title — the root layout's "%s | Apex HR" template appends the
// brand name once. Passing "About Apex HR" here previously rendered as
// "About Apex HR | Apex HR" (SEO audit Batch 2, item 1). Every other
// buildMetadata() caller in src/app already follows this convention; this
// was the one exception.
export const metadata = buildMetadata({
  title: "About",
  description: aboutPageContent.lead,
  path: routes.about.path,
  index: routes.about.readyToIndex,
});

// The three pillars reuse real, already-authored service-family content
// and link to real category pages — see src/content/services-data.ts.
const pillars = [
  { categorySlug: "recruitment-talent-acquisition", title: "Recruitment & talent", icon: UserRoundSearch },
  { categorySlug: "outsourced-hr-services", title: "Practical HR support", icon: UsersRound },
  { categorySlug: "strategic-hr-and-workforce-advisory", title: "Workforce advisory", icon: Telescope },
];

// Original, non-quantified positioning statements — see the doc comment
// on the About page component below.
const promises = [
  {
    icon: BriefcaseBusiness,
    title: "Commercially practical",
    detail: "Advice shaped for the organisation, not a generic template.",
  },
  {
    icon: MessagesSquare,
    title: "Clear and human",
    detail: "Complex people issues made easier to understand and act on.",
  },
  {
    icon: Link2,
    title: "Joined-up expertise",
    detail: "Recruitment, HR and workforce advice from one partner.",
  },
];

const beliefs = [
  {
    title: "Advice should be usable",
    detail: "Recommendations should help leaders and managers make better decisions in the real world.",
  },
  {
    title: "People and performance belong together",
    detail: "Strong employee practice and commercial outcomes should reinforce one another.",
  },
  {
    title: "Partnership beats handover",
    detail: "The best support builds internal confidence, not just a document no one uses.",
  },
];

const growthStages = [
  {
    icon: Rocket,
    title: "Startups",
    detail: "Build contracts, policies, hiring processes and the first reliable HR foundations.",
  },
  {
    icon: TrendingUp,
    title: "Scale-ups",
    detail: "Add structure, management capability and workforce planning without slowing growth.",
  },
  {
    icon: Building2,
    title: "Established organisations",
    detail: "Strengthen complex HR practice, talent strategy and organisation-wide change.",
  },
  {
    icon: Compass,
    title: "Growing internationally",
    detail: "Navigate UK people practice and workforce needs as operations expand.",
  },
];

/**
 * About page, restructured per the approved reference layout: a dark hero,
 * a "promise strip", a three-pillar "what we do" (reusing real service
 * category content), an interactive "how we work" picker (the same
 * processSteps already used on the homepage, per CLAUDE.md section 11),
 * a "what we believe" list, a "who we work with" growth-stage grid, and a
 * closing CTA — all inside the same rounded cream page shell used across
 * the site's other rebuilt pages.
 *
 * The reference's promise-strip, beliefs and growth-stage copy were
 * written for a single one-off page (unlike the 10/17/48-page templates
 * elsewhere in this project), so — unlike those templates — original
 * positioning statements were authored directly here rather than reused
 * from existing fields; none assert a fact, claim, number or history that
 * would need verification (CLAUDE.md section 32).
 *
 * Every section below uses the site-wide "Layered Rise and Reveal"
 * on-scroll entrance system (src/components/motion/*): headings rise via
 * RevealHeading, supporting copy via FadeUp, card/list grids stagger via
 * StaggerContainer/StaggerItem. Nothing here changes layout, copy, colour
 * or functionality — only how each block enters as a visitor scrolls to
 * it.
 */
export default function AboutPage() {
  const jsonLd = [getAboutPageJsonLd(routes.about.path), getBreadcrumbJsonLd(routes.home.label, [routes.about])];

  return (
    <div className="bg-surface-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
      />
      <header className="grid grid-cols-1 overflow-hidden bg-navy lg:grid-cols-[1.06fr_0.94fr]">
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
              <Breadcrumbs trail={[routes.about]} tone="dark" />
              <RevealHeading>
                <SectionKicker tone="dark">About Apex HR</SectionKicker>
                <h1 className="mt-4 max-w-xl font-display text-display font-bold text-white">
                  A people partner that works alongside you
                </h1>
              </RevealHeading>
              <FadeUp delay={0.15} className="flex flex-col gap-6">
                <p className="max-w-lg text-lead text-white/70">{aboutPageContent.lead}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <LinkButton href={routes.contact.path} variant="primary" surface="dark">
                    Talk to Apex HR
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </LinkButton>
                  <LinkButton href="#what-we-do" variant="secondary" surface="dark">
                    Explore what we do
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
                {["Recruitment", "HR support", "Strategy", "Development"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-small font-semibold text-white"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2 rounded-md bg-cream px-10 py-7 text-center shadow-(--shadow-modal)">
                <Handshake aria-hidden="true" className="h-7 w-7 text-navy" />
                <p className="mt-1 font-display text-h4 font-bold text-navy">One partner</p>
                <p className="max-w-44 text-small text-text-secondary">Across the people journey</p>
              </div>
            </SlideInRight>
          </header>

          <StaggerContainer
            as="section"
            aria-label="Apex HR partnership principles"
            className="grid grid-cols-1 gap-px overflow-hidden border-b border-border-subtle bg-border-subtle sm:grid-cols-3"
          >
            {promises.map((promise) => (
              <StaggerItem key={promise.title} className="flex items-center gap-4 bg-surface-card p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-success/10 text-success">
                  <promise.icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-body-lg font-bold text-navy">{promise.title}</p>
                  <p className="mt-1 text-small text-text-secondary">{promise.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <section id="what-we-do" className="p-8 sm:p-10 lg:p-14">
            <RevealHeading className="grid grid-cols-1 gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
              <div>
                <SectionKicker tone="light">What we do</SectionKicker>
                <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-navy">
                  One partner for the full people lifecycle
                </h2>
              </div>
              <p className="text-body text-text-secondary">{aboutPageContent.sections[0]?.body}</p>
            </RevealHeading>

            <StaggerContainer className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border-subtle bg-border-subtle sm:grid-cols-3">
              {pillars.map((pillar) => {
                const content = serviceCategoryContent.find((entry) => entry.slug === pillar.categorySlug);
                return (
                  <StaggerItem key={pillar.categorySlug} className="flex flex-col justify-between gap-8 bg-surface-card p-7">
                    <div>
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-success/10 text-success">
                        <pillar.icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <h3 className="mt-6 font-display text-h4 font-bold text-navy">{pillar.title}</h3>
                      {content && <p className="mt-2 text-body text-text-secondary">{content.summary}</p>}
                    </div>
                    <Link
                      href={`/services/${pillar.categorySlug}/`}
                      className="inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold-ink"
                    >
                      Explore
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </section>

          <section className="bg-navy p-8 sm:p-10 lg:p-14">
            <RevealHeading className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <SectionKicker tone="dark">How we work</SectionKicker>
                <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-white">
                  A clear process, shaped around you
                </h2>
              </div>
              <p className="text-body text-white/70">
                Select a stage to see how Apex HR moves from understanding the real issue to
                embedding practical change and reviewing the outcome.
              </p>
            </RevealHeading>

            <AnimatedSection delay={0.1} className="mt-10">
              <AboutProcessExplorer steps={processSteps} />
            </AnimatedSection>
          </section>

          <section className="grid grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:p-14">
            <RevealHeading>
              <SectionKicker tone="light">What we believe</SectionKicker>
              <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-navy">
                Good people work should make the business work better
              </h2>
            </RevealHeading>
            <StaggerContainer>
              <div className="flex flex-col">
                {beliefs.map((belief, index) => (
                  <StaggerItem key={belief.title} className="grid grid-cols-[auto_1fr] gap-4 border-b border-border-subtle py-6 first:border-t">
                    <span className="font-display text-body-lg text-gold-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-h4 font-bold text-navy">{belief.title}</h3>
                      <p className="mt-1 text-body text-text-secondary">{belief.detail}</p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </section>

          <section className="bg-navy p-8 sm:p-10 lg:p-14">
            <RevealHeading className="grid grid-cols-1 gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <SectionKicker tone="dark">Who we work with</SectionKicker>
                <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-white">
                  Support that changes as organisations grow
                </h2>
              </div>
              <p className="text-body text-white/70">{aboutPageContent.sections[2]?.body}</p>
            </RevealHeading>

            <StaggerContainer className="mt-10 grid grid-cols-1 gap-8 border-t border-white/20 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {growthStages.map((stage) => (
                <StaggerItem key={stage.title}>
                  <stage.icon aria-hidden="true" className="h-6 w-6 text-gold" />
                  <h3 className="mt-4 font-display text-h4 font-bold text-white">{stage.title}</h3>
                  <p className="mt-2 text-body text-white/70">{stage.detail}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

      <div className="flex flex-col gap-6 bg-gold p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-14">
        <RevealHeading>
          <h3 className="font-display text-h2 font-bold text-navy">
            Looking for a people partner who can see the whole picture?
          </h3>
          <p className="mt-2 max-w-md text-body text-navy/80">
            Tell Apex HR what your organisation is trying to achieve. We&apos;ll help connect
            the recruitment, HR and workforce support around it.
          </p>
        </RevealHeading>
        <FadeUp delay={0.15} className="shrink-0">
          <LinkButton href={routes.contact.path} variant="primary" surface="light">
            Start a conversation
          </LinkButton>
        </FadeUp>
      </div>
    </div>
  );
}

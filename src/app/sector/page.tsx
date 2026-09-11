import { ArrowDown, CheckCircle2, Cpu, HardHat, HeartPulse, Landmark } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { AnimatedSection } from "@/components/motion/animated-section";
import { SlideInRight } from "@/components/motion/slide-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { SectorExplorer } from "@/components/content/sector-explorer";
import { sectors } from "@/config/sectors";
import { sectorContent } from "@/content/sectors-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd, getCollectionPageJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";

const HUB_DESCRIPTION =
  "Browse HR and recruitment support by sector. Explore the people challenges and service pathways relevant to your industry, from healthcare to technology and beyond.";

export const metadata = buildMetadata({
  title: "Sectors We Support",
  description: HUB_DESCRIPTION,
  path: routes.sectors.path,
  index: routes.sectors.readyToIndex,
});

// Decorative example pills in the hero visual — illustrative only, not an
// exhaustive or ranked list (the real, complete list is the directory below).
const heroExamplePills = [
  { name: "Healthcare", icon: HeartPulse },
  { name: "Finance", icon: Landmark },
  { name: "Construction", icon: HardHat },
  { name: "Technology", icon: Cpu },
];

/**
 * Sectors hub, restructured per the approved reference layout: a dark
 * hero, an intro, a filterable sector directory (see SectorExplorer), an
 * editorial "sector spotlight" feature, and a closing CTA — all inside one
 * rounded cream "page shell", matching the pattern already used for the
 * services hub. The reference's absolutely-positioned floating orbit
 * labels and hand-painted gradient "people silhouette" were simplified to
 * a plain flex layout and a token-based gradient panel respectively —
 * both were purely decorative, and the originals would have been fragile
 * across breakpoints for no functional gain. Each section is a full-width
 * band with no side margin (per later user instruction; previously a
 * single rounded cream "page shell" card inset from the browser edges).
 */
export default function SectorsPage() {
  const healthCare = sectorContent.find((entry) => entry.slug === "health-care");
  const jsonLd = [
    getCollectionPageJsonLd({
      path: routes.sectors.path,
      name: "Sectors We Support",
      description: HUB_DESCRIPTION,
      items: sectors.map((sector) => ({ name: sector.title, path: `/sector/${sector.slug}/` })),
    }),
    getBreadcrumbJsonLd(routes.home.label, [routes.sectors]),
  ];

  return (
    <div className="bg-surface-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
      />
      <div className="px-5 py-8 sm:px-0 md:py-12">
        <Breadcrumbs trail={[routes.sectors]} />
      </div>

      <header className="grid grid-cols-1 overflow-hidden bg-navy lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
              <RevealHeading>
                <SectionKicker tone="dark">Sector expertise</SectionKicker>
                <h1 className="max-w-2xl font-display text-display font-bold text-white">
                  People solutions shaped for your world
                </h1>
              </RevealHeading>
              <FadeUp delay={0.15} className="flex flex-col gap-6">
                <p className="max-w-lg text-lead text-white/70">
                  Every industry has its own pressures, skills gaps and compliance demands. Apex HR
                  combines specialist sector knowledge with practical people expertise.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <LinkButton href="#sector-directory" variant="primary" surface="dark">
                    Explore sectors
                    <ArrowDown aria-hidden="true" className="h-4 w-4" />
                  </LinkButton>
                  <LinkButton href={routes.contact.path} variant="secondary" surface="dark">
                    Discuss your challenge
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
                {heroExamplePills.map((pill) => (
                  <span
                    key={pill.name}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-small font-semibold text-white"
                  >
                    <pill.icon aria-hidden="true" className="h-4 w-4 text-gold" />
                    {pill.name}
                  </span>
                ))}
              </div>

              <div className="relative z-10 rounded-md bg-cream px-10 py-7 text-center shadow-(--shadow-modal)">
                <p className="font-display text-display font-bold text-navy">{sectors.length}</p>
                <p className="mt-2 max-w-44 text-small text-text-secondary">
                  sectors supported by one connected HR partner
                </p>
              </div>
            </SlideInRight>
          </header>

          <RevealHeading
            className="grid grid-cols-1 gap-6 p-8 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-10 lg:p-14"
          >
            <div>
              <SectionKicker tone="light">Find your sector</SectionKicker>
              <h2 className="mt-4 max-w-xl font-display text-h1 font-bold text-navy">
                Expertise that understands the context
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <p className="text-body text-text-secondary">
                Instead of presenting every industry as an identical text box, explore the
                challenges that matter most in your environment.
              </p>
              <p className="text-body text-text-secondary">
                Filter by category, then follow a sector through to tailored services and a
                direct conversation.
              </p>
            </div>
          </RevealHeading>

          <AnimatedSection delay={0.1} className="px-5 pb-8 sm:px-0 sm:pb-10 lg:pb-14">
            <SectorExplorer />
          </AnimatedSection>

          <section aria-label="Featured sector story" className="grid grid-cols-1 bg-navy lg:grid-cols-2">
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
              <RevealHeading>
                <SectionKicker tone="dark">Sector spotlight</SectionKicker>
                <h2 className="max-w-lg font-display text-h1 font-bold text-white">
                  Healthcare needs more than faster hiring.
                </h2>
              </RevealHeading>
              {healthCare && (
                <FadeUp delay={0.15}>
                  <p className="max-w-md text-body text-white/70">{healthCare.overview}</p>
                </FadeUp>
              )}
              {healthCare && (
                <StaggerContainer>
                  <ul className="flex flex-col gap-3">
                    {healthCare.challenges.slice(0, 3).map((challenge) => (
                      <StaggerItem key={challenge} as="li" className="flex items-start gap-3 text-body text-white/85">
                        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                        {challenge}
                      </StaggerItem>
                    ))}
                  </ul>
                </StaggerContainer>
              )}
            </div>
            <SlideInRight className="relative flex min-h-64 items-end bg-linear-to-br from-navy via-slate to-gold/40 p-8 sm:p-10 lg:p-12">
              <div className="w-full rounded-md border border-white/20 bg-navy/70 p-5 backdrop-blur-sm">
                <p className="font-display text-h4 font-bold text-white">Specialist people support</p>
                <p className="mt-1 text-small text-white/70">
                  From vacancy pressure to long-term workforce resilience
                </p>
              </div>
            </SlideInRight>
          </section>

      <div className="flex flex-col gap-6 bg-gold p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-14">
        <RevealHeading>
          <h3 className="font-display text-h2 font-bold text-navy">Don&apos;t see your sector?</h3>
          <p className="mt-2 max-w-md text-body text-navy/80">
            Tell us about your workforce challenge. Our team will connect you with the right
            combination of HR, recruitment and people expertise.
          </p>
        </RevealHeading>
        <FadeUp delay={0.15} className="shrink-0">
          <LinkButton href={routes.contact.path} variant="primary" surface="light">
            Talk to an adviser
          </LinkButton>
        </FadeUp>
      </div>
    </div>
  );
}

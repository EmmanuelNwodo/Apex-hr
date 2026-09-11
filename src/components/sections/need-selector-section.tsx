import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { employerNeeds, needSelectorIntro } from "@/content/home";

interface NeedSelectorSectionProps {
  /**
   * When true, renders with a transparent background instead of its own
   * solid navy fallback — used when a shared SectionVideoBackground in an
   * ancestor wrapper (see page.tsx) already supplies the video/scrim
   * behind this section and EmployerProblemsSection together, so the two
   * sections read as one continuous video rather than two separate clips.
   */
  transparent?: boolean;
}

/**
 * Employer need selector per DESIGN.md 17.3 and CLAUDE.md section 11.
 * Two-column layout (intro copy beside a stacked, numbered option list),
 * restructured to match an approved reference layout — reusing only the
 * existing navy/gold/cream brand tokens already used elsewhere on the site
 * (see EmployerProblemsSection, ServiceCard), not new colours. Rendered on
 * a dark surface (its own navy fallback by default, or a shared background
 * video when `transparent` — see page.tsx). Since that shared video has no
 * darkening scrim of its own, the intro copy and each option both sit on a
 * navy/60 translucent panel so text stays legible against any frame of the
 * video, rather than relying on the video's own brightness. Uses plain
 * `Link`s with only CSS hover/focus states (no click-to-select scripting)
 * — every option is reachable and operable by keyboard, and each navigates
 * to a distinct route rather than toggling a shared selection state; the
 * site-wide scroll-entrance system wrapping them below only times their
 * one-time appearance and does not add any interaction behaviour.
 */
export function NeedSelectorSection({ transparent = false }: NeedSelectorSectionProps) {
  return (
    <Section tone="dark" gutter="always" className={transparent ? "bg-transparent" : undefined}>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="rounded-md border border-white/15 bg-navy/60 p-6 backdrop-blur-sm sm:p-8 lg:col-span-5">
          <RevealHeading>
            <SectionHeading
              kicker="Start here"
              title="What do you need from Apex HR?"
              description={needSelectorIntro.description}
              tone="dark"
              size="h1"
            />
          </RevealHeading>
          <FadeUp delay={0.15}>
            <Link
              href={needSelectorIntro.adviserCta.href}
              data-analytics-id={needSelectorIntro.adviserCta.analyticsId}
              className="mt-8 inline-flex items-center gap-3 text-body font-semibold text-white hover:underline underline-offset-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-gold">
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
              </span>
              {needSelectorIntro.adviserCta.label}
            </Link>
            <Link
              href={needSelectorIntro.exploreCta.href}
              data-analytics-id={needSelectorIntro.exploreCta.analyticsId}
              className="mt-3 block text-small font-semibold text-white/70 hover:text-white hover:underline underline-offset-4"
            >
              {needSelectorIntro.exploreCta.label}
            </Link>
          </FadeUp>
        </div>

        <StaggerContainer className="lg:col-span-7">
          <ul className="grid grid-cols-1 gap-3">
            {employerNeeds.map((need, index) => (
              <StaggerItem key={need.id} as="li">
                <Link
                  href={need.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border border-white/20 bg-navy/60 p-5 backdrop-blur-md transition-all duration-(--duration-fast) sm:hover:-translate-x-2 hover:border-cream hover:bg-cream focus-visible:border-cream focus-visible:bg-cream sm:focus-visible:-translate-x-2"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-gold/20 font-display text-body-lg font-bold text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-h4 font-bold text-white group-hover:text-navy">
                      {need.label}
                    </span>
                    <span className="mt-1.5 block text-body text-white/80 group-hover:text-navy/70">
                      {need.description}
                    </span>
                    <span className="mt-2.5 block text-caption font-semibold uppercase tracking-[0.08em] text-gold">
                      {need.serviceLabel}
                    </span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 text-white transition-all duration-(--duration-fast) group-hover:-rotate-45 group-hover:bg-gold group-hover:text-navy">
                    <ArrowRight aria-hidden="true" className="h-5 w-5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </ul>
        </StaggerContainer>
      </div>
    </Section>
  );
}

import { Combine, ClipboardCheck, Handshake, UsersRound } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionKicker } from "@/components/ui/section-kicker";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { AnimatedStatValue } from "@/components/content/animated-stat-value";
import { trust } from "@/content/home";
import type { TrustPillarIcon } from "@/content/home";

const pillarIcons: Record<TrustPillarIcon, typeof Combine> = {
  connected: Combine,
  practical: ClipboardCheck,
  partnership: Handshake,
};

/**
 * Trust and credibility section per DESIGN.md 17.2 and CLAUDE.md section 11,
 * structured as a "proof-led split" (approved reference layout): a cream
 * story column (kicker, heading, capability pillars) beside a dark
 * navy "proof panel" bento grid — the `trust.stats` PLACEHOLDER figures
 * (see the doc comment on `TrustContent` in src/content/home.ts) plus one
 * non-quantified "approach" tile, requested only as a visual layout
 * reference. These must be replaced with real, evidenced numbers before
 * this section ships to production. The reference's alternative "editorial
 * band" concept was not built — a production page ships one layout, not a
 * design-exploration tab switcher. Uses the default `gutter="auto"` (no
 * side margin from `sm` up) rather than `gutter="always"`, per later
 * explicit user instruction removing this section's side gutter.
 */
export function TrustSection() {
  const featuredStat = trust.stats.find((stat) => stat.id === "retention");
  const otherStats = trust.stats.filter((stat) => stat.id !== "retention");

  return (
    <Section tone="card">
      <div className="overflow-hidden rounded-md shadow-(--shadow-modal) lg:grid lg:grid-cols-[1fr_0.95fr]">
        <div className="flex flex-col justify-center gap-8 bg-cream p-8 sm:p-10 lg:p-14">
          <div>
            <RevealHeading>
              <SectionKicker tone="light">{trust.kicker}</SectionKicker>
              <h2 className="mt-4 max-w-xl font-display text-h1 font-bold text-navy">{trust.heading}</h2>
            </RevealHeading>
            <FadeUp delay={0.15}>
              <p className="mt-4 max-w-lg text-body-lg text-text-secondary">{trust.description}</p>
            </FadeUp>
          </div>

          <StaggerContainer className="grid gap-6">
            {trust.capabilityStatements.map((item) => {
              const Icon = pillarIcons[item.icon];
              return (
                <StaggerItem key={item.id} className="grid grid-cols-[auto_1fr] items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-gold/20 text-gold-ink">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-body-lg font-bold text-navy">{item.title}</h3>
                    <p className="mt-1 text-body text-text-secondary">{item.detail}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        <div className="bg-cream p-3 sm:p-4 lg:p-6">
          <StaggerContainer className="grid h-full grid-cols-2 gap-px overflow-hidden rounded-md border border-white/15 bg-white/15">
            {featuredStat && (
              <StaggerItem mode="scale" className="col-span-2 flex flex-col justify-between gap-6 bg-navy p-6 sm:p-8">
                <span className="text-caption font-semibold uppercase tracking-[0.08em] text-white/60">
                  {featuredStat.category ?? featuredStat.label}
                </span>
                <div>
                  <p className="font-display text-display-xl font-bold text-white">
                    <AnimatedStatValue value={featuredStat.value} />
                    <span className="text-gold">{featuredStat.suffix}</span>
                  </p>
                  {featuredStat.note && (
                    <p className="mt-3 max-w-[32ch] text-body text-white/75">{featuredStat.note}</p>
                  )}
                </div>
              </StaggerItem>
            )}

            {otherStats.map((stat) => (
              <StaggerItem key={stat.id} mode="scale" className="flex flex-col justify-between gap-5 bg-navy p-6 sm:p-8">
                <span className="text-caption font-semibold uppercase tracking-[0.08em] text-white/60">
                  {stat.category ?? stat.label}
                </span>
                <div>
                  <p className="font-display text-h1 font-bold text-white">
                    <AnimatedStatValue value={stat.value} />
                    <span className="text-gold">{stat.suffix}</span>
                  </p>
                  <p className="mt-2 text-body text-white/75">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}

            <StaggerItem mode="scale" className="flex flex-col justify-between gap-5 bg-navy p-6 sm:p-8">
              <span className="text-caption font-semibold uppercase tracking-[0.08em] text-white/60">
                {trust.approachHighlight.category}
              </span>
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-md bg-white/10 text-gold">
                  <UsersRound aria-hidden="true" className="h-6 w-6" />
                </span>
                <p className="mt-3 max-w-[28ch] text-body text-white/75">{trust.approachHighlight.note}</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </Section>
  );
}

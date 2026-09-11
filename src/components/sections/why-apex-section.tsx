import Image from "next/image";
import { Section } from "@/components/layout/section";
import { SectionKicker } from "@/components/ui/section-kicker";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { SlideInRight } from "@/components/motion/slide-in";
import { ScaleReveal } from "@/components/motion/scale-reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { valuePropositions, trust } from "@/content/home";

/**
 * Why Apex section per DESIGN.md 17.6: an editorial numbered-reasons list
 * beside a portrait image with an overlapping stat card, inspired by the
 * layout pattern in the reference screenshot — but with original Apex HR
 * copy (see valuePropositions in src/content/home.ts), not the reference
 * company's own text. The stat card reuses trust.stats' retention entry
 * rather than introducing a new number, so it stays consistent with the
 * one unverified placeholder statistic already flagged for stakeholder
 * approval elsewhere on the homepage (see TrustContent.stats).
 */
export function WhyApexSection() {
  const retentionStat = trust.stats.find((stat) => stat.id === "retention");

  return (
    <Section tone="page" gutter="always">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-7">
          <RevealHeading>
            <SectionKicker>Why Apex HR</SectionKicker>
            <h2 className="mt-4 max-w-xl font-display text-h1 font-bold text-navy">
              Six reasons growing employers choose Apex HR
            </h2>
          </RevealHeading>
          <StaggerContainer>
            <ol className="mt-10 list-none space-y-10">
              {valuePropositions.map((item, index) => (
                <StaggerItem key={item.id} className="flex gap-6">
                  <span aria-hidden="true" className="font-display text-h2 font-bold text-navy/15">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-h4 font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 max-w-[45ch] text-body text-text-secondary">{item.detail}</p>
                  </div>
                </StaggerItem>
              ))}
            </ol>
          </StaggerContainer>
        </div>

        <div className="relative lg:col-span-5">
          <SlideInRight className="relative aspect-4/5 w-full overflow-hidden rounded-md bg-surface-warm">
            <Image
              src="/images/why-apex-section.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </SlideInRight>
          {retentionStat && (
            <ScaleReveal
              delay={0.3}
              className="absolute right-4 bottom-4 w-[calc(100%-2rem)] max-w-72 rounded-md bg-surface-card p-6 shadow-(--shadow-modal) sm:right-6 sm:bottom-6 sm:w-72 lg:-right-6 lg:-bottom-6 lg:w-72"
            >
              <p className="font-display text-h3 font-bold text-success">
                {retentionStat.value}
                <span>{retentionStat.suffix}</span>
              </p>
              <p className="mt-2 text-body text-text-secondary">{retentionStat.label}</p>
            </ScaleReveal>
          )}
        </div>
      </div>
    </Section>
  );
}

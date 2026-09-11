import { Section } from "@/components/layout/section";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { SectorMarqueeRow } from "@/components/content/sector-marquee-row";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { ScaleReveal } from "@/components/motion/scale-reveal";
import { featuredSectors } from "@/content/home";
import { routes } from "@/config/routes";

// Split the featured sectors across the two marquee rows.
const midpoint = Math.ceil(featuredSectors.length / 2);
const topRowSectors = featuredSectors.slice(0, midpoint);
const bottomRowSectors = featuredSectors.slice(midpoint);

/** Sectors section per DESIGN.md 17.6, with two opposite-direction sliders. */
export function SectorOverviewSection() {
  return (
    <Section tone="warm" gutter="always">
      <RevealHeading className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionKicker>Sectors we serve</SectionKicker>
          <h2 className="mt-4 max-w-2xl font-display text-h2 font-bold text-navy">
            Industry-specific expertise, applied to your business
          </h2>
        </div>
        <LinkButton href={routes.sectors.path} variant="tertiary" surface="light">
          View all sectors
        </LinkButton>
      </RevealHeading>
      <ScaleReveal delay={0.15} className="mt-10 space-y-4">
        <SectorMarqueeRow sectors={topRowSectors} direction="left" />
        <SectorMarqueeRow sectors={bottomRowSectors} direction="right" />
      </ScaleReveal>
    </Section>
  );
}

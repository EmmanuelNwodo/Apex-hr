import { Section } from "@/components/layout/section";
import { SectionKicker } from "@/components/ui/section-kicker";
import { PartnerLogoMarqueeRow } from "@/components/content/partner-logo-marquee-row";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { ScaleReveal } from "@/components/motion/scale-reveal";
import { partnerBrands } from "@/content/home";

/**
 * Partner/client logo marquee, per DESIGN.md section 22 "Logo marquee" and
 * CLAUDE.md section 11 (client logos as verified trust proof). A single row
 * sliding all brand logos, using the brand logo files supplied in
 * public/images/partner-brands, with no card/white tile behind each logo.
 */
export function PartnerBrandsSection() {
  return (
    <Section tone="page" gutter="always">
      <RevealHeading>
        <SectionKicker>Trusted by</SectionKicker>
      </RevealHeading>
      <ScaleReveal delay={0.15} className="mt-10">
        <PartnerLogoMarqueeRow brands={partnerBrands} direction="left" />
      </ScaleReveal>
    </Section>
  );
}

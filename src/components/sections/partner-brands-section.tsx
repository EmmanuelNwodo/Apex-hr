import { Section } from "@/components/layout/section";
import { SectionKicker } from "@/components/ui/section-kicker";
import { PartnerLogoMarqueeRow } from "@/components/content/partner-logo-marquee-row";
import { partnerBrands } from "@/content/home";

// Split the partner brands across the two marquee rows.
const midpoint = Math.ceil(partnerBrands.length / 2);
const topRowBrands = partnerBrands.slice(0, midpoint);
const bottomRowBrands = partnerBrands.slice(midpoint);

/**
 * Partner/client logo marquee, per DESIGN.md section 22 "Logo marquee" and
 * CLAUDE.md section 11 (client logos as verified trust proof). Two rows
 * sliding in opposite directions, using the brand logo files supplied in
 * public/images/partner-brands.
 */
export function PartnerBrandsSection() {
  return (
    <Section tone="page">
      <SectionKicker>Trusted by</SectionKicker>
      <h2 className="mt-4 max-w-2xl font-display text-h2 font-bold text-navy">
        Brands Apex HR has worked with
      </h2>
      <div className="mt-10 space-y-4">
        <PartnerLogoMarqueeRow brands={topRowBrands} direction="left" />
        <PartnerLogoMarqueeRow brands={bottomRowBrands} direction="right" />
      </div>
    </Section>
  );
}

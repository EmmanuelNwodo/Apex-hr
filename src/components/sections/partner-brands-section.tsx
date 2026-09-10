import { Section } from "@/components/layout/section";
import { SectionKicker } from "@/components/ui/section-kicker";
import { PartnerLogoMarqueeRow } from "@/components/content/partner-logo-marquee-row";
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
      <SectionKicker>Trusted by</SectionKicker>
      <div className="mt-10">
        <PartnerLogoMarqueeRow brands={partnerBrands} direction="left" />
      </div>
    </Section>
  );
}

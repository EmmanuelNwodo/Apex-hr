import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustSection } from "@/components/sections/trust-section";
import { PartnerBrandsSection } from "@/components/sections/partner-brands-section";
import { NeedSelectorSection } from "@/components/sections/need-selector-section";
import { EmployerProblemsSection } from "@/components/sections/employer-problems-section";
import { SectionVideoBackground } from "@/components/motion/section-video-background";
import { ServicesOverviewSection } from "@/components/sections/services-overview-section";
import { RecruitmentSpotlightSection } from "@/components/sections/recruitment-spotlight-section";
import { WhyApexSection } from "@/components/sections/why-apex-section";
import { SectorOverviewSection } from "@/components/sections/sector-overview-section";
import { ProcessSection } from "@/components/sections/process-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { ExpertsSection } from "@/components/sections/experts-section";
import { CandidateGatewaySection } from "@/components/sections/candidate-gateway-section";
import { InsightsSection } from "@/components/sections/insights-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { buildMetadata } from "@/lib/seo/metadata";
import { getOrganizationJsonLd, getWebsiteJsonLd } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";

// The homepage shares the root layout's own segment, so the layout's
// title.template (which only applies to *child* segments) does not apply
// here — the full title is set explicitly instead of via routes.home.label.
export const metadata: Metadata = buildMetadata({
  title: siteConfig.defaultTitle,
  path: routes.home.path,
  index: routes.home.readyToIndex,
});

/**
 * Employer-first homepage, ordered per CLAUDE.md section 11 and
 * docs/CONTENT-MODEL.md section 8.4. Hero and trust are the most developed
 * sections; later sections carry restrained placeholders pending approved
 * content — see each section component for specifics.
 */
export default function HomePage() {
  const jsonLd = [getOrganizationJsonLd(), getWebsiteJsonLd()];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <TrustSection />
      <PartnerBrandsSection />
      <div className="relative isolate overflow-hidden">
        <SectionVideoBackground src="/videos/apex-hr-needs-selector-section-background-cropped.mp4" />
        <NeedSelectorSection transparent />
        <EmployerProblemsSection transparent />
      </div>
      <ServicesOverviewSection />
      <RecruitmentSpotlightSection />
      <WhyApexSection />
      <SectorOverviewSection />
      <ProcessSection />
      <CaseStudiesSection />
      <ExpertsSection />
      <CandidateGatewaySection />
      <InsightsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}

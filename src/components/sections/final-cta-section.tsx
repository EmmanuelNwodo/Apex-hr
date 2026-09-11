import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/link-button";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { finalCta } from "@/content/home";

/**
 * Final employer conversion band per DESIGN.md 17.10. The heading rises in
 * first; the description and CTA button rise in just after (FadeUp's
 * delay), matching the site's "content follows the CTA band's own
 * background/heading" sequencing for closing CTAs.
 */
export function FinalCtaSection() {
  return (
    <Section tone="dark" gutter="always" className="text-center">
      <RevealHeading>
        <h2 className="mx-auto max-w-2xl font-display text-h2 font-bold text-white">
          {finalCta.heading}
        </h2>
      </RevealHeading>
      <FadeUp delay={0.2}>
        <p className="mx-auto mt-4 max-w-[50ch] text-body-lg text-white/80">
          {finalCta.description}
        </p>
        <LinkButton
          href={finalCta.primaryCta.href}
          variant="primary"
          surface="dark"
          className="mt-8"
          data-analytics-id={finalCta.primaryCta.analyticsId}
        >
          {finalCta.primaryCta.label}
        </LinkButton>
      </FadeUp>
    </Section>
  );
}

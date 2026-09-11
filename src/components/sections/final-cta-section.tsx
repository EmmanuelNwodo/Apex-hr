import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/link-button";
import { Reveal } from "@/components/motion/reveal";
import { finalCta } from "@/content/home";

/** Final employer conversion band per DESIGN.md 17.10. */
export function FinalCtaSection() {
  return (
    <Section tone="dark" gutter="always" className="text-center">
      <Reveal>
        <h2 className="mx-auto max-w-2xl font-display text-h2 font-bold text-white">
          {finalCta.heading}
        </h2>
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
      </Reveal>
    </Section>
  );
}

import { Section } from "@/components/layout/section";
import { SectionKicker } from "@/components/ui/section-kicker";
import { FaqWithContactForm } from "@/components/content/faq-with-contact-form";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { AnimatedSection } from "@/components/motion/animated-section";
import { employerFaqs } from "@/content/home";

/**
 * Employer FAQ section, paired with the same enquiry form used on the
 * Contact page (see FaqWithContactForm) — consistent with every other FAQ
 * section site-wide. The section's own scroll-entrance (kicker rise, body
 * fade+rise) is safe to add per the later site-wide "Layered Rise and
 * Reveal" instruction — DESIGN.md 15.4/17.10's requirement is that the FAQ
 * ACCORDION's own expand/collapse works without animation, which is
 * unaffected: FaqAccordion's internal open/close behaviour is untouched,
 * only the whole block's one-time entrance as it scrolls into view.
 * `employerFaqs` are genuine, homepage-specific questions (what outsourced
 * HR means, single-vacancy vs ongoing recruitment, UK/international scope,
 * how a Find Talent enquiry works) — FaqWithContactForm emits matching
 * FAQPage JSON-LD for them by default (SEO audit Batch 2 item 3), reviewed
 * and confirmed correct in the Phase 3 Batch 4 structured-data audit.
 */
export function FaqSection() {
  return (
    <Section tone="card" gutter="always">
      <RevealHeading>
        <SectionKicker>FAQs</SectionKicker>
      </RevealHeading>
      <AnimatedSection delay={0.1} className="mt-8">
        <FaqWithContactForm items={employerFaqs} />
      </AnimatedSection>
    </Section>
  );
}

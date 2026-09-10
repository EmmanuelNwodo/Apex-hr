import { Section } from "@/components/layout/section";
import { SectionKicker } from "@/components/ui/section-kicker";
import { FaqWithContactForm } from "@/components/content/faq-with-contact-form";
import { employerFaqs } from "@/content/home";

/**
 * Employer FAQ section, paired with the same enquiry form used on the
 * Contact page (see FaqWithContactForm) — consistent with every other FAQ
 * section site-wide. Deliberately not wrapped in scroll-reveal motion —
 * DESIGN.md 15.4/17.10 requires the FAQ accordion to work without
 * animation. `employerFaqs` are genuine, homepage-specific questions (what
 * outsourced HR means, single-vacancy vs ongoing recruitment, UK/international
 * scope, how a Find Talent enquiry works) — FaqWithContactForm emits matching
 * FAQPage JSON-LD for them by default (SEO audit Batch 2 item 3), reviewed
 * and confirmed correct in the Phase 3 Batch 4 structured-data audit.
 */
export function FaqSection() {
  return (
    <Section tone="card" gutter="always">
      <SectionKicker>FAQs</SectionKicker>
      <div className="mt-8">
        <FaqWithContactForm items={employerFaqs} />
      </div>
    </Section>
  );
}

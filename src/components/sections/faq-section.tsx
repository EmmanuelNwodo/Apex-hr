import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { employerFaqs } from "@/content/home";

/**
 * Employer FAQ section. Deliberately not wrapped in scroll-reveal motion —
 * DESIGN.md 15.4/17.10 requires the FAQ accordion to work without
 * animation. FAQPage structured data is intentionally not added here: the
 * questions/answers below are draft copy pending stakeholder approval, not
 * yet genuine, eligible content per CLAUDE.md section 16.
 */
export function FaqSection() {
  return (
    <Section tone="card" containerSize="reading">
      <SectionHeading kicker="FAQs" title="Employer questions, answered" />
      <div className="mt-8">
        <FaqAccordion items={employerFaqs} />
      </div>
    </Section>
  );
}

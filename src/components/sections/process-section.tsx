import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessStep } from "@/components/content/process-step";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { processSteps } from "@/content/home";

/**
 * How Apex works, per CLAUDE.md section 11 and DESIGN.md 17.7. Presented as
 * a normal grid sequence — the sticky scroll-linked narrative described in
 * DESIGN.md is deferred to a later motion pass; every step remains
 * understandable with animation disabled.
 */
export function ProcessSection() {
  return (
    <Section tone="dark" gutter="always">
      <RevealHeading>
        <SectionHeading
          kicker="How Apex works"
          title="A clear, five-step delivery approach"
          tone="dark"
          size="h1"
        />
      </RevealHeading>
      <StaggerContainer>
        <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((item) => (
            <StaggerItem
              key={item.id}
              as="li"
              className="border-t border-white/20 pt-5 transition-transform duration-(--duration-fast) ease-(--ease-standard) hover:-translate-y-1 focus-within:-translate-y-1"
            >
              <ProcessStep item={item} />
            </StaggerItem>
          ))}
        </ol>
      </StaggerContainer>
    </Section>
  );
}

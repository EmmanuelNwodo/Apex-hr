import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessStep } from "@/components/content/process-step";
import { Reveal } from "@/components/motion/reveal";
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
      <SectionHeading
        kicker="How Apex works"
        title="A clear, five-step delivery approach"
        tone="dark"
        size="h1"
      />
      <Reveal>
        <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((item) => (
            <ProcessStep key={item.id} item={item} />
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}

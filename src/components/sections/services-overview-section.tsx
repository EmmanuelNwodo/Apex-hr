import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/link-button";
import { ServiceMarqueeRow } from "@/components/content/service-marquee-row";
import { Reveal } from "@/components/motion/reveal";
import { featuredServiceGroups } from "@/content/home";
import { routes } from "@/config/routes";

// Split the featured services across the two marquee rows.
const midpoint = Math.ceil(featuredServiceGroups.length / 2);
const topRowServices = featuredServiceGroups.slice(0, midpoint);
const bottomRowServices = featuredServiceGroups.slice(midpoint);

/** Services overview section per DESIGN.md 17.5, with two opposite-direction sliders. */
export function ServicesOverviewSection() {
  return (
    <Section tone="card">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading kicker="HR services" title="Support across the full HR lifecycle" />
        <LinkButton href={routes.services.path} variant="tertiary" surface="light">
          View all services
        </LinkButton>
      </div>

      <Reveal className="mt-10 space-y-4">
        <ServiceMarqueeRow services={topRowServices} direction="left" />
        <ServiceMarqueeRow services={bottomRowServices} direction="right" />
      </Reveal>
    </Section>
  );
}

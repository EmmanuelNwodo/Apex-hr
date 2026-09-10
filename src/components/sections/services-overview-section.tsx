import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/link-button";
import { ServiceMarqueeRow } from "@/components/content/service-marquee-row";
import { Reveal } from "@/components/motion/reveal";
import { featuredServiceGroups } from "@/content/home";
import { routes } from "@/config/routes";

/** Services overview section per DESIGN.md 17.5, with a single sliding row. */
export function ServicesOverviewSection() {
  return (
    <Section tone="card" gutter="always">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading kicker="HR services" title="Support across the full HR lifecycle" />
        <LinkButton href={routes.services.path} variant="tertiary" surface="light">
          View all services
        </LinkButton>
      </div>

      <Reveal className="mt-10">
        <ServiceMarqueeRow services={featuredServiceGroups} direction="left" />
      </Reveal>
    </Section>
  );
}

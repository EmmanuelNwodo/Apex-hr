import { ServiceCard } from "@/components/content/service-card";
import type { FeaturedServiceGroup } from "@/content/home";

interface ServiceMarqueeRowProps {
  services: FeaturedServiceGroup[];
  direction: "left" | "right";
}

/**
 * Infinite horizontal slider for one service-card row, mirroring
 * SectorMarqueeRow's approach: the service list renders twice back-to-back
 * so the CSS animation (globals.css) can translate the track by exactly
 * one set's width (-50%) and loop seamlessly. The second, duplicate set is
 * `inert` + `aria-hidden` so keyboard and screen-reader users only ever
 * reach each service link once; `prefers-reduced-motion` is handled
 * globally (globals.css caps animation-duration/iteration-count for every
 * element), so this component needs no separate reduced-motion branch.
 */
export function ServiceMarqueeRow({ services, direction }: ServiceMarqueeRowProps) {
  return (
    <div className="overflow-hidden">
      <div
        className={
          direction === "left"
            ? "flex w-max items-stretch gap-4 marquee-left"
            : "flex w-max items-stretch gap-4 marquee-right"
        }
      >
        {[services, services].map((set, setIndex) => (
          <div
            key={setIndex}
            aria-hidden={setIndex === 1 || undefined}
            inert={setIndex === 1 || undefined}
            className="flex shrink-0 items-stretch gap-4"
          >
            {set.map((service) => (
              <div key={service.slug} className="w-72 shrink-0 sm:w-80 lg:w-96">
                <ServiceCard
                  title={service.title}
                  href={service.href}
                  description={service.description}
                  imageSrc={service.imageSrc}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import { SectorCard } from "@/components/content/sector-card";
import type { FeaturedSector } from "@/content/home";

interface SectorMarqueeRowProps {
  sectors: FeaturedSector[];
  direction: "left" | "right";
}

/**
 * Infinite horizontal slider for one sector-image row. The sector list
 * renders twice back-to-back so the CSS animation (globals.css) can
 * translate the track by exactly one set's width (-50%) and loop
 * seamlessly. The second, duplicate set is `inert` + `aria-hidden` so
 * keyboard and screen-reader users only ever reach each sector link once;
 * `prefers-reduced-motion` is handled globally (globals.css caps
 * animation-duration/iteration-count for every element), so this
 * component needs no separate reduced-motion branch.
 */
export function SectorMarqueeRow({ sectors, direction }: SectorMarqueeRowProps) {
  return (
    <div className="overflow-hidden">
      <div
        className={
          direction === "left"
            ? "flex w-max gap-4 marquee-left"
            : "flex w-max gap-4 marquee-right"
        }
      >
        {[sectors, sectors].map((set, setIndex) => (
          <div
            key={setIndex}
            aria-hidden={setIndex === 1 || undefined}
            inert={setIndex === 1 || undefined}
            className="flex shrink-0 gap-4"
          >
            {set.map((sector) => (
              <div key={sector.slug} className="w-40 shrink-0 sm:w-48 md:w-56 lg:w-64">
                <SectorCard title={sector.title} href={sector.href} imageSrc={sector.imageSrc} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import Image from "next/image";
import type { PartnerBrand } from "@/content/home";

interface PartnerLogoMarqueeRowProps {
  brands: PartnerBrand[];
  direction: "left" | "right";
}

/**
 * Infinite horizontal slider for one partner-logo row, per DESIGN.md
 * section 22 "Logo marquee": the brand list renders twice back-to-back so
 * the CSS animation (globals.css) can translate the track by exactly one
 * set's width (-50%) and loop seamlessly, but the second, duplicate set is
 * `inert` + `aria-hidden` so screen readers receive one logical list, not
 * two. Each logo keeps its brand name as real `alt` text (an accessible
 * label), rather than the empty `alt` used for decorative photo tiles
 * elsewhere, since the logo is the only content in each tile. Logos render
 * at full colour and opacity (not desaturated) so each brand's own colour
 * stays clearly visible. Movement pauses on hover
 * (`.marquee-left`/`.marquee-right:hover` in globals.css) and stops
 * entirely under `prefers-reduced-motion` (handled globally).
 */
export function PartnerLogoMarqueeRow({ brands, direction }: PartnerLogoMarqueeRowProps) {
  return (
    <div className="overflow-hidden">
      <div
        className={
          direction === "left" ? "flex w-max items-stretch gap-4 marquee-left" : "flex w-max items-stretch gap-4 marquee-right"
        }
      >
        {[brands, brands].map((set, setIndex) => (
          <div
            key={setIndex}
            aria-hidden={setIndex === 1 || undefined}
            inert={setIndex === 1 || undefined}
            className="flex shrink-0 items-stretch gap-4"
          >
            {set.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex h-28 w-48 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-surface-card p-6 shadow-sm transition-transform duration-(--duration-fast) hover:scale-105 sm:h-32 sm:w-56"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={brand.imageSrc}
                    alt={brand.name}
                    fill
                    sizes="224px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

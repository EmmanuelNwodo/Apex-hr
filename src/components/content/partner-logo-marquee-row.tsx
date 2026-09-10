import Image from "next/image";
import type { PartnerBrand } from "@/content/home";

interface PartnerLogoMarqueeRowProps {
  brands: PartnerBrand[];
  direction: "left" | "right";
}

/**
 * Infinite horizontal slider for the partner-logo row, per DESIGN.md
 * section 22 "Logo marquee": the brand list renders twice back-to-back so
 * the CSS animation (globals.css) can translate the track by exactly one
 * set's width (-50%) and loop seamlessly, but the second, duplicate set is
 * `inert` + `aria-hidden` so screen readers receive one logical list, not
 * two. Each logo keeps its brand name as real `alt` text (an accessible
 * label), rather than the empty `alt` used for decorative photo tiles
 * elsewhere, since the logo is the only content in each tile. Logos render
 * directly on the section's own background (no card/border/white tile
 * behind each one) at full colour and opacity (not desaturated) so each
 * brand's own colour stays clearly visible. Movement pauses on hover
 * (`.marquee-left`/`.marquee-right:hover` in globals.css) and stops
 * entirely under `prefers-reduced-motion` (handled globally).
 */
export function PartnerLogoMarqueeRow({ brands, direction }: PartnerLogoMarqueeRowProps) {
  return (
    <div className="overflow-hidden">
      <div
        className={
          direction === "left" ? "flex w-max items-stretch gap-6 marquee-left" : "flex w-max items-stretch gap-6 marquee-right"
        }
      >
        {[brands, brands].map((set, setIndex) => (
          <div
            key={setIndex}
            aria-hidden={setIndex === 1 || undefined}
            inert={setIndex === 1 || undefined}
            className="flex shrink-0 items-stretch gap-6"
          >
            {set.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="relative h-24 w-56 shrink-0 transition-transform duration-(--duration-fast) hover:scale-105 sm:h-28 sm:w-64"
              >
                <Image
                  src={brand.imageSrc}
                  alt={brand.name}
                  fill
                  sizes="256px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sectors } from "@/config/sectors";
import { sectorContent } from "@/content/sectors-data";
import { sectorIcons } from "@/lib/sector-icons";
import { cn } from "@/lib/utils";

type FilterKey = "all" | "business" | "health" | "built" | "people" | "operations";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All sectors" },
  { key: "business", label: "Business & technology" },
  { key: "health", label: "Health & science" },
  { key: "built", label: "Built environment" },
  { key: "people", label: "Public & people" },
  { key: "operations", label: "Operations" },
];

const SECTOR_CATEGORIES: Record<string, FilterKey> = {
  "startups-scale-ups": "business",
  "professional-services": "business",
  "health-care": "health",
  "life-sciences": "health",
  technology: "business",
  "financial-services": "business",
  accountants: "business",
  architects: "built",
  "care-homes": "health",
  charity: "people",
  construction: "built",
  distribution: "operations",
  education: "people",
  engineers: "built",
  leisure: "people",
  manufacturers: "operations",
  hospitality: "operations",
};

// The two sectors given the larger "featured" treatment, per the approved
// reference layout — startups/scale-ups (wide) and healthcare (tall).
const FEATURED_WIDE_SLUG = "startups-scale-ups";
const FEATURED_TALL_SLUG = "health-care";

const orderedSectors = [
  ...sectors.filter((sector) => sector.slug === FEATURED_WIDE_SLUG),
  ...sectors.filter((sector) => sector.slug === FEATURED_TALL_SLUG),
  ...sectors.filter((sector) => sector.slug !== FEATURED_WIDE_SLUG && sector.slug !== FEATURED_TALL_SLUG),
];

/**
 * Filterable sector directory, per the approved reference layout: a
 * category filter row narrows a grid of sector cards (two given a larger
 * "featured" treatment), each linking to its real sector page. Filtering
 * toggles the native `hidden` attribute rather than unmounting — matching
 * the reference's own approach — which removes a hidden card from the
 * accessibility tree and tab order automatically, with no extra
 * `aria-hidden`/`inert` bookkeeping needed. The result count is
 * `aria-live` so assistive technology hears the updated total.
 */
export function SectorExplorer() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const visibleCount =
    activeFilter === "all"
      ? sectors.length
      : orderedSectors.filter((sector) => SECTOR_CATEGORIES[sector.slug] === activeFilter).length;

  return (
    <div>
      <div role="group" aria-label="Filter sectors" className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.key)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-small font-semibold transition-colors duration-(--duration-fast)",
                isActive ? "border-navy bg-navy text-white" : "border-border-subtle text-navy hover:border-navy",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 text-small text-text-secondary">
        {activeFilter === "all"
          ? `Showing all ${sectors.length} sectors`
          : `Showing ${visibleCount} matching sector${visibleCount === 1 ? "" : "s"}`}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orderedSectors.map((sector, index) => {
          const content = sectorContent.find((entry) => entry.slug === sector.slug);
          const Icon = sectorIcons[sector.slug];
          const isWide = sector.slug === FEATURED_WIDE_SLUG;
          const isTall = sector.slug === FEATURED_TALL_SLUG;
          const isFeatured = isWide || isTall;
          const isVisible = activeFilter === "all" || SECTOR_CATEGORIES[sector.slug] === activeFilter;

          return (
            <Link
              key={sector.slug}
              href={`/sector/${sector.slug}/`}
              hidden={!isVisible}
              className={cn(
                "group flex flex-col justify-between gap-6 rounded-md border p-6 transition-all duration-(--duration-fast)",
                isWide && "sm:col-span-2 border-transparent bg-navy text-white",
                isTall && "lg:row-span-2 border-transparent bg-slate text-white",
                !isFeatured && "border-border-subtle bg-surface-card text-navy hover:-translate-y-1 hover:border-gold",
              )}
            >
              <div className="flex items-center justify-between">
                {Icon && (
                  <span
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-full",
                      isFeatured ? "bg-white/15 text-gold" : "bg-success/10 text-success",
                    )}
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                )}
                <span
                  className={cn(
                    "font-display text-small",
                    isFeatured ? "text-white/60" : "text-text-secondary",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <h3
                  className={cn(
                    "font-display font-bold",
                    isWide ? "text-h1" : "text-h4",
                    isFeatured ? "text-white" : "text-navy",
                  )}
                >
                  {sector.title}
                </h3>
                {content && (
                  <p className={cn("mt-2 text-body", isFeatured ? "text-white/70" : "text-text-secondary")}>
                    {content.overview}
                  </p>
                )}
              </div>

              <span
                className={cn(
                  "inline-flex items-center gap-2 text-caption font-bold uppercase tracking-[0.08em]",
                  isFeatured ? "text-white" : "text-navy",
                )}
              >
                Explore sector
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

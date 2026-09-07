"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { ServiceItem } from "@/config/services";
import { serviceContent } from "@/content/services-data";
import { serviceCategoryIcons } from "@/lib/service-category-icons";
import { cn } from "@/lib/utils";

interface SectorServiceExplorerProps {
  services: ServiceItem[];
}

/**
 * "How Apex HR can help" priority picker for a sector page, per the
 * approved reference layout — but keyed by that sector's own
 * `relatedServiceSlugs` (already curated per sector in sectors-data.ts)
 * rather than the reference's bespoke Hire/Reward/Govern groupings, which
 * only existed for the one example sector (Financial Services) the
 * reference was built from. Each priority is a genuine related service,
 * showing its real `heroSummary` and `whatItIncludes` and linking to its
 * real page — nothing invented per sector. A client component because
 * selecting a priority updates visible content without a page
 * navigation; each priority is a native `button` (keyboard-operable by
 * default) and the detail panel is `aria-live` so assistive technology
 * announces the update.
 */
export function SectorServiceExplorer({ services }: SectorServiceExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  const activeContent = serviceContent.find((entry) => entry.slug === activeService.slug);
  const Icon = serviceCategoryIcons[activeService.categorySlug];

  return (
    <div className="grid overflow-hidden rounded-md border border-border-subtle lg:grid-cols-[minmax(230px,0.7fr)_minmax(0,1.3fr)]">
      <div className="flex flex-col border-b border-border-subtle bg-navy lg:border-b-0 lg:border-r lg:border-white/15">
        {services.map((service, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={service.slug}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-white/10 px-5 py-4 text-left transition-colors duration-(--duration-fast) last:border-b-0",
                isActive ? "bg-gold/15 text-white" : "text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              <span className="font-display text-small text-gold">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-body font-semibold leading-snug">{service.title}</span>
              <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </button>
          );
        })}
      </div>

      <div className="flex flex-col justify-between gap-8 bg-surface-card p-8 sm:p-10 lg:p-12" aria-live="polite">
        <div>
          {Icon && (
            <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-gold-ink">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
          )}
          <h3 className="mt-8 max-w-xl font-display text-h3 font-bold text-navy">{activeService.title}</h3>
          {activeContent && (
            <p className="mt-3 max-w-xl text-body text-text-secondary">{activeContent.heroSummary}</p>
          )}
          {activeContent && (
            <div className="mt-8 flex flex-wrap gap-2">
              {activeContent.whatItIncludes.slice(0, 4).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border-subtle bg-surface-page px-3 py-2 text-caption text-navy"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
        <Link
          href={`/services/${activeService.slug}/`}
          className="group inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold-ink"
        >
          Explore this service
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </div>
  );
}

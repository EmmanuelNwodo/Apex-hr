"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { ServiceItem } from "@/config/services";
import { serviceContent } from "@/content/services-data";
import { serviceCategoryIcons } from "@/lib/service-category-icons";
import { cn } from "@/lib/utils";

interface CategoryServiceExplorerProps {
  categorySlug: string;
  services: ServiceItem[];
}

/**
 * Interactive service picker scoped to one service family, per the
 * approved reference layout: selecting a service in the left list swaps
 * the detail shown on the right. Reuses real per-service content already
 * authored in services-data.ts. A client component because selecting a
 * service updates visible content without a page navigation; each service
 * is a native `button` (keyboard-operable by default) and the detail panel
 * is `aria-live` so assistive technology announces the update.
 *
 * SEO audit Phase 3 Batch 5 corrective pass: deliberately shows
 * `employerChallenge` (the problem this service addresses) rather than
 * `heroSummary` (already shown, per service, in
 * ServiceCategoryTemplate's server-rendered child-service grid) — the two
 * views are meant to answer different questions ("what is it" in the
 * grid vs. "what problem does it solve" here), not repeat the same
 * sentence for whichever service happens to be selected.
 */
export function CategoryServiceExplorer({ categorySlug, services }: CategoryServiceExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  const activeContent = serviceContent.find((entry) => entry.slug === activeService.slug);
  const Icon = serviceCategoryIcons[categorySlug];

  return (
    <div className="grid overflow-hidden rounded-md border border-white/15 lg:grid-cols-[minmax(250px,0.76fr)_minmax(0,1.24fr)]">
      <div className="flex flex-col border-b border-white/15 lg:border-b-0 lg:border-r">
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

      <div className="flex flex-col justify-between gap-8 bg-white/5 p-8 sm:p-10 lg:p-12" aria-live="polite">
        <div>
          {Icon && (
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-gold">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
          )}
          <h3 className="mt-8 max-w-xl font-display text-h3 font-bold text-white">{activeService.title}</h3>
          {activeContent && (
            <>
              <p className="mt-3 text-caption font-bold uppercase tracking-widest text-gold">The challenge</p>
              <p className="mt-2 max-w-xl text-body text-white/70">{activeContent.employerChallenge}</p>
            </>
          )}
          {activeContent && (
            <div className="mt-8 flex flex-wrap gap-2">
              {activeContent.whatItIncludes.slice(0, 4).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-caption text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
        <Link
          href={`/services/${activeService.slug}/`}
          className="group inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-[0.08em] text-gold"
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

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgePoundSterling,
  ChartSpline,
  ChevronRight,
  Gauge,
  HeartHandshake,
  Presentation,
  Scale,
  Telescope,
  UserRoundSearch,
  UsersRound,
  Workflow,
} from "lucide-react";
import { getServicesByCategory, serviceCategories } from "@/config/services";
import { serviceCategoryContent } from "@/content/services-data";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, typeof UsersRound> = {
  "outsourced-hr-services": UsersRound,
  "recruitment-talent-acquisition": UserRoundSearch,
  "employment-law-and-employee-relations": Scale,
  "organisation-development-change-management": Workflow,
  "compensation-reward-and-benefits": BadgePoundSterling,
  "learning-and-leadership-development": Presentation,
  "performance-and-talent-management": Gauge,
  "employee-experience-and-engagement": HeartHandshake,
  "hr-technology-and-people-analytics": ChartSpline,
  "strategic-hr-and-workforce-advisory": Telescope,
};

/**
 * Interactive "service family" navigator for the services hub, per the
 * approved reference layout's recommended concept: selecting a family in
 * the left list swaps the icon, summary and child-service links shown on
 * the right. The reference's sub-services were decorative pills with no
 * destination — since every child service already has a real page
 * (src/config/services.ts), these render as genuine links instead, which
 * is a strict improvement, not a deviation. The alternative "editorial
 * cards" concept from that reference was not built — a production page
 * ships one layout, not a design-exploration tab switcher.
 *
 * A client component because selecting a family updates visible content
 * without a page navigation; each family is a native `button`
 * (keyboard-operable by default) and the detail panel is `aria-live` so
 * assistive technology announces the update.
 */
export function ServiceFamilyNavigator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = serviceCategories[activeIndex];
  const activeContent = serviceCategoryContent.find((entry) => entry.slug === activeCategory.slug);
  const activeServices = getServicesByCategory(activeCategory.slug);
  const ActiveIcon = categoryIcons[activeCategory.slug];

  return (
    <div className="grid overflow-hidden rounded-md border border-border-subtle lg:grid-cols-[minmax(280px,0.82fr)_minmax(360px,1.18fr)]">
      <div className="flex flex-col bg-navy">
        {serviceCategories.map((category, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={category.slug}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-white/10 px-5 py-4 text-left transition-colors duration-(--duration-fast) last:border-b-0",
                isActive ? "bg-gold text-navy" : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              <span className="font-display text-small">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-display text-body-lg font-semibold">{category.title}</span>
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </button>
          );
        })}
      </div>

      <div className="flex flex-col justify-center gap-5 bg-surface-card p-8 sm:p-10 lg:p-12" aria-live="polite">
        {ActiveIcon && (
          <span className="grid h-14 w-14 place-items-center rounded-md bg-gold/20 text-gold-ink">
            <ActiveIcon aria-hidden="true" className="h-6 w-6" />
          </span>
        )}
        <span className="text-caption font-semibold uppercase tracking-[0.08em] text-gold-ink">
          Service family
        </span>
        <h3 className="max-w-lg font-display text-h3 font-bold text-navy">{activeCategory.title}</h3>
        {activeContent && (
          <p className="max-w-[60ch] text-body text-text-secondary">{activeContent.summary}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {activeServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}/`}
              className="rounded-full border border-border-subtle bg-surface-page px-4 py-2 text-small text-navy underline-offset-4 hover:border-navy hover:underline"
            >
              {service.title}
            </Link>
          ))}
        </div>
        <Link
          href={`/services/${activeCategory.slug}/`}
          className="group inline-flex w-fit items-center gap-3 text-body font-semibold text-navy"
        >
          Explore this service family
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-navy transition-transform duration-(--duration-fast) group-hover:translate-x-1">
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getServicesByCategory, serviceCategories } from "@/config/services";
import { serviceCategoryContent } from "@/content/services-data";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

/**
 * Services mega-menu content. Only the 10 service families are shown by
 * default; hovering (or focusing) a family reveals its child services in
 * the panel to the right, so a visitor is never faced with all 48 services
 * at once. The right pane's width is reserved from the start (not
 * conditionally mounted) so revealing a family's services doesn't resize
 * the panel. A family's title always links to its real category page
 * (src/app/services/[slug]/page.tsx), and mouse/focus share the same
 * `setActiveSlug` handler so keyboard users reach the same reveal via Tab.
 */
export function ServicesMenuPanel() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeCategory = serviceCategories.find((category) => category.slug === activeSlug);
  const activeContent = activeCategory
    ? serviceCategoryContent.find((entry) => entry.slug === activeCategory.slug)
    : undefined;

  return (
    <div className="flex w-[min(90vw,44rem)]">
      <div className="flex w-60 shrink-0 flex-col border-r border-border-subtle pr-4">
        {serviceCategories.map((category) => {
          const isActive = category.slug === activeSlug;
          return (
            <Link
              key={category.slug}
              href={`/services/${category.slug}/`}
              onMouseEnter={() => setActiveSlug(category.slug)}
              onFocus={() => setActiveSlug(category.slug)}
              className={cn(
                "flex items-center justify-between gap-2 rounded-md px-3 py-2.5 text-small font-semibold text-navy underline-offset-4 transition-colors duration-(--duration-fast)",
                isActive ? "bg-surface-warm" : "hover:bg-surface-warm",
              )}
            >
              {category.title}
              <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-text-secondary" />
            </Link>
          );
        })}
        <Link
          href={routes.services.path}
          className="mt-3 border-t border-border-subtle px-3 pt-4 text-small font-semibold text-navy underline-offset-4 hover:underline"
        >
          View all services
        </Link>
      </div>

      <div className="flex-1 pl-6">
        {activeCategory ? (
          <div>
            <Link
              href={`/services/${activeCategory.slug}/`}
              className="text-small font-semibold text-navy underline-offset-4 hover:underline"
            >
              {activeCategory.title}
            </Link>
            {activeContent && <p className="mt-1 max-w-sm text-caption text-text-secondary">{activeContent.summary}</p>}
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
              {getServicesByCategory(activeCategory.slug).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="text-small text-text-secondary underline-offset-4 hover:text-navy hover:underline"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-small text-text-secondary">Hover a service family to see what&apos;s included.</p>
        )}
      </div>
    </div>
  );
}

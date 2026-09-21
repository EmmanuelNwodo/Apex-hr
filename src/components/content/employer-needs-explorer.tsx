"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { employerNeeds as needs } from "@/content/employer-needs";

/**
 * "Where to start" interactive picker for the For Employers page, per the
 * approved reference layout. The five needs and their groupings come from
 * the existing forEmployersPageContent "Where to start" list
 * (src/content/supporting-pages-data.ts); each need's tags link to real
 * service pages rather than the reference's plain decorative labels.
 * A client component because selecting a need updates visible content
 * without a page navigation; each need is a native `button`
 * (keyboard-operable by default) and the detail panel is `aria-live` so
 * assistive technology announces the update.
 */
export function EmployerNeedsExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = needs[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <div className="grid overflow-hidden rounded-md border border-border-subtle lg:grid-cols-[minmax(230px,0.7fr)_minmax(0,1.3fr)]">
      <div className="flex flex-col border-b border-border-subtle bg-navy lg:border-b-0 lg:border-r lg:border-white/15">
        {needs.map((need, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={need.title}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-white/10 px-5 py-4 text-left transition-colors duration-(--duration-fast) last:border-b-0",
                isActive ? "bg-gold/15 text-white" : "text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              <span className="font-display text-small text-gold">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-body font-semibold">{need.title}</span>
              <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </button>
          );
        })}
      </div>

      <div className="flex flex-col justify-between gap-8 bg-surface-card p-8 sm:p-10 lg:p-12" aria-live="polite">
        <div>
          <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-gold-ink">
            <ActiveIcon aria-hidden="true" className="h-6 w-6" />
          </span>
          <h3 className="mt-8 max-w-lg font-display text-h3 font-bold text-navy">{active.title}</h3>
          <p className="mt-3 max-w-lg text-body text-text-secondary">{active.detail}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {active.tags.map((tag) => (
              <Link
                key={tag.href}
                href={tag.href}
                className="rounded-full border border-border-subtle bg-surface-page px-3 py-2 text-caption text-navy underline-offset-4 hover:border-navy hover:underline"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
        <Link
          href={routes.contact.path}
          className="group inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold-ink"
        >
          Discuss this challenge
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </div>
  );
}

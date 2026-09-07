"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgePoundSterling, ChevronRight, Presentation, ShieldCheck, UserRoundSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionKicker } from "@/components/ui/section-kicker";
import type { EmployerProblem, EmployerProblemIcon } from "@/content/home";

const icons: Record<EmployerProblemIcon, typeof ShieldCheck> = {
  compliance: ShieldCheck,
  hiring: UserRoundSearch,
  reward: BadgePoundSterling,
  leadership: Presentation,
};

interface EmployerChallengeNavigatorProps {
  problems: EmployerProblem[];
}

/**
 * Employer-problems section content, per the approved reference layout's
 * recommended concept: one self-contained cream "shell" card (header +
 * interactive navigator together, as in the reference) that floats over
 * whatever is behind the section — including the shared background video
 * (see EmployerProblemsSection) — so text always has guaranteed contrast
 * independent of the video's own brightness. The alternative "premium card
 * grid" concept from that reference was not built — a production page
 * ships one layout, not a design-exploration tab switcher.
 *
 * A client component because selecting a problem swaps the icon, solution
 * heading, copy and service link on the right without a page navigation;
 * each problem is a native `button` (keyboard-operable by default) and the
 * solution panel is `aria-live` so assistive technology announces the
 * update.
 */
export function EmployerChallengeNavigator({ problems }: EmployerChallengeNavigatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = problems[activeIndex];
  const ActiveIcon = icons[active.icon];

  return (
    <div className="overflow-hidden rounded-md bg-cream shadow-(--shadow-modal)">
      <div className="grid grid-cols-1 gap-6 p-8 sm:p-10 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-10 lg:p-14">
        <div>
          <SectionKicker tone="light">Common employer challenges</SectionKicker>
          <h2 className="mt-4 max-w-2xl font-display text-h1 font-bold text-navy">
            Problems we help employers solve
          </h2>
        </div>
        <p className="max-w-md text-body-lg text-text-secondary lg:justify-self-end lg:text-right">
          Select a challenge to see the practical Apex HR service that helps address it.
        </p>
      </div>

      <div className="mx-4 mb-4 grid overflow-hidden rounded-md sm:mx-6 sm:mb-6 lg:mx-8 lg:mb-8 lg:grid-cols-[minmax(280px,0.85fr)_minmax(360px,1.15fr)]">
        <div className="flex flex-col bg-navy">
          {problems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/10 px-6 py-5 text-left transition-colors duration-(--duration-fast) last:border-b-0",
                  isActive ? "bg-gold text-navy" : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white",
                )}
              >
                <span className="font-display text-small">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-body-lg font-semibold">{item.problem}</span>
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            );
          })}
        </div>

        <div className="flex flex-col justify-center gap-5 bg-surface-card p-8 sm:p-10 lg:p-12" aria-live="polite">
          <span className="grid h-14 w-14 place-items-center rounded-md bg-gold/20 text-gold-ink">
            <ActiveIcon aria-hidden="true" className="h-6 w-6" />
          </span>
          <span className="text-caption font-semibold uppercase tracking-[0.08em] text-gold-ink">
            How Apex HR helps
          </span>
          <h3 className="max-w-lg font-display text-h3 font-bold text-navy">{active.solutionTitle}</h3>
          <p className="max-w-[60ch] text-body text-text-secondary">{active.detail}</p>
          <Link href={active.href} className="group inline-flex w-fit items-center gap-3 text-body font-semibold text-navy">
            {`Explore ${active.serviceLabel}`}
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-navy transition-transform duration-(--duration-fast) group-hover:translate-x-1">
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

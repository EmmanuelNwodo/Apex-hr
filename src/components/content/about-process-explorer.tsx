"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChartNoAxesCombined, ChevronRight, Ear, Handshake, Route, ScanSearch } from "lucide-react";
import { routes } from "@/config/routes";
import type { ProcessStepContent } from "@/content/home";

const stepIcons: Record<string, typeof Ear> = {
  understand: Ear,
  diagnose: ScanSearch,
  recommend: Route,
  implement: Handshake,
  measure: ChartNoAxesCombined,
};

interface AboutProcessExplorerProps {
  steps: ProcessStepContent[];
}

/**
 * Interactive "how we work" picker for the About page, built on the same
 * five-step process already defined once in src/content/home.ts
 * (processSteps, per CLAUDE.md section 11) and shown as a static grid on
 * the homepage — this is a second, more detailed presentation of the same
 * real content, not a re-authored process. A client component because
 * selecting a step updates visible content without a page navigation;
 * each step is a native `button` (keyboard-operable by default) and the
 * detail panel is `aria-live` so assistive technology announces the
 * update.
 */
export function AboutProcessExplorer({ steps }: AboutProcessExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];
  const Icon = stepIcons[activeStep.id];

  return (
    <div className="grid overflow-hidden rounded-md border border-white/15 lg:grid-cols-[minmax(220px,0.66fr)_minmax(0,1.34fr)]">
      <div className="flex flex-col border-b border-white/15 lg:border-b-0 lg:border-r">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={step.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
              className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-white/10 px-5 py-4 text-left transition-colors duration-(--duration-fast) last:border-b-0 ${
                isActive ? "bg-gold/15 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="font-display text-small text-gold">{step.step}</span>
              <span className="text-body font-semibold">{step.title}</span>
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
          <h3 className="mt-8 max-w-lg font-display text-h3 font-bold text-white">{activeStep.title}</h3>
          <p className="mt-3 max-w-lg text-body text-white/70">{activeStep.detail}</p>
        </div>
        <Link
          href={routes.contact.path}
          className="group inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold"
        >
          Talk about your priorities
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </div>
  );
}

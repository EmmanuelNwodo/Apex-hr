"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, LifeBuoy, MessagesSquare, Telescope, UserSearch, Workflow } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

interface EmployerNeedTag {
  label: string;
  href: string;
}

interface EmployerNeed {
  title: string;
  icon: typeof UserSearch;
  detail: string;
  tags: EmployerNeedTag[];
}

// Each need's tags link to real, existing service pages (src/config/services.ts)
// grouped by the employer challenge they most directly address.
const needs: EmployerNeed[] = [
  {
    title: "Recruit talent",
    icon: UserSearch,
    detail: "Move from vacancy pressure to a focused brief, a structured search and a confident hiring decision.",
    tags: [
      { label: "Permanent Recruitment", href: "/services/permanent-recruitment-firm-in-the-uk/" },
      { label: "Executive Search", href: "/services/executive-search-firm-in-the-uk/" },
      { label: "Contract Staffing", href: "/services/contract-staffing-firm-in-the-uk/" },
      { label: "Recruitment Process Outsourcing (RPO)", href: "/services/recruitment-process-outsourcing-rpo-firm-in-the-uk/" },
    ],
  },
  {
    title: "Outsource HR",
    icon: LifeBuoy,
    detail: "Give managers a dependable source of guidance for contracts, policies, compliance and everyday employee matters.",
    tags: [
      { label: "Retained HR Services", href: "/services/retained-hr-services-firm-in-the-uk/" },
      {
        label: "Fractional HR Director / Chief People Officer",
        href: "/services/fractional-hr-director-chief-people-officer-firm-in-the-uk/",
      },
      { label: "HR Compliance Audit", href: "/services/hr-compliance-audit-firm-in-the-uk/" },
      { label: "Employee Handbooks & HR Policies", href: "/services/employee-handbooks-and-hr-policies-firm-in-the-uk/" },
    ],
  },
  {
    title: "Solve a people issue",
    icon: MessagesSquare,
    detail: "Handle investigations, mediation, redundancy and employee-relations challenges with a clear, fair process.",
    tags: [
      { label: "Workplace Investigations", href: "/services/workplace-investigations-firm-in-the-uk/" },
      {
        label: "Workplace Mediation & Conflict Resolution",
        href: "/services/workplace-mediation-and-conflict-resolution-firm-in-the-uk/",
      },
      { label: "Redundancy & Restructuring Support", href: "/services/redundancy-and-restructuring-support-firm-in-the-uk/" },
      { label: "Employment Tribunal HR Support", href: "/services/employment-tribunal-hr-support-firm-in-the-uk/" },
    ],
  },
  {
    title: "Improve performance",
    icon: Telescope,
    detail: "Align structure, leadership, performance and reward with the results the organisation needs to achieve.",
    tags: [
      { label: "Organisation Design", href: "/services/organisation-design-firm-in-the-uk/" },
      { label: "Leadership & Management Training", href: "/services/leadership-and-management-training-firm-in-the-uk/" },
      { label: "Performance Management", href: "/services/performance-management-firm-in-the-uk/" },
      { label: "Reward Strategy", href: "/services/reward-strategy-firm-in-the-uk/" },
    ],
  },
  {
    title: "Transform HR",
    icon: Workflow,
    detail: "Choose and improve HR technology, automate processes and use people data to support better workforce decisions.",
    tags: [
      { label: "HRIS Implementation", href: "/services/hris-implementation-firm-in-the-uk/" },
      { label: "Digital HR Transformation", href: "/services/digital-hr-transformation-firm-in-the-uk/" },
      { label: "People Analytics & HR Dashboards", href: "/services/people-analytics-and-hr-dashboards-firm-in-the-uk/" },
      { label: "HR Software Selection", href: "/services/hr-software-selection-firm-in-the-uk/" },
    ],
  },
];

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

import { LifeBuoy, MessagesSquare, Telescope, UserSearch, Workflow, type LucideIcon } from "lucide-react";

export interface EmployerNeedTag {
  label: string;
  href: string;
}

export interface EmployerNeed {
  title: string;
  icon: LucideIcon;
  detail: string;
  tags: EmployerNeedTag[];
}

/**
 * Data for the "Where to start" employer-needs picker on /for-employers/.
 * Kept in a plain data module (not inside employer-needs-explorer.tsx,
 * which is a "use client" component) specifically so the For Employers
 * server-rendered page can also import this same array to build its
 * CrawlableLinkList fallback — Next.js App Router only proxies component
 * exports across a Server-to-Client-Component boundary, so a plain data
 * array exported from a "use client" file is not usable from server code.
 * One source of truth either way: EmployerNeedsExplorer and the page both
 * read this same array, never a second hand-typed list of the same
 * service destinations.
 *
 * Each need's tags link to real, existing service pages
 * (src/config/services.ts) grouped by the employer challenge they most
 * directly address.
 */
export const employerNeeds: EmployerNeed[] = [
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

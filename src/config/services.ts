/**
 * Canonical service taxonomy: 10 parent families and 48 child services.
 * Source of truth: docs/MASTER-SITEMAP.md section 6 and
 * docs/URL-DECISION-REGISTER.md D-005/D-006. All routes are flat
 * `/services/[slug]/` per the approved decision — do not nest service URLs
 * under their category. Do not add, remove or reslug an entry here without
 * updating the master sitemap first.
 */

export interface ServiceCategory {
  slug: string;
  title: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  categorySlug: string;
}

export const serviceCategories: ServiceCategory[] = [
  { slug: "outsourced-hr-services", title: "Outsourced HR Services" },
  { slug: "recruitment-talent-acquisition", title: "Recruitment & Talent Acquisition" },
  { slug: "employment-law-and-employee-relations", title: "Employment Law & Employee Relations" },
  { slug: "organisation-development-change-management", title: "Organisation Development & Change Management" },
  { slug: "compensation-reward-and-benefits", title: "Compensation, Reward & Benefits" },
  { slug: "learning-and-leadership-development", title: "Learning & Leadership Development" },
  { slug: "performance-and-talent-management", title: "Performance & Talent Management" },
  { slug: "employee-experience-and-engagement", title: "Employee Experience & Engagement" },
  { slug: "hr-technology-and-people-analytics", title: "HR Technology & People Analytics" },
  { slug: "strategic-hr-and-workforce-advisory", title: "Strategic HR & Workforce Advisory" },
];

export const services: ServiceItem[] = [
  // Outsourced HR Services
  { slug: "retained-hr-services", title: "Retained HR Services", categorySlug: "outsourced-hr-services" },
  { slug: "hr-support-for-small-businesses-and-startups", title: "HR Support for Small Businesses & Startups", categorySlug: "outsourced-hr-services" },
  { slug: "fractional-hr-director-chief-people-officer", title: "Fractional HR Director / Chief People Officer", categorySlug: "outsourced-hr-services" },
  { slug: "hr-compliance-audit", title: "HR Compliance Audit", categorySlug: "outsourced-hr-services" },
  { slug: "employee-handbooks-and-hr-policies", title: "Employee Handbooks & HR Policies", categorySlug: "outsourced-hr-services" },
  { slug: "payroll-advisory", title: "Payroll Advisory", categorySlug: "outsourced-hr-services" },

  // Recruitment & Talent Acquisition
  { slug: "permanent-recruitment", title: "Permanent Recruitment", categorySlug: "recruitment-talent-acquisition" },
  { slug: "executive-search", title: "Executive Search", categorySlug: "recruitment-talent-acquisition" },
  { slug: "contract-staffing", title: "Contract Staffing", categorySlug: "recruitment-talent-acquisition" },
  { slug: "recruitment-process-outsourcing-rpo", title: "Recruitment Process Outsourcing (RPO)", categorySlug: "recruitment-talent-acquisition" },
  { slug: "graduate-schemes-and-early-careers-design", title: "Graduate Schemes & Early Careers Design", categorySlug: "recruitment-talent-acquisition" },

  // Employment Law & Employee Relations
  { slug: "redundancy-and-restructuring-support", title: "Redundancy & Restructuring Support", categorySlug: "employment-law-and-employee-relations" },
  { slug: "tupe-advisory", title: "TUPE Advisory", categorySlug: "employment-law-and-employee-relations" },
  { slug: "workplace-investigations", title: "Workplace Investigations", categorySlug: "employment-law-and-employee-relations" },
  { slug: "workplace-mediation-and-conflict-resolution", title: "Workplace Mediation & Conflict Resolution", categorySlug: "employment-law-and-employee-relations" },
  { slug: "employment-tribunal-hr-support", title: "Employment Tribunal HR Support", categorySlug: "employment-law-and-employee-relations" },
  { slug: "outplacement-and-career-transition-services", title: "Outplacement & Career Transition Services", categorySlug: "employment-law-and-employee-relations" },
  { slug: "industrial-relations-and-trade-union-negotiations", title: "Industrial Relations & Trade Union Negotiations", categorySlug: "employment-law-and-employee-relations" },
  { slug: "skilled-worker-sponsorship-hr-support", title: "Skilled Worker Sponsorship HR Support", categorySlug: "employment-law-and-employee-relations" },

  // Organisation Development & Change Management
  { slug: "organisation-design", title: "Organisation Design", categorySlug: "organisation-development-change-management" },
  { slug: "change-management", title: "Change Management", categorySlug: "organisation-development-change-management" },
  { slug: "culture-transformation", title: "Culture Transformation", categorySlug: "organisation-development-change-management" },
  { slug: "ma-people-due-diligence-and-post-merger-integration", title: "M&A People Due Diligence & Post-Merger Integration", categorySlug: "organisation-development-change-management" },

  // Compensation, Reward & Benefits
  { slug: "salary-benchmarking", title: "Salary Benchmarking", categorySlug: "compensation-reward-and-benefits" },
  { slug: "job-evaluation-and-pay-structures", title: "Job Evaluation & Pay Structures", categorySlug: "compensation-reward-and-benefits" },
  { slug: "reward-strategy", title: "Reward Strategy", categorySlug: "compensation-reward-and-benefits" },
  { slug: "pay-equity-and-pay-gap-reporting", title: "Pay Equity & Pay Gap Reporting", categorySlug: "compensation-reward-and-benefits" },
  { slug: "employee-benefits-consulting", title: "Employee Benefits Consulting", categorySlug: "compensation-reward-and-benefits" },
  { slug: "executive-compensation-and-share-schemes", title: "Executive Compensation & Share Schemes", categorySlug: "compensation-reward-and-benefits" },

  // Learning & Leadership Development
  { slug: "leadership-and-management-training", title: "Leadership & Management Training", categorySlug: "learning-and-leadership-development" },
  { slug: "executive-coaching-and-360-feedback", title: "Executive Coaching & 360 Feedback", categorySlug: "learning-and-leadership-development" },
  { slug: "learning-strategy-and-capability-development", title: "Learning Strategy & Capability Development", categorySlug: "learning-and-leadership-development" },

  // Performance & Talent Management
  { slug: "performance-management", title: "Performance Management", categorySlug: "performance-and-talent-management" },
  { slug: "succession-planning-and-talent-mapping", title: "Succession Planning & Talent Mapping", categorySlug: "performance-and-talent-management" },
  { slug: "competency-frameworks", title: "Competency Frameworks", categorySlug: "performance-and-talent-management" },

  // Employee Experience & Engagement
  { slug: "employee-experience-strategy", title: "Employee Experience Strategy", categorySlug: "employee-experience-and-engagement" },
  { slug: "employee-engagement-surveys-and-action-planning", title: "Employee Engagement Surveys & Action Planning", categorySlug: "employee-experience-and-engagement" },
  { slug: "employer-branding-and-employee-value-proposition-evp", title: "Employer Branding & Employee Value Proposition (EVP)", categorySlug: "employee-experience-and-engagement" },
  { slug: "workplace-wellbeing-and-mental-health", title: "Workplace Wellbeing & Mental Health", categorySlug: "employee-experience-and-engagement" },
  { slug: "diversity-equity-and-inclusion-dei-consulting", title: "Diversity, Equity & Inclusion (DEI) Consulting", categorySlug: "employee-experience-and-engagement" },

  // HR Technology & People Analytics
  { slug: "hris-implementation", title: "HRIS Implementation", categorySlug: "hr-technology-and-people-analytics" },
  { slug: "hr-software-selection", title: "HR Software Selection", categorySlug: "hr-technology-and-people-analytics" },
  { slug: "people-analytics-and-hr-dashboards", title: "People Analytics & HR Dashboards", categorySlug: "hr-technology-and-people-analytics" },
  { slug: "digital-hr-transformation", title: "Digital HR Transformation", categorySlug: "hr-technology-and-people-analytics" },
  { slug: "ai-workplace-policy-and-hr-integration", title: "AI Workplace Policy & HR Integration", categorySlug: "hr-technology-and-people-analytics" },

  // Strategic HR & Workforce Advisory
  { slug: "people-strategy", title: "People Strategy", categorySlug: "strategic-hr-and-workforce-advisory" },
  { slug: "strategic-workforce-planning", title: "Strategic Workforce Planning", categorySlug: "strategic-hr-and-workforce-advisory" },
  { slug: "global-mobility-and-expatriate-hr-management", title: "Global Mobility & Expatriate HR Management", categorySlug: "strategic-hr-and-workforce-advisory" },
];

export function getServiceCategory(slug: string) {
  return serviceCategories.find((category) => category.slug === slug);
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServicesByCategory(categorySlug: string) {
  return services.filter((service) => service.categorySlug === categorySlug);
}

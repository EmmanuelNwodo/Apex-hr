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
  { slug: "outsourced-hr-services-firm-in-the-uk", title: "Outsourced HR Services" },
  { slug: "recruitment-and-talent-acquisition-firm-in-the-uk", title: "Recruitment & Talent Acquisition" },
  { slug: "employment-law-and-employee-relations-firm-in-the-uk", title: "Employment Law & Employee Relations" },
  { slug: "organisation-development-and-change-management-firm-in-the-uk", title: "Organisation Development & Change Management" },
  { slug: "compensation-reward-and-benefits-firm-in-the-uk", title: "Compensation, Reward & Benefits" },
  { slug: "learning-and-leadership-development-firm-in-the-uk", title: "Learning & Leadership Development" },
  { slug: "performance-and-talent-management-firm-in-the-uk", title: "Performance & Talent Management" },
  { slug: "employee-experience-and-engagement-firm-in-the-uk", title: "Employee Experience & Engagement" },
  { slug: "hr-technology-and-people-analytics-firm-in-the-uk", title: "HR Technology & People Analytics" },
  { slug: "strategic-hr-and-workforce-advisory-firm-in-the-uk", title: "Strategic HR & Workforce Advisory" },
];

export const services: ServiceItem[] = [
  // Outsourced HR Services
  { slug: "retained-hr-services-firm-in-the-uk", title: "Retained HR Services", categorySlug: "outsourced-hr-services-firm-in-the-uk" },
  { slug: "hr-support-for-small-businesses-and-startups-firm-in-the-uk", title: "HR Support for Small Businesses & Startups", categorySlug: "outsourced-hr-services-firm-in-the-uk" },
  { slug: "fractional-hr-director-chief-people-officer-firm-in-the-uk", title: "Fractional HR Director / Chief People Officer", categorySlug: "outsourced-hr-services-firm-in-the-uk" },
  { slug: "hr-compliance-audit-firm-in-the-uk", title: "HR Compliance Audit", categorySlug: "outsourced-hr-services-firm-in-the-uk" },
  { slug: "employee-handbooks-and-hr-policies-firm-in-the-uk", title: "Employee Handbooks & HR Policies", categorySlug: "outsourced-hr-services-firm-in-the-uk" },
  { slug: "payroll-advisory-firm-in-the-uk", title: "Payroll Advisory", categorySlug: "outsourced-hr-services-firm-in-the-uk" },

  // Recruitment & Talent Acquisition
  { slug: "permanent-recruitment-firm-in-the-uk", title: "Permanent Recruitment", categorySlug: "recruitment-and-talent-acquisition-firm-in-the-uk" },
  { slug: "executive-search-firm-in-the-uk", title: "Executive Search", categorySlug: "recruitment-and-talent-acquisition-firm-in-the-uk" },
  { slug: "contract-staffing-firm-in-the-uk", title: "Contract Staffing", categorySlug: "recruitment-and-talent-acquisition-firm-in-the-uk" },
  { slug: "recruitment-process-outsourcing-rpo-firm-in-the-uk", title: "Recruitment Process Outsourcing (RPO)", categorySlug: "recruitment-and-talent-acquisition-firm-in-the-uk" },
  { slug: "graduate-schemes-and-early-careers-design-firm-in-the-uk", title: "Graduate Schemes & Early Careers Design", categorySlug: "recruitment-and-talent-acquisition-firm-in-the-uk" },

  // Employment Law & Employee Relations
  { slug: "redundancy-and-restructuring-support-firm-in-the-uk", title: "Redundancy & Restructuring Support", categorySlug: "employment-law-and-employee-relations-firm-in-the-uk" },
  { slug: "tupe-advisory-firm-in-the-uk", title: "TUPE Advisory", categorySlug: "employment-law-and-employee-relations-firm-in-the-uk" },
  { slug: "workplace-investigations-firm-in-the-uk", title: "Workplace Investigations", categorySlug: "employment-law-and-employee-relations-firm-in-the-uk" },
  { slug: "workplace-mediation-and-conflict-resolution-firm-in-the-uk", title: "Workplace Mediation & Conflict Resolution", categorySlug: "employment-law-and-employee-relations-firm-in-the-uk" },
  { slug: "employment-tribunal-hr-support-firm-in-the-uk", title: "Employment Tribunal HR Support", categorySlug: "employment-law-and-employee-relations-firm-in-the-uk" },
  { slug: "outplacement-and-career-transition-services-firm-in-the-uk", title: "Outplacement & Career Transition Services", categorySlug: "employment-law-and-employee-relations-firm-in-the-uk" },
  { slug: "industrial-relations-and-trade-union-negotiations-firm-in-the-uk", title: "Industrial Relations & Trade Union Negotiations", categorySlug: "employment-law-and-employee-relations-firm-in-the-uk" },
  { slug: "skilled-worker-sponsorship-hr-support-firm-in-the-uk", title: "Skilled Worker Sponsorship HR Support", categorySlug: "employment-law-and-employee-relations-firm-in-the-uk" },

  // Organisation Development & Change Management
  { slug: "organisation-design-firm-in-the-uk", title: "Organisation Design", categorySlug: "organisation-development-and-change-management-firm-in-the-uk" },
  { slug: "change-management-firm-in-the-uk", title: "Change Management", categorySlug: "organisation-development-and-change-management-firm-in-the-uk" },
  { slug: "culture-transformation-firm-in-the-uk", title: "Culture Transformation", categorySlug: "organisation-development-and-change-management-firm-in-the-uk" },
  { slug: "ma-people-due-diligence-and-post-merger-integration-firm-in-the-uk", title: "M&A People Due Diligence & Post-Merger Integration", categorySlug: "organisation-development-and-change-management-firm-in-the-uk" },

  // Compensation, Reward & Benefits
  { slug: "salary-benchmarking-firm-in-the-uk", title: "Salary Benchmarking", categorySlug: "compensation-reward-and-benefits-firm-in-the-uk" },
  { slug: "job-evaluation-and-pay-structures-firm-in-the-uk", title: "Job Evaluation & Pay Structures", categorySlug: "compensation-reward-and-benefits-firm-in-the-uk" },
  { slug: "reward-strategy-firm-in-the-uk", title: "Reward Strategy", categorySlug: "compensation-reward-and-benefits-firm-in-the-uk" },
  { slug: "pay-equity-and-pay-gap-reporting-firm-in-the-uk", title: "Pay Equity & Pay Gap Reporting", categorySlug: "compensation-reward-and-benefits-firm-in-the-uk" },
  { slug: "employee-benefits-consulting-firm-in-the-uk", title: "Employee Benefits Consulting", categorySlug: "compensation-reward-and-benefits-firm-in-the-uk" },
  { slug: "executive-compensation-and-share-schemes-firm-in-the-uk", title: "Executive Compensation & Share Schemes", categorySlug: "compensation-reward-and-benefits-firm-in-the-uk" },

  // Learning & Leadership Development
  { slug: "leadership-and-management-training-firm-in-the-uk", title: "Leadership & Management Training", categorySlug: "learning-and-leadership-development-firm-in-the-uk" },
  { slug: "executive-coaching-and-360-feedback-firm-in-the-uk", title: "Executive Coaching & 360 Feedback", categorySlug: "learning-and-leadership-development-firm-in-the-uk" },
  { slug: "learning-strategy-and-capability-development-firm-in-the-uk", title: "Learning Strategy & Capability Development", categorySlug: "learning-and-leadership-development-firm-in-the-uk" },

  // Performance & Talent Management
  { slug: "performance-management-firm-in-the-uk", title: "Performance Management", categorySlug: "performance-and-talent-management-firm-in-the-uk" },
  { slug: "succession-planning-and-talent-mapping-firm-in-the-uk", title: "Succession Planning & Talent Mapping", categorySlug: "performance-and-talent-management-firm-in-the-uk" },
  { slug: "competency-frameworks-firm-in-the-uk", title: "Competency Frameworks", categorySlug: "performance-and-talent-management-firm-in-the-uk" },

  // Employee Experience & Engagement
  { slug: "employee-experience-strategy-firm-in-the-uk", title: "Employee Experience Strategy", categorySlug: "employee-experience-and-engagement-firm-in-the-uk" },
  { slug: "employee-engagement-surveys-and-action-planning-firm-in-the-uk", title: "Employee Engagement Surveys & Action Planning", categorySlug: "employee-experience-and-engagement-firm-in-the-uk" },
  { slug: "employer-branding-and-employee-value-proposition-evp-firm-in-the-uk", title: "Employer Branding & Employee Value Proposition (EVP)", categorySlug: "employee-experience-and-engagement-firm-in-the-uk" },
  { slug: "workplace-wellbeing-and-mental-health-firm-in-the-uk", title: "Workplace Wellbeing & Mental Health", categorySlug: "employee-experience-and-engagement-firm-in-the-uk" },
  { slug: "diversity-equity-and-inclusion-dei-consulting-firm-in-the-uk", title: "Diversity, Equity & Inclusion (DEI) Consulting", categorySlug: "employee-experience-and-engagement-firm-in-the-uk" },

  // HR Technology & People Analytics
  { slug: "hris-implementation-firm-in-the-uk", title: "HRIS Implementation", categorySlug: "hr-technology-and-people-analytics-firm-in-the-uk" },
  { slug: "hr-software-selection-firm-in-the-uk", title: "HR Software Selection", categorySlug: "hr-technology-and-people-analytics-firm-in-the-uk" },
  { slug: "people-analytics-and-hr-dashboards-firm-in-the-uk", title: "People Analytics & HR Dashboards", categorySlug: "hr-technology-and-people-analytics-firm-in-the-uk" },
  { slug: "digital-hr-transformation-firm-in-the-uk", title: "Digital HR Transformation", categorySlug: "hr-technology-and-people-analytics-firm-in-the-uk" },
  { slug: "ai-workplace-policy-and-hr-integration-firm-in-the-uk", title: "AI Workplace Policy & HR Integration", categorySlug: "hr-technology-and-people-analytics-firm-in-the-uk" },

  // Strategic HR & Workforce Advisory
  { slug: "people-strategy-firm-in-the-uk", title: "People Strategy", categorySlug: "strategic-hr-and-workforce-advisory-firm-in-the-uk" },
  { slug: "strategic-workforce-planning-firm-in-the-uk", title: "Strategic Workforce Planning", categorySlug: "strategic-hr-and-workforce-advisory-firm-in-the-uk" },
  { slug: "global-mobility-and-expatriate-hr-management-firm-in-the-uk", title: "Global Mobility & Expatriate HR Management", categorySlug: "strategic-hr-and-workforce-advisory-firm-in-the-uk" },
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

/**
 * Full 72-rule permanent redirect registry, extracted verbatim from the
 * "Redirects" sheet of docs/Apex_HR_Master_Sitemap_and_URL_Register.xlsx
 * (cross-checked: 72 rows, all Status "Redirected"). Consumed by
 * next.config.ts's `redirects()` and validated by
 * tests/unit/redirects.test.ts. Do not add a redirect rule here that
 * isn't governed by that register — see CLAUDE.md section 19.
 */

export interface RedirectRule {
  source: string;
  destination: string;
  reason: string;
}

export const redirectRules: RedirectRule[] = [
  { source: "/services/recruitment-talent-and-acuqisition/", destination: "/services/recruitment-talent-acquisition/", reason: "Corrected misspelling in service URL" },
  { source: "/services/organisation-deevelopment-and-change-movement/", destination: "/services/organisation-development-change-management/", reason: "Corrected misspelling in service URL" },
  { source: "/services/leadership-and-leadership-development/", destination: "/services/learning-and-leadership-development/", reason: "Corrected misspelling in service URL" },
  { source: "/insights/organization-development/", destination: "/insights/organisation-development/", reason: "Corrected insight category spelling or path format" },
  { source: "/insights/performance/talent/", destination: "/insights/performance-talent/", reason: "Corrected insight category spelling or path format" },
  { source: "/industries/", destination: "/sector/", reason: "Sector is the approved canonical taxonomy" },
  { source: "/industries/startups-scale-ups/", destination: "/sector/startups-scale-ups/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/professional-services/", destination: "/sector/professional-services/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/health-care/", destination: "/sector/health-care/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/life-sciences/", destination: "/sector/life-sciences/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/technology/", destination: "/sector/technology/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/financial-services/", destination: "/sector/financial-services/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/accountants/", destination: "/sector/accountants/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/architects/", destination: "/sector/architects/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/care-homes/", destination: "/sector/care-homes/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/charity/", destination: "/sector/charity/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/constructions/", destination: "/sector/construction/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/destributors/", destination: "/sector/distribution/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/distribution/", destination: "/sector/distribution/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/education/", destination: "/sector/education/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/engineers/", destination: "/sector/engineers/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/leisure/", destination: "/sector/leisure/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/manufacturers/", destination: "/sector/manufacturers/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/industries/hospitality/", destination: "/sector/hospitality/", reason: "Replace retired industries taxonomy with sector" },
  { source: "/sector/constructions/", destination: "/sector/construction/", reason: "Correct spelling and singular sector slug" },
  { source: "/sector/destributors/", destination: "/sector/distribution/", reason: "Correct misspelled sector label and slug" },
  { source: "/contacts/", destination: "/contact/", reason: "Use the approved singular Contact route" },
  { source: "/locations/nothingham/", destination: "/locations/nottingham/", reason: "Correct misspelled location slug" },
  { source: "/locations/worchester/", destination: "/locations/worcester/", reason: "Correct misspelled location slug" },
  { source: "/locations/standfordshire/", destination: "/locations/staffordshire/", reason: "Correct misspelled location slug" },
  { source: "/services/talent-acquisition-recruitment/", destination: "/services/recruitment-talent-acquisition/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/talent-acquisition-recruitment/executive-search/", destination: "/services/executive-search/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/talent-acquisition-recruitment/permanent-recruitment/", destination: "/services/permanent-recruitment/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/talent-acquisition-recruitment/contract-staffing/", destination: "/services/contract-staffing/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/talent-acquisition-recruitment/recruitment-process-outsourcing/", destination: "/services/recruitment-process-outsourcing-rpo/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/organisation-development-change/", destination: "/services/organisation-development-change-management/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/organisation-development-change/organisation-design/", destination: "/services/organisation-design/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/organisation-development-change/culture-transformation/", destination: "/services/culture-transformation/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/organisation-development-change/change-management/", destination: "/services/change-management/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/learning-development/", destination: "/services/learning-and-leadership-development/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/learning-development/leadership-development/", destination: "/services/leadership-and-management-training/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/learning-development/management-training/", destination: "/services/leadership-and-management-training/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/learning-development/executive-coaching/", destination: "/services/executive-coaching-and-360-feedback/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/learning-development/learning-strategy/", destination: "/services/learning-strategy-and-capability-development/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/performance-talent-management/performance-management/", destination: "/services/performance-management/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/performance-talent-management/succession-planning/", destination: "/services/succession-planning-and-talent-mapping/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/performance-talent-management/competency-frameworks/", destination: "/services/competency-frameworks/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/compensation-benefits/", destination: "/services/compensation-reward-and-benefits/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/compensation-benefits/salary-benchmarking/", destination: "/services/salary-benchmarking/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/compensation-benefits/job-evaluation/", destination: "/services/job-evaluation-and-pay-structures/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/compensation-benefits/reward-strategy/", destination: "/services/reward-strategy/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/compensation-benefits/pay-equity/", destination: "/services/pay-equity-and-pay-gap-reporting/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/compensation-benefits/employee-benefits/", destination: "/services/employee-benefits-consulting/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/compensation-benefits/payroll-advisory/", destination: "/services/payroll-advisory/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/employee-experience-engagement/employee-engagement/", destination: "/services/employee-experience-strategy/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/employee-experience-engagement/engagement-surveys/", destination: "/services/employee-engagement-surveys-and-action-planning/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/employee-experience-engagement/employee-value-proposition/", destination: "/services/employer-branding-and-employee-value-proposition-evp/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/employee-experience-engagement/employer-brand-strategy/", destination: "/services/employer-branding-and-employee-value-proposition-evp/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/employee-experience-engagement/wellbeing/", destination: "/services/workplace-wellbeing-and-mental-health/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/employee-experience-engagement/dei-strategy/", destination: "/services/diversity-equity-and-inclusion-dei-consulting/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/hr-technology-people-analytics/", destination: "/services/hr-technology-and-people-analytics/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/hr-technology-people-analytics/hris-implementation/", destination: "/services/hris-implementation/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/hr-technology-people-analytics/hr-software-selection/", destination: "/services/hr-software-selection/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/hr-technology-people-analytics/people-analytics/", destination: "/services/people-analytics-and-hr-dashboards/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/hr-technology-people-analytics/digital-hr-transformation/", destination: "/services/digital-hr-transformation/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/talent-strategy-workforce-planning/", destination: "/services/strategic-hr-and-workforce-advisory/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/talent-strategy-workforce-planning/strategic-workforce-planning/", destination: "/services/strategic-workforce-planning/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/people-strategy-advisory/", destination: "/services/strategic-hr-and-workforce-advisory/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/people-strategy-advisory/people-strategy/", destination: "/services/people-strategy/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/people-strategy-advisory/fractional-chro/", destination: "/services/fractional-hr-director-chief-people-officer/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/people-strategy-advisory/startup-hr/", destination: "/services/hr-support-for-small-businesses-and-startups/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
  { source: "/services/people-strategy-advisory/scale-up-hr/", destination: "/services/hr-support-for-small-businesses-and-startups/", reason: "Consolidate competing nested taxonomy into canonical flat service URL" },
];

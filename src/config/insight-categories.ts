/**
 * Canonical insight category taxonomy. Source of truth:
 * docs/MASTER-SITEMAP.md section 12, cross-checked against the "Insight
 * category" rows (8 Confirmed/Corrected) in the Master Routes sheet of
 * docs/Apex_HR_Master_Sitemap_and_URL_Register.xlsx.
 */

export interface InsightCategoryItem {
  slug: string;
  title: string;
  summary: string;
}

export const insightCategories: InsightCategoryItem[] = [
  {
    slug: "organisation-development",
    title: "Organisation Development",
    summary: "Structuring, restructuring and developing organisations through change.",
  },
  {
    slug: "learning-development",
    title: "Learning & Development",
    summary: "Building leadership and workforce capability.",
  },
  {
    slug: "performance-talent",
    title: "Performance & Talent",
    summary: "Performance management, succession and talent decisions.",
  },
  {
    slug: "reward",
    title: "Reward",
    summary: "Pay, benefits and reward strategy.",
  },
  {
    slug: "employee-experience",
    title: "Employee Experience",
    summary: "Engagement, wellbeing and the employee journey.",
  },
  {
    slug: "hr-technology",
    title: "HR Technology",
    summary: "HR systems, analytics and digital transformation.",
  },
  {
    slug: "workforce-strategy",
    title: "Workforce Strategy",
    summary: "Strategic workforce planning and organisational design.",
  },
  {
    slug: "people-strategy",
    title: "People Strategy",
    summary: "Connecting HR priorities to business strategy.",
  },
];

export function getInsightCategory(slug: string) {
  return insightCategories.find((category) => category.slug === slug);
}

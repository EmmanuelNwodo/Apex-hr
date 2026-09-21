import {
  BadgePoundSterling,
  ChartSpline,
  Gauge,
  HeartHandshake,
  Presentation,
  Scale,
  Telescope,
  UserRoundSearch,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/** Shared category slug → icon map, used by both the services hub navigator and the service-family (category) page. */
export const serviceCategoryIcons: Record<string, LucideIcon> = {
  "outsourced-hr-services-firm-in-the-uk": UsersRound,
  "recruitment-and-talent-acquisition-firm-in-the-uk": UserRoundSearch,
  "employment-law-and-employee-relations-firm-in-the-uk": Scale,
  "organisation-development-and-change-management-firm-in-the-uk": Workflow,
  "compensation-reward-and-benefits-firm-in-the-uk": BadgePoundSterling,
  "learning-and-leadership-development-firm-in-the-uk": Presentation,
  "performance-and-talent-management-firm-in-the-uk": Gauge,
  "employee-experience-and-engagement-firm-in-the-uk": HeartHandshake,
  "hr-technology-and-people-analytics-firm-in-the-uk": ChartSpline,
  "strategic-hr-and-workforce-advisory-firm-in-the-uk": Telescope,
};

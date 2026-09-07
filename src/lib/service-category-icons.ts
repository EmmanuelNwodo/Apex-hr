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
  "outsourced-hr-services": UsersRound,
  "recruitment-talent-acquisition": UserRoundSearch,
  "employment-law-and-employee-relations": Scale,
  "organisation-development-change-management": Workflow,
  "compensation-reward-and-benefits": BadgePoundSterling,
  "learning-and-leadership-development": Presentation,
  "performance-and-talent-management": Gauge,
  "employee-experience-and-engagement": HeartHandshake,
  "hr-technology-and-people-analytics": ChartSpline,
  "strategic-hr-and-workforce-advisory": Telescope,
};

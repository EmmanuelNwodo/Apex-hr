import type { RouteRecord } from "./route";

export interface NavItem {
  route: RouteRecord;
  /** Short description shown in expanded/mobile navigation states, optional. */
  description?: string;
}

export interface CtaConfig {
  label: string;
  route: RouteRecord;
  analyticsId: string;
}

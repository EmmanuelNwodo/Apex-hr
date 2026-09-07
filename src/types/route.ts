/**
 * Governed route types.
 * Mirrors the status vocabulary in docs/MASTER-SITEMAP.md section 2 and
 * docs/CONTENT-MODEL.md section 4.1. The full 1,087-route registry from the
 * master workbook is not generated in this phase (see docs/CONTENT-MODEL.md
 * section 24) — this is the typed foundation that a future generation step
 * extends, not a replacement for it.
 */
export type RouteStatus =
  | "confirmed"
  | "corrected"
  | "redirected"
  | "provisional"
  | "future";

export interface RouteRecord {
  /** Stable identifier used to reference this route from navigation/config. */
  id: string;
  /** Human-readable label for navigation, breadcrumbs and link text. */
  label: string;
  /** Exact canonical path from the master sitemap, e.g. "/services/". */
  path: string;
  status: RouteStatus;
  /**
   * Whether this route currently has real (non-placeholder) content and
   * should be discoverable via the XML sitemap and indexed. Distinct from
   * `status`: a Confirmed route can still be a development placeholder.
   */
  readyToIndex: boolean;
}

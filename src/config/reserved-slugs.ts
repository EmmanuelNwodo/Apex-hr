import { routes } from "@/config/routes";

/**
 * Central guard protecting every existing Apex HR route from being shadowed
 * by a root-level WordPress article slug (`src/app/[slug]/page.tsx`).
 * Derived from the same `routes.ts` registry every other page/nav/sitemap
 * consumer reads (single source of truth — never hand-duplicate this list),
 * plus a small set of segments that are real routes in `src/app/` but have
 * no `routes.ts` entry (`talent-acquisition`, `api`), plus segments that are
 * not yet built pages but are explicitly reserved for a near-future route
 * (`privacy-policy`, `terms`) so a WordPress editor can never accidentally
 * publish a post that would occupy one of them first.
 *
 * Next.js's own file-system routing already makes every static route (e.g.
 * `src/app/about/page.tsx`) win over the dynamic `[slug]` sibling for an
 * exact path match, so this guard is defence-in-depth, not the only thing
 * standing between a WordPress post and a reserved URL — see
 * docs/URL-DECISION-REGISTER.md for the recorded decision.
 */
const EXPLICIT_RESERVED_SEGMENTS = [
  "talent-acquisition",
  "api",
  "privacy-policy",
  "terms",
  "sitemap.xml",
  "robots.txt",
  "_next",
];

function firstPathSegment(path: string): string | null {
  const segment = path.split("/").filter(Boolean)[0];
  return segment ? segment.toLowerCase() : null;
}

export const reservedSlugs: ReadonlySet<string> = new Set(
  [
    ...Object.values(routes)
      .map((route) => firstPathSegment(route.path))
      .filter((segment): segment is string => segment !== null),
    ...EXPLICIT_RESERVED_SEGMENTS,
  ].map((segment) => segment.toLowerCase()),
);

/** Whether `slug` collides with an existing or explicitly reserved Apex HR route. */
export function isReservedSlug(slug: string): boolean {
  return reservedSlugs.has(slug.toLowerCase());
}

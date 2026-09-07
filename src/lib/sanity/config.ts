/**
 * Sanity connection configuration. Reads from environment variables and
 * never throws at import time — pages must be able to render without live
 * Sanity credentials during this phase. Any code that actually queries
 * Sanity should check `isSanityConfigured` first and handle its absence.
 *
 * Missing/unresolved: NEXT_PUBLIC_SANITY_PROJECT_ID and
 * NEXT_PUBLIC_SANITY_DATASET are not yet set — see .env.example and
 * docs/CONTENT-MODEL.md section 28.
 */
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  readToken: process.env.SANITY_API_READ_TOKEN ?? "",
};

export const isSanityConfigured = Boolean(sanityConfig.projectId);

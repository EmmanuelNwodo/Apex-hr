import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { routes } from "@/config/routes";

/**
 * `siteConfig.productionUrl` (src/config/site.ts) and the Insights archive's
 * static `metadata` export (src/app/insights/page.tsx) both read
 * `NEXT_PUBLIC_SITE_URL` at module-load time, not at request time — so
 * proving "NEXT_PUBLIC_SITE_URL drives the canonical host" requires
 * stubbing the env var and re-importing both modules fresh via
 * vi.resetModules(), exactly as the WordPress data-layer tests already do
 * for its own env-dependent config. Running `vitest` directly (no Next.js
 * dev/build step in between) never loads `.env.local` on its own, so
 * without this the ambient env var is simply unset here — asserting
 * against a literal domain without stubbing it first would be asserting
 * against test-runner ambience, not against the actual wiring.
 *
 * `WORDPRESS_API_URL` is explicitly stubbed to an empty string alongside
 * `NEXT_PUBLIC_SITE_URL` so the freshly-reimported `@/lib/wordpress` module
 * graph never treats WordPress as configured here — importing
 * `@/app/insights/page` only needs its static `metadata` export, never a
 * live fetch, and this guarantees that stays true regardless of what any
 * other concurrently-running test file's own env stubbing is doing.
 *
 * Loaded once in `beforeAll` (not per-test) since `vi.resetModules()` forces
 * a full re-transform of the module graph each time, which is slow enough
 * under full-suite concurrency to risk the default per-test timeout if
 * repeated for every assertion.
 */
let configuredDomain: { siteConfig: typeof import("@/config/site").siteConfig; metadata: typeof import("@/app/insights/page").metadata };
let unsetDomain: { siteConfig: typeof import("@/config/site").siteConfig; metadata: typeof import("@/app/insights/page").metadata };

beforeAll(async () => {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.apexhrllc.co.uk");
  vi.stubEnv("WORDPRESS_API_URL", "");
  const configured = await Promise.all([import("@/config/site"), import("@/app/insights/page")]);
  configuredDomain = { siteConfig: configured[0].siteConfig, metadata: configured[1].metadata };

  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  vi.stubEnv("WORDPRESS_API_URL", "");
  const unset = await Promise.all([import("@/config/site"), import("@/app/insights/page")]);
  unsetDomain = { siteConfig: unset[0].siteConfig, metadata: unset[1].metadata };
}, 20000);

afterAll(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("Insights archive — SEO metadata", () => {
  it("routes.insights.readyToIndex is true, now that WordPress has published content", () => {
    expect(routes.insights.readyToIndex).toBe(true);
  });

  it("with NEXT_PUBLIC_SITE_URL set to the confirmed production domain, the canonical is www.apexhrllc.co.uk/insights/, never apexhrllc.com", () => {
    const canonical = String(configuredDomain.metadata.alternates?.canonical ?? "");
    expect(canonical).toBe("https://www.apexhrllc.co.uk/insights/");
    expect(canonical).not.toContain("apexhrllc.com");
  });

  it("is indexable (index: true, follow: true) rather than noindex, regardless of domain configuration", () => {
    expect(configuredDomain.metadata.robots).toMatchObject({ index: true, follow: true });
  });

  it("Open Graph url matches the same NEXT_PUBLIC_SITE_URL-driven canonical host", () => {
    expect(String(configuredDomain.metadata.openGraph?.url ?? "")).toBe("https://www.apexhrllc.co.uk/insights/");
  });

  it("siteConfig.productionUrl is driven by NEXT_PUBLIC_SITE_URL, not a value hard-coded independently of it", () => {
    expect(configuredDomain.siteConfig.productionUrl).toBe("https://www.apexhrllc.co.uk");
  });

  it("falls back to the confirmed production domain (never the old apexhrllc.com) when NEXT_PUBLIC_SITE_URL is genuinely unset — not a silently broken empty host", () => {
    expect(unsetDomain.siteConfig.productionUrl).toBe("https://www.apexhrllc.co.uk");
    expect(String(unsetDomain.metadata.alternates?.canonical ?? "")).toBe("https://www.apexhrllc.co.uk/insights/");
  });
});

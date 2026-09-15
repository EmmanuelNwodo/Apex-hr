import { describe, expect, it } from "vitest";
import { isReservedSlug, reservedSlugs } from "@/config/reserved-slugs";

describe("reserved-slugs guard", () => {
  it("reserves every existing Apex HR top-level route segment", () => {
    const expected = [
      "about",
      "contact",
      "services",
      "sector",
      "locations",
      "jobs",
      "for-employers",
      "for-candidates",
      "insights",
      "case-study",
      "experts",
      "find-talent",
      "resources",
      "talent-pool",
    ];
    for (const segment of expected) {
      expect(isReservedSlug(segment), `${segment} should be reserved`).toBe(true);
    }
  });

  it("reserves segments that are real app routes without a routes.ts entry", () => {
    expect(isReservedSlug("talent-acquisition")).toBe(true);
    expect(isReservedSlug("api")).toBe(true);
  });

  it("reserves anticipated-but-unbuilt legal routes", () => {
    expect(isReservedSlug("privacy-policy")).toBe(true);
    expect(isReservedSlug("terms")).toBe(true);
  });

  it("reserves technical infrastructure paths", () => {
    expect(isReservedSlug("sitemap.xml")).toBe(true);
    expect(isReservedSlug("robots.txt")).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(isReservedSlug("About")).toBe(true);
    expect(isReservedSlug("SERVICES")).toBe(true);
  });

  it("does not reserve a plausible article slug", () => {
    expect(isReservedSlug("how-to-build-a-great-hr-team")).toBe(false);
    expect(isReservedSlug("five-signs-your-onboarding-needs-work")).toBe(false);
  });

  it("exposes the underlying set for inspection", () => {
    expect(reservedSlugs.has("about")).toBe(true);
    expect(reservedSlugs.size).toBeGreaterThan(10);
  });
});

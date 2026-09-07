import { describe, expect, it } from "vitest";
import { redirectRules } from "@/config/redirects";

describe("redirect registry", () => {
  it("contains the full 72-rule registry from the master workbook", () => {
    expect(redirectRules.length).toBe(72);
  });

  it("has no duplicate source URLs", () => {
    const sources = redirectRules.map((rule) => rule.source);
    const seen = new Map<string, number>();
    for (const source of sources) seen.set(source, (seen.get(source) ?? 0) + 1);
    const duplicates = [...seen.entries()].filter(([, count]) => count > 1).map(([source]) => source);
    expect(duplicates, `Duplicate redirect sources: ${duplicates.join(", ")}`).toEqual([]);
  });

  it("never redirects a source to itself", () => {
    const selfRedirects = redirectRules.filter((rule) => rule.source === rule.destination);
    expect(selfRedirects).toEqual([]);
  });

  it("has no redirect chains (a destination that is itself another rule's source)", () => {
    const sources = new Set(redirectRules.map((rule) => rule.source));
    const chains = redirectRules.filter((rule) => sources.has(rule.destination));
    expect(
      chains,
      `Redirect chains found (destination is also a source): ${chains
        .map((r) => `${r.source} -> ${r.destination}`)
        .join(", ")}`,
    ).toEqual([]);
  });

  it("has every source and destination in lowercase, trailing-slash form", () => {
    const invalid = redirectRules.filter((rule) => {
      const check = (path: string) => path === path.toLowerCase() && path.endsWith("/") && path.startsWith("/");
      return !check(rule.source) || !check(rule.destination);
    });
    expect(invalid, `Malformed redirect rule paths: ${JSON.stringify(invalid)}`).toEqual([]);
  });

  it("has a non-empty reason for every rule", () => {
    const missing = redirectRules.filter((rule) => !rule.reason.trim());
    expect(missing).toEqual([]);
  });
});

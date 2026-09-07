import { describe, expect, it } from "vitest";
import { contentManifest } from "@/content/manifest";
import { redirectRules } from "@/config/redirects";

/**
 * Automated content-audit suite, per this phase's brief section 16. Run in
 * isolation via `npm run content:audit`, or as part of the full `npm test`
 * run. A failing assertion here means a real publication error — Vitest
 * exits non-zero, which is what makes this suitable as a CI gate.
 */

const placeholderMarkers = [/\bTODO\b/i, /\bTBD\b/i, /lorem ipsum/i, /\[placeholder\]/i, /\bFIXME\b/i];

function findDuplicates(values: string[]): string[] {
  const seen = new Map<string, number>();
  for (const value of values) {
    seen.set(value, (seen.get(value) ?? 0) + 1);
  }
  return [...seen.entries()].filter(([, count]) => count > 1).map(([value]) => value);
}

describe("content manifest — required fields", () => {
  it("has at least one entry", () => {
    expect(contentManifest.length).toBeGreaterThan(0);
  });

  it("has no missing titles", () => {
    const missing = contentManifest.filter((entry) => !entry.title.trim());
    expect(missing, `Entries missing a title: ${missing.map((e) => e.canonicalPath).join(", ")}`).toEqual([]);
  });

  it("has no missing H1 values", () => {
    const missing = contentManifest.filter((entry) => !entry.h1.trim());
    expect(missing, `Entries missing an H1: ${missing.map((e) => e.canonicalPath).join(", ")}`).toEqual([]);
  });

  it("has no missing meta titles on indexable pages", () => {
    const missing = contentManifest.filter((entry) => entry.indexable && !entry.metaTitle.trim());
    expect(missing, `Indexable entries missing metaTitle: ${missing.map((e) => e.canonicalPath).join(", ")}`).toEqual([]);
  });

  it("has no missing meta descriptions on indexable pages", () => {
    const missing = contentManifest.filter((entry) => entry.indexable && !entry.metaDescription.trim());
    expect(missing, `Indexable entries missing metaDescription: ${missing.map((e) => e.canonicalPath).join(", ")}`).toEqual([]);
  });
});

describe("content manifest — uniqueness", () => {
  it("has no duplicate canonical paths", () => {
    const paths = contentManifest.map((entry) => entry.canonicalPath);
    const duplicates = findDuplicates(paths);
    expect(duplicates, `Duplicate canonicalPath values: ${duplicates.join(", ")}`).toEqual([]);
  });

  it("has no duplicate meta titles among indexable pages", () => {
    const titles = contentManifest.filter((e) => e.indexable).map((entry) => entry.metaTitle);
    const duplicates = findDuplicates(titles);
    expect(duplicates, `Duplicate metaTitle values among indexable pages: ${duplicates.join(", ")}`).toEqual([]);
  });

  it("has no duplicate meta descriptions among indexable pages", () => {
    const descriptions = contentManifest.filter((e) => e.indexable).map((entry) => entry.metaDescription);
    const duplicates = findDuplicates(descriptions);
    expect(duplicates, `Duplicate metaDescription values among indexable pages: ${duplicates.join(", ")}`).toEqual([]);
  });

  it("has no duplicate H1 values among indexable pages", () => {
    const h1s = contentManifest.filter((e) => e.indexable).map((entry) => entry.h1);
    const duplicates = findDuplicates(h1s);
    expect(duplicates, `Duplicate H1 values among indexable pages: ${duplicates.join(", ")}`).toEqual([]);
  });
});

describe("content manifest — route governance", () => {
  it("uses only known route statuses", () => {
    const allowed = new Set(["confirmed", "corrected", "redirected", "provisional", "future"]);
    const invalid = contentManifest.filter((entry) => !allowed.has(entry.routeStatus));
    expect(invalid, `Entries with unknown routeStatus: ${invalid.map((e) => e.canonicalPath).join(", ")}`).toEqual([]);
  });

  it("never marks a Provisional or Future route as indexable", () => {
    const wronglyIndexed = contentManifest.filter(
      (entry) => entry.indexable && (entry.routeStatus === "provisional" || entry.routeStatus === "future"),
    );
    expect(
      wronglyIndexed,
      `Provisional/Future routes marked indexable: ${wronglyIndexed.map((e) => e.canonicalPath).join(", ")}`,
    ).toEqual([]);
  });

  it("never marks a Redirected route as a publishable page", () => {
    const redirectedAsPage = contentManifest.filter((entry) => entry.routeStatus === "redirected");
    expect(
      redirectedAsPage,
      `Redirected routes present as pages: ${redirectedAsPage.map((e) => e.canonicalPath).join(", ")}`,
    ).toEqual([]);
  });

  it("has every canonical path in lowercase, hyphenated, trailing-slash form", () => {
    const invalid = contentManifest.filter((entry) => {
      const path = entry.canonicalPath;
      if (path === "/") return false;
      return path !== path.toLowerCase() || !path.endsWith("/") || !path.startsWith("/") || / /.test(path);
    });
    expect(invalid, `Invalid canonical paths: ${invalid.map((e) => e.canonicalPath).join(", ")}`).toEqual([]);
  });
});

describe("content manifest — redirect conflicts", () => {
  it("has no redirect source that is also a published canonical path", () => {
    const canonicalPaths = new Set(contentManifest.map((entry) => entry.canonicalPath));
    const conflicts = redirectRules.filter((rule) => canonicalPaths.has(rule.source));
    expect(
      conflicts,
      `Redirect sources that collide with a published page: ${conflicts.map((r) => r.source).join(", ")}`,
    ).toEqual([]);
  });
});

describe("content manifest — internal relationships", () => {
  it("has every relatedPages reference pointing to a real canonical path", () => {
    const canonicalPaths = new Set(contentManifest.map((entry) => entry.canonicalPath));
    const broken: string[] = [];
    for (const entry of contentManifest) {
      for (const related of entry.relatedPages ?? []) {
        if (!canonicalPaths.has(related)) {
          broken.push(`${entry.canonicalPath} -> ${related}`);
        }
      }
    }
    expect(broken, `Broken relatedPages references: ${broken.join(", ")}`).toEqual([]);
  });

  it("has every parent reference pointing to a real canonical path", () => {
    const canonicalPaths = new Set(contentManifest.map((entry) => entry.canonicalPath));
    const broken = contentManifest.filter((entry) => entry.parent && !canonicalPaths.has(entry.parent));
    expect(
      broken,
      `Entries with a broken parent reference: ${broken.map((e) => `${e.canonicalPath} -> ${e.parent}`).join(", ")}`,
    ).toEqual([]);
  });
});

describe("content manifest — placeholder leakage", () => {
  it("has no internal TODO/placeholder markers in public-facing fields", () => {
    const offenders: string[] = [];
    for (const entry of contentManifest) {
      const publicText = [entry.title, entry.metaTitle, entry.metaDescription, entry.h1].join(" ");
      for (const marker of placeholderMarkers) {
        if (marker.test(publicText)) {
          offenders.push(`${entry.canonicalPath} matched ${marker}`);
        }
      }
    }
    expect(offenders, `Placeholder markers found in public content: ${offenders.join(", ")}`).toEqual([]);
  });

  it("never exposes internal contentStatus/reviewStatus values as public copy", () => {
    const internalMarkers = ["ai-draft", "stakeholder-review-required", "stakeholder-approved"];
    const offenders: string[] = [];
    for (const entry of contentManifest) {
      const publicText = [entry.title, entry.metaTitle, entry.metaDescription, entry.h1].join(" ").toLowerCase();
      for (const marker of internalMarkers) {
        if (publicText.includes(marker)) {
          offenders.push(entry.canonicalPath);
        }
      }
    }
    expect(offenders, `Internal workflow markers leaked into public copy: ${offenders.join(", ")}`).toEqual([]);
  });
});

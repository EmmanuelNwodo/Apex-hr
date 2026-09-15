import { describe, expect, it, vi } from "vitest";
import type { Article } from "@/lib/wordpress";

const { getAllPublishedPostsForSitemap } = vi.hoisted(() => ({
  getAllPublishedPostsForSitemap: vi.fn(),
}));

vi.mock("@/lib/wordpress", () => ({ getAllPublishedPostsForSitemap }));

const { default: sitemap } = await import("@/app/sitemap");

function buildArticle(overrides: Partial<Article> = {}): Article {
  return {
    id: 1,
    slug: "how-to-build-a-great-hr-team",
    status: "publish",
    publishedAt: "2026-09-10T09:00:00.000Z",
    modifiedAt: "2026-09-11T10:00:00.000Z",
    title: "How to Build a Great HR Team",
    excerpt: "A short summary.",
    contentHtml: "<p>Body copy.</p>",
    featuredImage: null,
    categories: [],
    tags: [],
    author: null,
    seo: {},
    ...overrides,
  };
}

describe("sitemap — WordPress article entries", () => {
  it("includes a published article at the root-level /{slug}/ URL", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([buildArticle()]);

    const entries = await sitemap();
    const articleEntry = entries.find((entry) => entry.url.endsWith("/how-to-build-a-great-hr-team/"));

    expect(articleEntry).toBeTruthy();
    expect(articleEntry?.url).not.toContain("/insights/how-to-build-a-great-hr-team/");
  });

  it("never includes a blog.apexhrllc.co.uk (WordPress frontend) URL", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([buildArticle()]);
    const entries = await sitemap();
    expect(entries.some((entry) => entry.url.includes("blog.apexhrllc.co.uk"))).toBe(false);
  });

  it("uses the post's `modified` date as lastModified", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([buildArticle()]);
    const entries = await sitemap();
    const articleEntry = entries.find((entry) => entry.url.endsWith("/how-to-build-a-great-hr-team/"));
    expect(articleEntry?.lastModified).toEqual(new Date("2026-09-11T10:00:00.000Z"));
  });

  it("excludes an article whose slug collides with a reserved Apex HR route", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([buildArticle({ slug: "contact" })]);
    const entries = await sitemap();
    // "contact" still appears once, as the real static page from the
    // content manifest — never duplicated by a same-named WordPress post.
    const contactEntries = entries.filter((entry) => new URL(entry.url).pathname === "/contact/");
    expect(contactEntries).toHaveLength(1);
  });

  it("preserves every existing local (non-article) sitemap entry alongside articles", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([buildArticle()]);
    const entries = await sitemap();
    expect(entries.some((entry) => entry.url.endsWith("/services/"))).toBe(true);
    expect(entries.some((entry) => entry.url.endsWith("/sector/"))).toBe(true);
  });

  it("contributes zero article entries (without failing) when WordPress is unavailable", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([]);
    const entries = await sitemap();
    // 220 local, indexable manifest entries (211 + the Insights hub and its
    // 8 categories, indexable since docs/URL-DECISION-REGISTER.md D-016) —
    // see tests/unit/final-consolidated-seo-phase.test.tsx for the
    // authoritative count assertion.
    expect(entries.length).toBe(220);
  });

  it("handles an empty WordPress response gracefully", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([]);
    await expect(sitemap()).resolves.toBeInstanceOf(Array);
  });
});

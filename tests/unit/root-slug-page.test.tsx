import { describe, expect, it, vi } from "vitest";
import type { Article } from "@/lib/wordpress";

// vi.mock's factory is hoisted above regular `const` declarations, so the
// mock functions themselves must come from vi.hoisted() to exist in time.
const { getPostBySlug, getRelatedPosts } = vi.hoisted(() => ({
  getPostBySlug: vi.fn(),
  getRelatedPosts: vi.fn(),
}));

vi.mock("@/lib/wordpress", () => ({
  getPostBySlug,
  getRelatedPosts,
}));

const { default: ArticlePage, generateMetadata } = await import("@/app/[slug]/page");

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
    featuredImage: { url: "https://blog.apexhrllc.co.uk/wp-content/uploads/team.jpg", alt: "A team meeting" },
    categories: [{ id: 4, name: "Leadership", slug: "leadership" }],
    tags: [],
    author: { name: "Jordan Smith" },
    seo: {},
    ...overrides,
  };
}

describe("app/[slug]/page — root-level article route", () => {
  it("renders a known, published article slug", async () => {
    getPostBySlug.mockResolvedValueOnce(buildArticle());
    getRelatedPosts.mockResolvedValueOnce([]);

    const result = await ArticlePage({ params: Promise.resolve({ slug: "how-to-build-a-great-hr-team" }) });
    expect(result).toBeTruthy();
    expect(getPostBySlug).toHaveBeenCalledWith("how-to-build-a-great-hr-team");
  });

  it("calls notFound() for an unknown slug", async () => {
    getPostBySlug.mockResolvedValueOnce(null);

    await expect(
      ArticlePage({ params: Promise.resolve({ slug: "no-such-article" }) }),
    ).rejects.toThrow();
  });

  it("calls notFound() for a reserved slug WITHOUT ever calling the WordPress data layer", async () => {
    getPostBySlug.mockClear();

    await expect(ArticlePage({ params: Promise.resolve({ slug: "about" }) })).rejects.toThrow();
    expect(getPostBySlug).not.toHaveBeenCalled();

    await expect(ArticlePage({ params: Promise.resolve({ slug: "services" }) })).rejects.toThrow();
    await expect(ArticlePage({ params: Promise.resolve({ slug: "contact" }) })).rejects.toThrow();
    await expect(ArticlePage({ params: Promise.resolve({ slug: "api" }) })).rejects.toThrow();
    expect(getPostBySlug).not.toHaveBeenCalled();
  });

  it("excludes the current article from its own related-articles list", async () => {
    const source = buildArticle();
    const related = buildArticle({ id: 2, slug: "second-article", title: "Second article" });
    getPostBySlug.mockResolvedValueOnce(source);
    getRelatedPosts.mockResolvedValueOnce([related]);

    await ArticlePage({ params: Promise.resolve({ slug: "how-to-build-a-great-hr-team" }) });
    expect(getRelatedPosts).toHaveBeenCalledWith(source, 3);
  });
});

describe("app/[slug]/page — generateMetadata", () => {
  it("uses the public www.apexhrllc.co.uk canonical, never the blog origin", async () => {
    getPostBySlug.mockResolvedValueOnce(buildArticle());
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "how-to-build-a-great-hr-team" }) });

    const canonical = metadata.alternates?.canonical;
    expect(String(canonical)).not.toContain("blog.apexhrllc.co.uk");
  });

  it("falls back to the WordPress title/excerpt when no Yoast SEO fields are present", async () => {
    getPostBySlug.mockResolvedValueOnce(buildArticle({ seo: {} }));
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "how-to-build-a-great-hr-team" }) });

    expect(metadata.title).toBe("How to Build a Great HR Team");
    expect(metadata.description).toBe("A short summary.");
  });

  it("prefers Yoast SEO fields when present", async () => {
    getPostBySlug.mockResolvedValueOnce(
      buildArticle({ seo: { title: "Yoast title", description: "Yoast description" } }),
    );
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "how-to-build-a-great-hr-team" }) });

    expect(metadata.title).toBe("Yoast title");
    expect(metadata.description).toBe("Yoast description");
  });

  it("returns a non-indexable fallback for a reserved slug without calling WordPress", async () => {
    getPostBySlug.mockClear();
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "contact" }) });
    expect(metadata.robots).toMatchObject({ index: false });
    expect(getPostBySlug).not.toHaveBeenCalled();
  });

  it("returns a non-indexable fallback for an unknown slug", async () => {
    getPostBySlug.mockResolvedValueOnce(null);
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "no-such-article" }) });
    expect(metadata.robots).toMatchObject({ index: false });
  });
});

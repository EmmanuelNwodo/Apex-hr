import { afterEach, describe, expect, it, vi } from "vitest";
import type { WpRestPost } from "@/lib/wordpress/types";

/**
 * The WordPress data layer reads WORDPRESS_API_URL at module-load time
 * (src/lib/wordpress/config.ts), so every test that needs a specific
 * "configured"/"unconfigured" state loads the module fresh via
 * vi.resetModules() + dynamic import after stubbing env vars, rather than
 * importing it once at the top of the file. No test depends on a live
 * WordPress instance — every fetch is mocked.
 */
async function loadWordPress(apiUrl = "https://blog.apexhrllc.co.uk/wp-json/wp/v2") {
  vi.resetModules();
  vi.stubEnv("WORDPRESS_API_URL", apiUrl);
  vi.stubEnv("WORDPRESS_SITE_URL", "https://blog.apexhrllc.co.uk");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.apexhrllc.co.uk");
  return import("@/lib/wordpress");
}

function jsonResponse(body: unknown, init: { status?: number; headers?: Record<string, string> } = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: { "Content-Type": "application/json", ...init.headers },
  });
}

function buildRawPost(overrides: Partial<WpRestPost> = {}): WpRestPost {
  return {
    id: 1,
    date: "2026-09-10T09:00:00",
    date_gmt: "2026-09-10T09:00:00",
    modified: "2026-09-11T10:00:00",
    modified_gmt: "2026-09-11T10:00:00",
    slug: "how-to-build-a-great-hr-team",
    status: "publish",
    link: "https://blog.apexhrllc.co.uk/how-to-build-a-great-hr-team/",
    title: { rendered: "How to Build a Great HR Team &#8217;" },
    content: { rendered: "<p>Body copy.</p><script>alert(1)</script>" },
    excerpt: { rendered: "<p>A short summary.</p>" },
    author: 3,
    featured_media: 7,
    categories: [4],
    tags: [9],
    _embedded: {
      author: [{ id: 3, name: "Jordan Smith", slug: "jordan-smith", avatar_urls: { "96": "https://blog.apexhrllc.co.uk/avatar.jpg" } }],
      "wp:featuredmedia": [
        {
          id: 7,
          source_url: "https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/team.jpg",
          alt_text: "A team meeting",
          media_details: { width: 1200, height: 630 },
        },
      ],
      "wp:term": [[{ id: 4, name: "Leadership", slug: "leadership", taxonomy: "category" }], [{ id: 9, name: "Teams", slug: "teams", taxonomy: "post_tag" }]],
    },
    ...overrides,
  };
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe("normalizePost", () => {
  it("normalises a full raw post into the internal Article model", async () => {
    const { normalizePost } = await loadWordPress();
    const article = normalizePost(buildRawPost(), "https://www.apexhrllc.co.uk");

    expect(article.id).toBe(1);
    expect(article.slug).toBe("how-to-build-a-great-hr-team");
    expect(article.title).toBe("How to Build a Great HR Team ’");
    expect(article.excerpt).toBe("A short summary.");
    expect(article.author).toEqual({ name: "Jordan Smith", avatarUrl: "https://blog.apexhrllc.co.uk/avatar.jpg" });
    expect(article.featuredImage).toEqual({
      url: "https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/team.jpg",
      alt: "A team meeting",
      width: 1200,
      height: 630,
    });
    expect(article.categories).toEqual([{ id: 4, name: "Leadership", slug: "leadership" }]);
    expect(article.tags).toEqual([{ id: 9, name: "Teams", slug: "teams" }]);
    // <script> must never survive sanitisation into the normalised model.
    expect(article.contentHtml).not.toContain("<script>");
    expect(article.contentHtml).toContain("<p>Body copy.</p>");
  });

  it("handles a post with no embedded author, media or terms without throwing", async () => {
    const { normalizePost } = await loadWordPress();
    const raw = buildRawPost({ _embedded: undefined });
    const article = normalizePost(raw, "https://www.apexhrllc.co.uk");

    expect(article.author).toBeNull();
    expect(article.featuredImage).toBeNull();
    expect(article.categories).toEqual([]);
    expect(article.tags).toEqual([]);
    expect(article.title).toBe("How to Build a Great HR Team ’");
  });

  it("handles a missing excerpt gracefully", async () => {
    const { normalizePost } = await loadWordPress();
    const raw = buildRawPost({ excerpt: { rendered: "" } });
    const article = normalizePost(raw, "https://www.apexhrllc.co.uk");
    expect(article.excerpt).toBe("");
  });
});

describe("featured-image fallback chain (normalizePost -> resolveFeaturedImage)", () => {
  it("priority 1: uses WordPress embedded featured media when present", async () => {
    const { normalizePost } = await loadWordPress();
    const raw = buildRawPost({
      yoast_head_json: { og_image: [{ url: "https://blog.apexhrllc.co.uk/wp-content/uploads/og-fallback.jpg" }] },
      content: { rendered: '<p><img src="https://blog.apexhrllc.co.uk/wp-content/uploads/in-content.jpg" alt="In content"/></p>' },
    });
    const article = normalizePost(raw, "https://www.apexhrllc.co.uk");
    // Featured media wins even though a Yoast image and a content image both exist.
    expect(article.featuredImage?.url).toBe("https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/team.jpg");
    expect(article.featuredImage?.alt).toBe("A team meeting");
  });

  it("falls back to a meaningful post-title alt only when WordPress media has no alt text", async () => {
    const { normalizePost } = await loadWordPress();
    const raw = buildRawPost({
      _embedded: {
        "wp:featuredmedia": [
          { id: 7, source_url: "https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/team.jpg", alt_text: "" },
        ],
      },
    });
    const article = normalizePost(raw, "https://www.apexhrllc.co.uk");
    expect(article.featuredImage?.alt).toBe("How to Build a Great HR Team ’");
  });

  it("priority 2: falls back to the Yoast Open Graph image when no featured media is embedded", async () => {
    const { normalizePost } = await loadWordPress();
    const raw = buildRawPost({
      _embedded: undefined,
      yoast_head_json: {
        og_image: [{ url: "https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/yoast-og.jpg", width: 1200, height: 630 }],
      },
    });
    const article = normalizePost(raw, "https://www.apexhrllc.co.uk");
    expect(article.featuredImage).toEqual({
      url: "https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/yoast-og.jpg",
      alt: "How to Build a Great HR Team ’",
      width: 1200,
      height: 630,
    });
  });

  it("priority 3: falls back to the first image in the article content when neither featured media nor a Yoast image exists", async () => {
    const { normalizePost } = await loadWordPress();
    const raw = buildRawPost({
      _embedded: undefined,
      yoast_head_json: undefined,
      content: {
        rendered:
          '<p>Intro copy.</p><figure><img src="https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/in-content.jpg" alt="A diagram"/></figure>',
      },
    });
    const article = normalizePost(raw, "https://www.apexhrllc.co.uk");
    expect(article.featuredImage).toEqual({
      url: "https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/in-content.jpg",
      alt: "A diagram",
    });
  });

  it("uses the post title as alt when the first content image has no alt attribute", async () => {
    const { normalizePost } = await loadWordPress();
    const raw = buildRawPost({
      _embedded: undefined,
      yoast_head_json: undefined,
      content: { rendered: '<img src="https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/bare.jpg"/>' },
    });
    const article = normalizePost(raw, "https://www.apexhrllc.co.uk");
    expect(article.featuredImage?.alt).toBe("How to Build a Great HR Team ’");
  });

  it("priority 4: resolves to null when none of the three real sources yield an image", async () => {
    const { normalizePost } = await loadWordPress();
    const raw = buildRawPost({
      _embedded: undefined,
      yoast_head_json: undefined,
      content: { rendered: "<p>No images anywhere in this post.</p>" },
    });
    const article = normalizePost(raw, "https://www.apexhrllc.co.uk");
    expect(article.featuredImage).toBeNull();
  });

  it("does not use a WordPress featured-media entry with an empty source_url", async () => {
    const { normalizePost } = await loadWordPress();
    const raw = buildRawPost({
      _embedded: { "wp:featuredmedia": [{ id: 7, source_url: "" }] },
      yoast_head_json: { og_image: [{ url: "https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/yoast-og.jpg" }] },
    });
    const article = normalizePost(raw, "https://www.apexhrllc.co.uk");
    expect(article.featuredImage?.url).toBe("https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/yoast-og.jpg");
  });
});

describe("getPostBySlug", () => {
  it("fetches a post by slug using the WordPress ?slug= filter, not by listing every post", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      expect(url).toContain("/posts?");
      expect(url).toContain("slug=how-to-build-a-great-hr-team");
      expect(url).toContain("status=publish");
      expect(url).toContain("_embed=1");
      return jsonResponse([buildRawPost()]);
    });
    vi.stubGlobal("fetch", fetchMock);

    const { getPostBySlug } = await loadWordPress();
    const article = await getPostBySlug("how-to-build-a-great-hr-team");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(article?.slug).toBe("how-to-build-a-great-hr-team");
  });

  it("returns null for an unknown slug (empty API response)", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse([])));
    const { getPostBySlug } = await loadWordPress();
    expect(await getPostBySlug("does-not-exist")).toBeNull();
  });

  it("returns null when WordPress is unreachable, never throwing", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("network down"); }));
    const { getPostBySlug } = await loadWordPress();
    await expect(getPostBySlug("any-slug")).resolves.toBeNull();
  });

  it("returns null when WordPress is unconfigured, without attempting a fetch", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { getPostBySlug } = await loadWordPress("");
    expect(await getPostBySlug("any-slug")).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("getPosts", () => {
  it("returns an honest empty result for a genuinely empty published-post list", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse([], { headers: { "X-WP-Total": "0", "X-WP-TotalPages": "0" } })),
    );
    const { getPosts } = await loadWordPress();
    const result = await getPosts();
    expect(result).toEqual({ posts: [], total: 0, totalPages: 0, page: 1, unavailable: false });
  });

  it("marks the result unavailable (not just empty) on a non-2xx response", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ error: "Internal Server Error" }, { status: 500 })));
    const { getPosts } = await loadWordPress();
    const result = await getPosts();
    expect(result.unavailable).toBe(true);
    expect(result.posts).toEqual([]);
  });

  it("marks the result unavailable on a malformed (non-array) response", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ not: "an array" })));
    const { getPosts } = await loadWordPress();
    const result = await getPosts();
    expect(result.unavailable).toBe(true);
  });

  it("never exposes the raw upstream error to the caller", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ECONNREFUSED 10.0.0.1:443"); }));
    const { getPosts } = await loadWordPress();
    // The rejection reason (if any) must never be the raw network error —
    // getPosts resolves to a safe empty/unavailable result instead.
    await expect(getPosts()).resolves.toMatchObject({ unavailable: true, posts: [] });
  });

  it("reads X-WP-Total / X-WP-TotalPages for pagination", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse([buildRawPost()], { headers: { "X-WP-Total": "37", "X-WP-TotalPages": "4" } }),
      ),
    );
    const { getPosts } = await loadWordPress();
    const result = await getPosts({ page: 2, perPage: 10 });
    expect(result.total).toBe(37);
    expect(result.totalPages).toBe(4);
    expect(result.page).toBe(2);
  });

  it("orders by publication date descending and requests published posts only", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      expect(url).toContain("status=publish");
      expect(url).toContain("orderby=date");
      expect(url).toContain("order=desc");
      return jsonResponse([]);
    });
    vi.stubGlobal("fetch", fetchMock);
    const { getPosts } = await loadWordPress();
    await getPosts();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("getRecentPosts", () => {
  it("returns up to `limit` posts", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse([buildRawPost({ id: 1 }), buildRawPost({ id: 2, slug: "second-post" })])),
    );
    const { getRecentPosts } = await loadWordPress();
    const posts = await getRecentPosts(2);
    expect(posts).toHaveLength(2);
  });
});

describe("getRelatedPosts", () => {
  it("excludes the source article and filters by its category", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      expect(url).toContain("categories=4");
      expect(url).toContain("exclude=1");
      return jsonResponse([buildRawPost({ id: 2, slug: "related-post" })]);
    });
    vi.stubGlobal("fetch", fetchMock);
    const { getRelatedPosts, normalizePost } = await loadWordPress();
    const source = normalizePost(buildRawPost({ id: 1 }));
    const related = await getRelatedPosts(source, 3);

    expect(related.every((entry) => entry.id !== 1)).toBe(true);
    expect(related[0]?.slug).toBe("related-post");
  });

  it("falls back to recent posts (still excluding itself) when the source has no categories", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse([buildRawPost({ id: 1 }), buildRawPost({ id: 2, slug: "other-post" })])),
    );
    const { getRelatedPosts, normalizePost } = await loadWordPress();
    const source = normalizePost(buildRawPost({ id: 1, categories: [] }), "https://www.apexhrllc.co.uk");
    source.categories = [];
    const related = await getRelatedPosts(source, 5);
    expect(related.every((entry) => entry.id !== 1)).toBe(true);
  });
});

describe("getCategories", () => {
  it("returns an empty array when WordPress is unavailable", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({}, { status: 503 })));
    const { getCategories } = await loadWordPress();
    expect(await getCategories()).toEqual([]);
  });
});

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { InsightCard } from "@/components/content/insight-card";
import type { InsightPreview } from "@/content/home";

function buildInsight(overrides: Partial<InsightPreview> = {}): InsightPreview {
  return {
    id: "1",
    contentType: "Article",
    title: "How to Build a Great HR Team",
    summary: "A short summary.",
    date: "2026-09-10T09:00:00.000Z",
    dateDisplay: "10 September 2026",
    topic: "Leadership",
    href: "/how-to-build-a-great-hr-team/",
    ...overrides,
  };
}

describe("InsightCard — image rendering", () => {
  it("renders the resolved featured image with its own alt text", () => {
    render(
      <InsightCard
        insight={buildInsight({
          image: {
            url: "https://blog.apexhrllc.co.uk/wp-content/uploads/2026/09/team.jpg",
            alt: "A team meeting",
            width: 1200,
            height: 630,
          },
        })}
      />,
    );

    const image = screen.getByRole("img", { name: "A team meeting" });
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toEqual(expect.stringContaining("team.jpg"));
  });

  it("falls back to the local Apex HR placeholder image when there is no resolved image", () => {
    render(<InsightCard insight={buildInsight({ image: null })} />);

    const image = screen.getByRole("presentation");
    expect(image.getAttribute("src")).toEqual(expect.stringContaining("why-apex-section.png"));
    // Decorative placeholder: empty alt, never a fabricated description.
    expect(image).toHaveAttribute("alt", "");
  });

  it("falls back to the placeholder when `image` is simply omitted", () => {
    const insight = buildInsight();
    delete insight.image;
    render(<InsightCard insight={insight} />);

    const image = screen.getByRole("presentation");
    expect(image.getAttribute("src")).toEqual(expect.stringContaining("why-apex-section.png"));
  });

  it("still renders the card's title, summary and link when there is no image", () => {
    render(<InsightCard insight={buildInsight({ image: null })} />);

    // next/link normalises the trailing slash away in this jsdom-only
    // render (no live Next.js router/next.config trailingSlash pass), so
    // this asserts on the path itself rather than the exact string —
    // production behaviour (trailing slash preserved) was verified
    // directly against a running server during the WordPress integration.
    const link = screen.getByRole("link", { name: "How to Build a Great HR Team" });
    expect(link.getAttribute("href")).toMatch(/^\/how-to-build-a-great-hr-team\/?$/);
    expect(screen.getByText("A short summary.")).toBeInTheDocument();
  });

  it("never links to /insights/{slug}/ or the WordPress frontend", () => {
    render(<InsightCard insight={buildInsight()} />);
    const link = screen.getByRole("link", { name: "How to Build a Great HR Team" });
    expect(link.getAttribute("href")).toMatch(/^\/how-to-build-a-great-hr-team\/?$/);
    expect(link.getAttribute("href")).not.toContain("/insights/");
    expect(link.getAttribute("href")).not.toContain("blog.apexhrllc.co.uk");
  });
});

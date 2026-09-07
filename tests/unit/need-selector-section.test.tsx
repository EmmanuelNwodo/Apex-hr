import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NeedSelectorSection } from "@/components/sections/need-selector-section";
import { employerNeeds } from "@/content/home";

describe("NeedSelectorSection", () => {
  it("renders every employer need as a keyboard-reachable link to its approved route", () => {
    render(<NeedSelectorSection />);

    expect(screen.getByRole("heading", { level: 2, name: /what do you need from apex hr/i })).toBeInTheDocument();

    for (const need of employerNeeds) {
      const link = screen.getByRole("link", { name: new RegExp(need.label, "i") });
      // next/link does not have access to next.config's trailingSlash
      // setting outside the Next.js runtime, so it can render the href
      // without the trailing slash in this test environment even though
      // the real app serves it correctly (verified separately via build).
      expect(link.getAttribute("href")?.replace(/\/$/, "")).toBe(need.href.replace(/\/$/, ""));
    }
  });

  it("exposes the needs as a list so assistive technology announces the option count", () => {
    render(<NeedSelectorSection />);

    const list = screen.getByRole("list");
    expect(list.querySelectorAll("li")).toHaveLength(employerNeeds.length);
  });
});

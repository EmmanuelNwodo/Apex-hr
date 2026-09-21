import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileMenu } from "@/components/navigation/mobile-menu";

describe("MobileMenu", () => {
  it("opens the drawer, exposes the primary nav and Find Talent CTA, and restores focus on close", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    const trigger = screen.getByRole("button", { name: /open menu/i });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(trigger);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /find talent/i })).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close menu/i });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(trigger).toHaveFocus();
  });

  it("closes when a navigation link is activated", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await screen.findByRole("dialog");

    await user.click(screen.getByRole("link", { name: /about/i }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("expands the Services disclosure to reveal category and service links", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await screen.findByRole("dialog");

    const servicesToggle = screen.getByRole("button", { name: /services/i });
    expect(servicesToggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link", { name: /permanent recruitment/i })).not.toBeInTheDocument();

    await user.click(servicesToggle);

    expect(servicesToggle).toHaveAttribute("aria-expanded", "true");
    // next/link cannot read next.config's trailingSlash setting outside the
    // Next.js runtime, so hrefs render without the trailing slash here even
    // though the real app serves it correctly (verified separately via build).
    expect(
      screen.getByRole("link", { name: /permanent recruitment/i }).getAttribute("href")?.replace(/\/$/, ""),
    ).toBe("/services/permanent-recruitment-firm-in-the-uk");
    expect(
      screen.getByRole("link", { name: /view all services/i }).getAttribute("href")?.replace(/\/$/, ""),
    ).toBe("/services");
  });
});

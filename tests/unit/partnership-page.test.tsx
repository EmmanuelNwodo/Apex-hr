import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PartnershipPage, { metadata } from "@/app/partnership/page";
import { routes } from "@/config/routes";
import { getLocalSitemapGroups } from "@/lib/seo/sitemap-data";
import { absoluteUrl } from "@/config/site";

describe("partnership page", () => {
  it("publishes its approved route and metadata in the page sitemap", () => {
    expect(routes.partnership.path).toBe("/partnership/");
    expect(getLocalSitemapGroups().page.map((entry) => entry.loc)).toContain(absoluteUrl("/partnership/"));
    expect(metadata.title).toBe("HR Partnership & Pricing");
    expect(metadata.description).toContain("fractional Chief Human Resources Officer services");
  });

  it("renders all four plans, allocations, and the full role title", () => {
    render(<PartnershipPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Your dedicated people partner, on retainer." })).toBeInTheDocument();
    expect(screen.getByText("From £500 / month")).toBeInTheDocument();
    expect(screen.getByText("From £1,000 / month")).toBeInTheDocument();
    expect(screen.getByText("From £2,500 / month")).toBeInTheDocument();
    expect(screen.getAllByText("Custom pricing", { exact: true }).length).toBeGreaterThan(1);
    expect(screen.getAllByText("2 days", { exact: true })).toHaveLength(2);
    expect(screen.getAllByText("5 days", { exact: true })).toHaveLength(2);
    expect(screen.getAllByText("10 days", { exact: true })).toHaveLength(2);
    expect(screen.getAllByText("Discuss requirements").length).toBeGreaterThan(0);
    expect(document.body.textContent).toContain("fractional Chief Human Resources Officer services");
    expect(document.body.textContent).not.toMatch(/\bCHRO\b/);
  });

  it("uses a semantic comparison table and the existing contact enquiry flow", () => {
    render(<PartnershipPage />);

    expect(screen.getByRole("table", { name: "Partnership tier comparison" })).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "Monthly advisory allocation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore partnership tiers" })).toHaveAttribute("href", "#partnership-tiers");
    const consultationLinks = screen.getAllByRole("link", { name: "Book a consultation" });
    expect(consultationLinks).toHaveLength(2);
    expect(consultationLinks.every((link) => link.getAttribute("href") === "/contact#contact-form-area")).toBe(true);
    expect(screen.getAllByRole("link", { name: /Discuss (Starter|Growth|Scale|Enterprise) Partner/ })).toHaveLength(8);
  });
});
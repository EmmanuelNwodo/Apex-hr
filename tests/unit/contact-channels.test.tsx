import { fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ContactPage from "@/app/contact/page";
import { FloatingContactButton } from "@/components/layout/floating-contact-button";
import { siteConfig } from "@/config/site";
import { getOrganizationJsonLd } from "@/lib/seo/structured-data";

describe("public contact channels", () => {
  it("centralizes the approved email and WhatsApp contact values", () => {
    expect(siteConfig.contactEmail).toBe("hello@apexhrllc.co.uk");
    expect(siteConfig.contactPhoneDisplay).toBe("+44 7762 272692");
    expect(siteConfig.whatsappNumber).toBe("447762272692");
    expect(siteConfig.whatsappUrl).toBe("https://wa.me/447762272692");
  });

  it("renders the contact page with the approved email and WhatsApp-only contact options", () => {
    const html = renderToString(<ContactPage />);
    expect(html).toContain("hello@apexhrllc.co.uk");
    expect(html).toContain('href="mailto:hello@apexhrllc.co.uk"');
    expect(html).toContain("Reach us on WhatsApp:");
    expect(html).toContain("+44 7762 272692");
    expect(html).toContain("Message us on WhatsApp");
    expect(html).not.toMatch(/href="tel:[^"]*"/i);

    const whatsappLinks = html.match(/<a\b[^>]*href="https:\/\/wa\.me\/447762272692"[^>]*>/g) ?? [];
    expect(whatsappLinks).toHaveLength(2);
    for (const link of whatsappLinks) {
      expect(link).toContain('target="_blank"');
      expect(link).toContain('rel="noopener noreferrer"');
    }
  });

  it("provides a WhatsApp-only floating contact action with a descriptive link name", () => {
    render(<FloatingContactButton />);
    fireEvent.click(screen.getByRole("button", { name: "Contact Apex HR" }));

    const whatsappLink = screen.getByRole("link", { name: "Message us on WhatsApp" });
    expect(whatsappLink).toHaveAttribute("href", "https://wa.me/447762272692");
    expect(whatsappLink).toHaveAttribute("target", "_blank");
    expect(whatsappLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByRole("link", { name: /call/i })).not.toBeInTheDocument();
  });

  it("publishes an email-only Organization contact point, not callable telephone schema", () => {
    const organization = getOrganizationJsonLd();
    const contactPoint = organization.contactPoint;

    expect(contactPoint.email).toBe("hello@apexhrllc.co.uk");
    expect(contactPoint).not.toHaveProperty("telephone");
    expect(JSON.stringify(organization)).not.toContain("+44 7762 272692");
  });
});

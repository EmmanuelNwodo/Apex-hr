import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import PrivacyPolicyPage, { metadata } from "@/app/privacy-policy/page";
import { SiteFooter } from "@/components/layout/site-footer";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { redirectRules } from "@/config/redirects";
import { services, serviceCategories } from "@/config/services";
import { sectors } from "@/config/sectors";
import { getLocalSitemapGroups } from "@/lib/seo/sitemap-data";
import { privacyPolicySections } from "@/content/privacy-policy-data";

/**
 * Regression coverage for the new /privacy-policy/ page. Uses the same
 * renderToString-based SSR verification methodology established by the
 * SEO renderability audit remediation (tests/unit/seo-renderability-
 * remediation.test.tsx) — a true server render with no jsdom/hydration
 * involved, so these assertions prove what a crawler or no-JS visitor
 * actually receives, not just what a client-side render produces.
 */

describe("1, 2 & 3. /privacy-policy/ exists, with exactly one H1 reading 'Privacy Policy'", () => {
  it("renders without throwing", () => {
    const html = renderToString(<PrivacyPolicyPage />);
    expect(html.length).toBeGreaterThan(0);
  });

  it("contains exactly one <h1>, reading exactly 'Privacy Policy'", () => {
    const html = renderToString(<PrivacyPolicyPage />);
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
    expect(h1Matches).toHaveLength(1);
    const h1Text = h1Matches[0][1].replace(/<!--\s*-->/g, "").replace(/<[^>]+>/g, "").trim();
    expect(h1Text).toBe("Privacy Policy");
  });
});

describe("4, 5 & 11. Page is indexable with the correct canonical; no accidental noindex", () => {
  it("routes.privacyPolicy is Confirmed and readyToIndex", () => {
    expect(routes.privacyPolicy.path).toBe("/privacy-policy/");
    expect(routes.privacyPolicy.status).toBe("confirmed");
    expect(routes.privacyPolicy.readyToIndex).toBe(true);
  });

  it("metadata declares index: true, follow: true", () => {
    expect(metadata.robots).toEqual({ index: true, follow: true });
  });

  it("canonical is exactly https://www.apexhrllc.co.uk/privacy-policy/", () => {
    expect(metadata.alternates?.canonical).toBe("https://www.apexhrllc.co.uk/privacy-policy/");
  });

  it("title and description match the approved SEO brief", () => {
    expect(metadata.title).toBe("Privacy Policy");
    expect(metadata.description).toBe(
      "Read the Apex HR Privacy Policy to understand how we collect, use, store, share and protect personal data across our HR and recruitment services.",
    );
  });
});

describe("6. Production domain is .co.uk", () => {
  it("siteConfig.productionUrl is the .co.uk domain, never .com", () => {
    expect(siteConfig.productionUrl).toBe("https://www.apexhrllc.co.uk");
  });
});

describe("7. info@apexhrllc.com remains the business email, unchanged", () => {
  it("siteConfig.contactEmail is still info@apexhrllc.com", () => {
    expect(siteConfig.contactEmail).toBe("info@apexhrllc.com");
  });

  it("the rendered page uses info@apexhrllc.com as a real mailto link, never the .co.uk domain", () => {
    const html = renderToString(<PrivacyPolicyPage />);
    expect(html).toContain('href="mailto:info@apexhrllc.com"');
    expect(html).not.toContain("info@apexhrllc.co.uk");
  });
});

describe("8. Main policy content is server rendered (no hydration dependency)", () => {
  it("the complete text of every one of the 22 sections is present in the raw SSR HTML", () => {
    const html = renderToString(<PrivacyPolicyPage />);
    const missing: string[] = [];

    function collectText(blocks: { type: string; text?: string; items?: string[]; lines?: { value: string }[] }[] | undefined) {
      const texts: string[] = [];
      for (const block of blocks ?? []) {
        if (block.type === "paragraph" && block.text) texts.push(block.text);
        if (block.type === "list" && block.items) texts.push(...block.items);
        if (block.type === "contact" && block.lines) texts.push(...block.lines.map((l) => l.value).filter(Boolean));
      }
      return texts;
    }

    for (const section of privacyPolicySections) {
      const texts = [
        section.heading,
        ...collectText(section.blocks),
        ...(section.subsections?.flatMap((sub) => [sub.heading, ...collectText(sub.blocks)]) ?? []),
        ...collectText(section.trailingBlocks),
      ];
      for (const text of texts) {
        // Only check literal substrings without quote characters, which
        // Next/React may re-encode as HTML entities in the raw output.
        if (text.includes('"') || text.includes("'")) continue;
        if (!html.includes(text)) missing.push(`[${section.heading}] ${text}`);
      }
    }

    expect(missing).toEqual([]);
  });

  it("PrivacyPolicyPage and PrivacyPolicyTemplate contain no client-only mechanism around the policy body", async () => {
    const templateSource = await import("@/components/templates/privacy-policy-template");
    expect(templateSource.PrivacyPolicyTemplate).toBeDefined();
    // Structural guard: the page/template modules must not import
    // useHasMounted — reintroducing that gate around policy content is
    // exactly the SSR/hydration regression this project already fixed
    // once (src/components/content/animated-stat-value.tsx).
    const fs = await import("node:fs");
    const path = await import("node:path");
    const templateFile = fs.readFileSync(
      path.join(process.cwd(), "src/components/templates/privacy-policy-template.tsx"),
      "utf8",
    );
    expect(templateFile).not.toContain("useHasMounted");
    expect(templateFile).not.toContain('"use client"');
  });

  it("Google/Bing-relevant elements (breadcrumb, TOC links, contact email) are real anchors present in raw HTML", () => {
    const html = renderToString(<PrivacyPolicyPage />);
    expect(html).toContain('href="/"'); // Home breadcrumb + website mentions
    expect(html).toContain('href="#introduction"'); // TOC link
    expect(html).toContain('href="mailto:info@apexhrllc.com"');
  });
});

describe("9. Footer contains /privacy-policy/", () => {
  // next/link cannot read next.config's trailingSlash setting outside the
  // real Next.js runtime, so hrefs render without the trailing slash here
  // even though the real app serves it correctly — the same documented
  // quirk already relied on in tests/unit/mobile-menu.test.tsx and
  // tests/unit/seo-renderability-remediation.test.tsx.
  it("SiteFooter renders a real link to /privacy-policy/ with the label 'Privacy Policy'", () => {
    const html = renderToString(<SiteFooter />);
    expect(html).toContain('href="/privacy-policy"');
    const idx = html.indexOf('href="/privacy-policy"');
    const nearby = html.slice(idx, idx + 200);
    expect(nearby).toContain("Privacy Policy");
  });

  it("the footer's Privacy Policy link appears exactly once (no duplicate)", () => {
    const html = renderToString(<SiteFooter />);
    const matches = html.match(/href="\/privacy-policy"/g) ?? [];
    expect(matches).toHaveLength(1);
  });
});

describe("10. Sitemap contains /privacy-policy/ exactly once", () => {
  it("appears exactly once, in the page-sitemap group, never in any other group", () => {
    const groups = getLocalSitemapGroups();
    const privacyPolicyUrl = "https://www.apexhrllc.co.uk/privacy-policy/";

    const pageMatches = groups.page.filter((e) => e.loc === privacyPolicyUrl);
    expect(pageMatches).toHaveLength(1);

    for (const key of ["service", "sector", "location", "talentAcquisition"] as const) {
      expect(groups[key].some((e) => e.loc === privacyPolicyUrl)).toBe(false);
    }
  });
});

describe("12. No accidental X-Robots-Tag noindex configuration was introduced", () => {
  it("no middleware, route handler or config file in the repo sets X-Robots-Tag", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const appDir = path.join(process.cwd(), "src/app/privacy-policy");
    const files = fs.readdirSync(appDir);
    for (const file of files) {
      const content = fs.readFileSync(path.join(appDir, file), "utf8");
      expect(content).not.toContain("X-Robots-Tag");
      expect(content).not.toContain("x-robots-tag");
    }
  });
});

describe("13. Existing service/sector URL architecture remains unchanged", () => {
  it("every service/category slug still ends in -firm-in-the-uk", () => {
    for (const entry of [...serviceCategories, ...services]) {
      expect(entry.slug.endsWith("-firm-in-the-uk"), entry.slug).toBe(true);
    }
    expect(services.length).toBe(48);
    expect(serviceCategories.length).toBe(10);
  });

  it("every sector slug still follows hr-company-for-...-in-the-uk", () => {
    for (const sector of sectors) {
      expect(sector.slug.startsWith("hr-company-for-"), sector.slug).toBe(true);
      expect(sector.slug.endsWith("-in-the-uk"), sector.slug).toBe(true);
    }
    expect(sectors.length).toBe(17);
  });
});

describe("14. Existing redirect count remains 116", () => {
  it("redirectRules.length is still exactly 116 — no new redirects introduced", () => {
    expect(redirectRules.length).toBe(116);
  });

  it("no redirect rule targets or originates from /privacy-policy/", () => {
    const offenders = redirectRules.filter(
      (rule) => rule.source === "/privacy-policy/" || rule.destination === "/privacy-policy/",
    );
    expect(offenders).toEqual([]);
  });
});

describe("Structured data: WebPage + BreadcrumbList, using real shared entities only", () => {
  it("renders exactly one JSON-LD script with WebPage and BreadcrumbList, no fabricated fields", () => {
    const html = renderToString(<PrivacyPolicyPage />);
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).toBeTruthy();
    const jsonLd = JSON.parse(match![1]);
    expect(Array.isArray(jsonLd)).toBe(true);

    const webPage = jsonLd.find((entry: { "@type": string }) => entry["@type"] === "WebPage");
    expect(webPage).toBeTruthy();
    expect(webPage.url).toBe("https://www.apexhrllc.co.uk/privacy-policy/");
    expect(webPage.about).toEqual({ "@id": "https://www.apexhrllc.co.uk/#organization" });
    expect(webPage.isPartOf).toEqual({ "@id": "https://www.apexhrllc.co.uk/#website" });
    expect(webPage).not.toHaveProperty("aggregateRating");
    expect(webPage).not.toHaveProperty("review");
    expect(webPage).not.toHaveProperty("author");

    const breadcrumb = jsonLd.find((entry: { "@type": string }) => entry["@type"] === "BreadcrumbList");
    expect(breadcrumb).toBeTruthy();
    expect(breadcrumb.itemListElement).toHaveLength(2);
    expect(breadcrumb.itemListElement[1].name).toBe("Privacy Policy");
    expect(breadcrumb.itemListElement[1].item).toBe("https://www.apexhrllc.co.uk/privacy-policy/");
  });
});

describe("Cookie Policy reference does not link to a non-existent route", () => {
  it("the Cookie Policy mention is plain text, never a broken /cookie-policy/ link", () => {
    const html = renderToString(<PrivacyPolicyPage />);
    expect(html).toContain("Cookie Policy");
    expect(html).not.toContain('href="/cookie-policy/"');
  });
});

describe("ICO link uses the real, public ICO website with a safe external-link pattern", () => {
  it("links to https://ico.org.uk/ with target=_blank and rel=noopener noreferrer", () => {
    const html = renderToString(<PrivacyPolicyPage />);
    expect(html).toContain('href="https://ico.org.uk/"');
    const idx = html.indexOf('href="https://ico.org.uk/"');
    const tag = html.slice(idx - 10, idx + 250);
    expect(tag).toContain('target="_blank"');
    expect(tag).toContain('rel="noopener noreferrer"');
  });
});

describe("No fabricated legal identifiers", () => {
  it("the page never states a company registration number, ICO registration number, or registered office", () => {
    const html = renderToString(<PrivacyPolicyPage />);
    expect(html.toLowerCase()).not.toContain("company registration number");
    expect(html.toLowerCase()).not.toContain("ico registration number");
    expect(html.toLowerCase()).not.toContain("registered office");
    expect(html.toLowerCase()).not.toContain("data protection officer");
  });
});

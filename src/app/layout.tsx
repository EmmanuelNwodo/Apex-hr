import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingContactButton } from "@/components/layout/floating-contact-button";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.productionUrl),
  title: {
    template: siteConfig.titleTemplate,
    default: siteConfig.defaultTitle,
  },
  description: siteConfig.defaultDescription,
  // Site-wide Google Search Console ownership token. Declared once here (the
  // root layout, applied to every route) rather than per-page, since
  // buildMetadata() (src/lib/seo/metadata.ts) never sets `verification`
  // itself — Next.js's metadata merging carries this field through to every
  // page's <head> unchanged, so it can't be duplicated or overridden.
  verification: {
    google: "e0UimumOT4lUYc4E6Mbswhef7vdm9nNkkm7t3hXXUbM",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col overflow-x-clip antialiased">
        <SkipLink />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingContactButton />
      </body>
    </html>
  );
}

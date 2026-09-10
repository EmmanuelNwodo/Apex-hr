import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

interface BuildMetadataOptions {
  title: string;
  description?: string;
  path: string;
  /** Set false for placeholder/development pages so they are not indexed. */
  index?: boolean;
  ogImagePath?: string;
}

// Default, site-wide Open Graph/Twitter image — see src/app/api/og/route.tsx
// (SEO audit Batch 2 item 2). A caller passing its own `ogImagePath` (a
// genuine, more specific real image) overrides this per-page.
// Trailing slash matches next.config.ts's site-wide `trailingSlash: true` —
// without it, every page's og:image/twitter:image URL would 308-redirect
// once before actually serving the image.
const DEFAULT_OG_IMAGE_PATH = "/api/og/";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

/**
 * Builds page metadata from the shared site config so title formatting,
 * canonical URLs, Open Graph and robots directives stay consistent.
 * Only pass `index: true` once a page has real, approved content.
 */
export function buildMetadata({
  title,
  description = siteConfig.defaultDescription,
  path,
  index = false,
  ogImagePath = DEFAULT_OG_IMAGE_PATH,
}: BuildMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = {
    url: absoluteUrl(ogImagePath),
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    alt: siteConfig.defaultTitle,
  };

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.defaultLocale.replace("-", "_"),
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

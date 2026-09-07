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
  ogImagePath,
}: BuildMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);

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
      images: ogImagePath ? [{ url: absoluteUrl(ogImagePath) }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImagePath ? [absoluteUrl(ogImagePath)] : undefined,
    },
  };
}

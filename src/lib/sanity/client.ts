import { isSanityConfigured } from "./config";

/**
 * Provider-neutral content repository boundary (docs/CONTENT-MODEL.md
 * section 18). Vendor SDK usage stays inside this module so page/component
 * code never imports the Sanity client directly.
 *
 * The `@sanity/client` package is not installed yet — no queries run in
 * this phase. This stub exists so the repository shape is agreed before
 * the CMS project ID and dataset are confirmed.
 */
export interface ContentRepository {
  isConfigured(): boolean;
}

class UnconfiguredContentRepository implements ContentRepository {
  isConfigured(): boolean {
    return isSanityConfigured;
  }
}

export const contentRepository: ContentRepository = new UnconfiguredContentRepository();

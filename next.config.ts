import type { NextConfig } from "next";
import { redirectRules } from "./src/config/redirects";

const nextConfig: NextConfig = {
  // docs/URL-DECISION-REGISTER.md D-010: canonical URLs use a trailing
  // slash (except "/" itself). This serves those paths directly instead of
  // redirecting away from them.
  trailingSlash: true,

  // WordPress-hosted media (featured images, in-article images) for the
  // Insights/blog integration — see docs/URL-DECISION-REGISTER.md and
  // src/lib/wordpress/. Deliberately narrow to the confirmed WordPress
  // media host's uploads path only (every real image URL WordPress/Yoast
  // returns — featured media, og:image, in-content images — lives under
  // /wp-content/uploads/); never an arbitrary external host, and image
  // optimisation stays enabled (no `unoptimized: true`).
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.apexhrllc.co.uk",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },

  // Full 72-rule permanent redirect registry — see src/config/redirects.ts
  // and docs/URL-DECISION-REGISTER.md section "Redirect implementation
  // checklist". Validated for duplicate sources/loops in
  // tests/unit/redirects.test.ts.
  async redirects() {
    return redirectRules.map((rule) => ({
      source: rule.source,
      destination: rule.destination,
      permanent: true,
    }));
  },
};

export default nextConfig;

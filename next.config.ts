import type { NextConfig } from "next";
import { redirectRules } from "./src/config/redirects";

const nextConfig: NextConfig = {
  // docs/URL-DECISION-REGISTER.md D-010: canonical URLs use a trailing
  // slash (except "/" itself). This serves those paths directly instead of
  // redirecting away from them.
  trailingSlash: true,

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

import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * Default, site-wide Open Graph / Twitter card image (SEO audit Batch 2
 * item 2). Generated at request time with next/og's ImageResponse — no
 * external image dependency, since no approved logo asset exists yet (see
 * the doc comment on src/components/ui/logo.tsx). Purely typographic and
 * brand-coloured: no people, office, award or statistic is depicted, so
 * nothing here can misrepresent unverified claims. Every page defaults to
 * this image via buildMetadata()'s `ogImagePath`; a page may override it
 * with a genuine, more specific image where one exists.
 */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#2b2733",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 116, fontWeight: 700 }}>
          <span style={{ color: "#faf6f0" }}>Apex</span>
          <span style={{ color: "#b8966b", marginLeft: 22 }}>HR</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 32,
            lineHeight: 1.45,
            color: "#d9d2e3",
            maxWidth: 980,
          }}
        >
          {siteConfig.defaultDescription}
        </div>
        <div style={{ display: "flex", marginTop: 64, alignItems: "center" }}>
          <div style={{ display: "flex", width: 56, height: 2, background: "#b8966b" }} />
          <div
            style={{
              display: "flex",
              marginLeft: 20,
              fontSize: 24,
              color: "#b8966b",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            apexhrllc.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // The card is static (no per-request data), so it's safe to cache
      // hard at the edge/CDN and in social-scraper caches. `must-revalidate`
      // is omitted deliberately — this response is meant to be reused
      // as-is for its lifetime.
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}

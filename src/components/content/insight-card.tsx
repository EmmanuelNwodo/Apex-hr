import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { INSIGHT_IMAGE_PLACEHOLDER } from "@/lib/wordpress";
import type { InsightPreview } from "@/content/home";

interface InsightCardProps {
  insight: InsightPreview;
}

/**
 * Insight/article preview card, per DESIGN.md section 16 "Insight cards"
 * ("image optional; do not force low-quality imagery") and section 19.3's
 * `16:10`/`3:2` insight-card crop ratio. `insight.image` has already been
 * through the full featured-image fallback chain (WordPress featured media
 * -> Yoast OG image -> first content image) before it reaches this
 * component — see src/lib/wordpress/client.ts's `resolveFeaturedImage` —
 * so the only fallback this component itself applies is the local Apex HR
 * placeholder, never an external image service.
 */
export function InsightCard({ insight }: InsightCardProps) {
  const image = insight.image ?? null;

  return (
    <Card className="flex h-full flex-col p-6 hover:border-navy">
      <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-md bg-surface-warm">
        <Image
          src={image?.url ?? INSIGHT_IMAGE_PLACEHOLDER}
          alt={image?.alt ?? ""}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <p className="mt-5 text-small font-semibold uppercase tracking-[0.08em] text-gold-ink">
        {insight.contentType} &middot; {insight.topic}
      </p>
      <h3 className="mt-3 font-display text-h4 font-bold text-navy">
        <Link href={insight.href} className="hover:underline">
          {insight.title}
        </Link>
      </h3>
      <p className="mt-2 text-body text-text-secondary">{insight.summary}</p>
      {insight.date && (
        <p className="mt-4 text-small text-text-secondary">
          <time dateTime={insight.date}>{insight.dateDisplay ?? insight.date}</time>
        </p>
      )}
    </Card>
  );
}

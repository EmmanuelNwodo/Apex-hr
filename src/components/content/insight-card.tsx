import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { InsightPreview } from "@/content/home";

interface InsightCardProps {
  insight: InsightPreview;
}

/** Insight/article preview card, per DESIGN.md section 16 "Insight cards". */
export function InsightCard({ insight }: InsightCardProps) {
  return (
    <Card className="p-6 hover:border-navy">
      <p className="text-small font-semibold uppercase tracking-[0.08em] text-gold-ink">
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
          <time dateTime={insight.date}>{insight.date}</time>
        </p>
      )}
    </Card>
  );
}

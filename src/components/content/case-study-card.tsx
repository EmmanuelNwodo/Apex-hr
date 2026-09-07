import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { CaseStudyPreview } from "@/content/home";

interface CaseStudyCardProps {
  caseStudy: CaseStudyPreview;
}

/**
 * Case study preview card, per DESIGN.md section 16 "Case-study cards".
 * Only render this with verified, approved evidence — see
 * EmptyEditorialState for the fallback used while none exists.
 */
export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Card className="p-6 hover:border-navy">
      <h3 className="font-display text-h4 font-bold text-navy">
        <Link href={caseStudy.href} className="hover:underline">
          {caseStudy.title}
        </Link>
      </h3>
      <p className="mt-2 text-body text-text-secondary">{caseStudy.summary}</p>
    </Card>
  );
}

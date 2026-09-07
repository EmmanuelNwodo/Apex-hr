import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { ExpertPreview } from "@/content/home";

interface ExpertCardProps {
  expert: ExpertPreview;
}

/**
 * Practitioner profile preview card, per DESIGN.md section 16 "Expert
 * cards". Only render this with real, approved people — see
 * EmptyEditorialState for the fallback when no profiles are approved yet.
 */
export function ExpertCard({ expert }: ExpertCardProps) {
  return (
    <Card className="p-6">
      {expert.imageSrc && (
        <div className="relative mb-4 aspect-[4/5] w-full overflow-hidden rounded-md bg-surface-warm">
          <Image
            src={expert.imageSrc}
            alt={`Portrait of ${expert.name}`}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        </div>
      )}
      <h3 className="font-display text-h4 font-bold text-navy">
        <Link href={expert.href} className="hover:underline">
          {expert.name}
        </Link>
      </h3>
      <p className="mt-1 text-body font-semibold text-gold-ink">{expert.role}</p>
      <p className="mt-2 text-body text-text-secondary">{expert.bio}</p>
    </Card>
  );
}

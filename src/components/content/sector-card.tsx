import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface SectorCardProps {
  title: string;
  href: string;
  imageSrc?: string;
}

/**
 * Sector preview card, per DESIGN.md section 16 "Sector cards" and the
 * homepage photo-grid layout requested for the sectors section. Renders
 * an approved sector photo with the sector name overlaid, or — when no
 * photo is approved for a sector yet — falls back to a plain text tile
 * rather than a generic placeholder stock image.
 */
export function SectorCard({ title, href, imageSrc }: SectorCardProps) {
  if (!imageSrc) {
    return (
      <Card className="p-0 hover:border-navy">
        <Link
          href={href}
          className="flex aspect-square items-center justify-center p-5 text-center text-body font-semibold text-navy"
        >
          {title}
        </Link>
      </Card>
    );
  }

  return (
    <Link href={href} className="group relative block aspect-square overflow-hidden rounded-md">
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="(min-width: 1024px) 256px, (min-width: 640px) 224px, 160px"
        className="object-cover transition-transform duration-(--duration-slow) group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/5 to-transparent" />
      <span className="absolute bottom-5 left-5 font-display text-body-lg font-bold text-white">
        {title}
      </span>
    </Link>
  );
}

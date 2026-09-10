import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  href: string;
  description: string;
  imageSrc: string;
}

/**
 * Service family preview card, per DESIGN.md section 16 "Service cards".
 * Structured as a dark, image-led tile (navy surface, per the
 * surface-dark/text-reversed tokens already used by the site footer) — the
 * whole card is a single link, not just its title.
 *
 * The description fades in only on hover/keyboard-focus (`group-hover`/
 * `group-focus-visible`) and fades out otherwise. It stays an `opacity`
 * transition rather than a height/visibility one, so the card's own box
 * never resizes — hovering one card in the marquee can't stretch its
 * neighbours — and, since the text is only visually faded (not
 * `hidden`/`display:none`), it stays in the DOM for screen readers and
 * crawlers rather than being hover-only content, per CLAUDE.md section 15.
 */
export function ServiceCard({ title, href, description, imageSrc }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col gap-5 rounded-md bg-surface-dark p-5 text-text-reversed transition-colors duration-(--duration-fast) hover:bg-navy/90"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-md bg-navy">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-(--duration-slow) group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="font-display text-h4 font-bold text-text-reversed">{title}</h3>
        <p className="mt-2 text-body text-text-reversed/75 opacity-0 transition-opacity duration-(--duration-fast) group-hover:opacity-100 group-focus-visible:opacity-100">
          {description}
        </p>
        <ArrowRight
          aria-hidden="true"
          className="mt-4 h-5 w-5 text-gold transition-transform duration-(--duration-fast) group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

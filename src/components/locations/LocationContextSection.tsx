import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LocationMap } from "@/components/locations/LocationMap";
import type { LocationItem } from "@/config/locations";

interface LocationContextSectionProps {
  title: string;
  location: LocationItem;
  region: string;
  localContext: string;
}

/**
 * "Local context" section: heading and local-market copy beside the
 * branded UK locator map (see LocationMap). One data-driven section
 * reused by every individual location page — see
 * src/components/templates/location-page-template.tsx — never a
 * per-location component.
 */
export function LocationContextSection({ title, location, region, localContext }: LocationContextSectionProps) {
  return (
    <section className="bg-surface-page py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
        <div>
          <SectionKicker tone="light">Local context</SectionKicker>
          <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-navy">
            People support shaped around {title} businesses
          </h2>
          <p className="mt-4 max-w-lg text-body-lg text-text-secondary">{localContext}</p>
          <Link
            href="#relevant-services"
            className="group mt-6 inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold-ink"
          >
            Learn more about our local expertise
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <LocationMap location={location} region={region} />
      </div>
    </section>
  );
}

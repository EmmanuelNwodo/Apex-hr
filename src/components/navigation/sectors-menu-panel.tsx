import Link from "next/link";
import { sectors } from "@/config/sectors";
import { routes } from "@/config/routes";

/** Sectors mega-menu content: every sector, per src/config/sectors.ts. */
export function SectorsMenuPanel() {
  return (
    <div className="w-[min(90vw,40rem)]">
      <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
        {sectors.map((sector) => (
          <li key={sector.slug}>
            <Link
              href={`/sector/${sector.slug}/`}
              className="text-body text-text-secondary underline-offset-4 hover:text-navy hover:underline"
            >
              {sector.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-border-subtle pt-4">
        <Link
          href={routes.sectors.path}
          className="text-body font-semibold text-navy underline-offset-4 hover:underline"
        >
          View all sectors
        </Link>
      </div>
    </div>
  );
}

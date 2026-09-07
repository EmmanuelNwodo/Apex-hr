import Link from "next/link";
import { getServicesByCategory, serviceCategories } from "@/config/services";
import { routes } from "@/config/routes";

/**
 * Services mega-menu content: every category with its child services, per
 * the canonical taxonomy in src/config/services.ts. A category slug is a
 * real page (src/app/services/[slug]/page.tsx renders ServiceCategoryTemplate
 * for it), so category titles link there rather than being inert text.
 */
export function ServicesMenuPanel() {
  return (
    <div className="w-[min(90vw,60rem)]">
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 xl:grid-cols-5">
        {serviceCategories.map((category) => (
          <div key={category.slug}>
            <Link
              href={`/services/${category.slug}/`}
              className="text-small font-semibold text-navy underline-offset-4 hover:underline"
            >
              {category.title}
            </Link>
            <ul className="mt-3 flex flex-col gap-2">
              {getServicesByCategory(category.slug).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="text-small text-text-secondary underline-offset-4 hover:text-navy hover:underline"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-border-subtle pt-4">
        <Link
          href={routes.services.path}
          className="text-body font-semibold text-navy underline-offset-4 hover:underline"
        >
          View all services
        </Link>
      </div>
    </div>
  );
}

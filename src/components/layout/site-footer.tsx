import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/layout/container";
import { footerNavigation, primaryCta } from "@/config/navigation";
import { LinkButton } from "@/components/ui/link-button";
import { siteConfig } from "@/config/site";

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { route: { id: string; path: string; label: string } }[];
}) {
  return (
    <div>
      <h2 className="text-small font-semibold uppercase tracking-[0.08em] text-gold">
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.route.id}>
            <Link
              href={item.route.path}
              className="text-body text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              {item.route.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Global site footer per DESIGN.md section 13. */
export function SiteFooter() {
  return (
    <footer className="bg-surface-dark text-text-reversed">
      <Container size="wide" className="py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo surface="dark" />
            <p className="mt-4 max-w-sm text-body text-white/80">
              A UK HR, recruitment and people-consulting partner for employers.
            </p>
            <LinkButton
              href={primaryCta.route.path}
              variant="secondary"
              surface="dark"
              size="compact"
              className="mt-6"
              data-analytics-id="footer-find-talent"
            >
              {primaryCta.label}
            </LinkButton>
          </div>

          <FooterColumn title="Employers" items={footerNavigation.employers} />
          <FooterColumn title="Candidates" items={footerNavigation.candidates} />
          <FooterColumn title="Company" items={footerNavigation.company} />
        </div>

        <div className="mt-14 border-t border-white/15 pt-8 text-small text-white/60">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

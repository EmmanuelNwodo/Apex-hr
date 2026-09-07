import { Logo } from "@/components/ui/logo";
import { LinkButton } from "@/components/ui/link-button";
import { Container } from "@/components/layout/container";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { NavLink } from "@/components/navigation/nav-link";
import { NavMenu } from "@/components/navigation/nav-menu";
import { ServicesMenuPanel } from "@/components/navigation/services-menu-panel";
import { SectorsMenuPanel } from "@/components/navigation/sectors-menu-panel";
import { candidateCta, primaryCta, primaryNavigation, utilityNavigation } from "@/config/navigation";

const navLinkClassName = "text-body font-semibold text-navy underline-offset-4 hover:underline";

/**
 * Global site header: sticky, solid Cream background per DESIGN.md 12.1-12.2.
 * The scroll-triggered height/transparency micro-interaction described in
 * 12.2 is deferred — this phase ships a stable-height, always-solid header
 * to keep behaviour predictable and accessible.
 *
 * The full desktop nav (6 primary links + Contact + Search Jobs + Find
 * Talent) does not fit the 1024px `lg` breakpoint without wrapping or
 * overflow, so the switch from the mobile menu to the inline nav happens
 * at `xl` (1280px) instead — verified against DESIGN.md 9.3's breakpoint
 * table, which does not mandate the inline nav appear at `lg`.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle bg-surface-page">
      <Container size="wide">
        <div className="flex h-[68px] items-center justify-between xl:h-[92px]">
          <Logo surface="light" />

          <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
            {primaryNavigation.map((item) => {
              const activeClassName = "underline decoration-gold decoration-2 underline-offset-4";

              if (item.route.id === "services") {
                return (
                  <NavMenu
                    key={item.route.id}
                    label={item.route.label}
                    href={item.route.path}
                    linkClassName={navLinkClassName}
                    activeClassName={activeClassName}
                  >
                    <ServicesMenuPanel />
                  </NavMenu>
                );
              }

              if (item.route.id === "sectors") {
                return (
                  <NavMenu
                    key={item.route.id}
                    label={item.route.label}
                    href={item.route.path}
                    linkClassName={navLinkClassName}
                    activeClassName={activeClassName}
                  >
                    <SectorsMenuPanel />
                  </NavMenu>
                );
              }

              return (
                <NavLink
                  key={item.route.id}
                  href={item.route.path}
                  className={navLinkClassName}
                  activeClassName={activeClassName}
                >
                  {item.route.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="hidden items-center gap-5 xl:flex">
            {utilityNavigation.map((item) => (
              <NavLink
                key={item.route.id}
                href={item.route.path}
                className="text-body text-text-secondary underline-offset-4 hover:underline hover:text-navy"
              >
                {item.route.label}
              </NavLink>
            ))}
            <NavLink
              href={candidateCta.route.path}
              data-analytics-id={candidateCta.analyticsId}
              className="text-body font-semibold text-navy underline-offset-4 hover:underline"
            >
              {candidateCta.label}
            </NavLink>
            <LinkButton
              href={primaryCta.route.path}
              variant="primary"
              surface="light"
              size="compact"
              data-analytics-id={primaryCta.analyticsId}
            >
              {primaryCta.label}
            </LinkButton>
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}

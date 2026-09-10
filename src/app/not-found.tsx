import { Section } from "@/components/layout/section";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { routes } from "@/config/routes";

export default function NotFound() {
  return (
    <Section tone="page" className="text-center">
      <SectionKicker>404</SectionKicker>
      <h1 className="mt-3 font-display text-h1 font-bold text-navy">Page not found</h1>
      <p className="mx-auto mt-4 max-w-[50ch] text-body-lg text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <LinkButton href={routes.home.path} variant="primary" surface="light">
          Go to homepage
        </LinkButton>
        <LinkButton href={routes.contact.path} variant="secondary" surface="light">
          Contact Apex HR
        </LinkButton>
      </div>
    </Section>
  );
}

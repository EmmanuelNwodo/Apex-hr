import { Container } from "@/components/layout/container";

export default function JobsLoading() {
  return (
    <main aria-busy="true" aria-label="Loading Job Board">
      <div className="bg-navy py-16">
        <Container size="wide">
          <div className="h-4 w-28 animate-pulse rounded bg-white/20" />
          <div className="mt-8 h-12 max-w-lg animate-pulse rounded bg-white/20" />
          <div className="mt-4 h-5 max-w-2xl animate-pulse rounded bg-white/20" />
        </Container>
      </div>
      <Container size="wide" className="py-12">
        <p role="status" className="text-body text-text-secondary">Loading current vacancies…</p>
      </Container>
    </main>
  );
}

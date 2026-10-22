import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Vacancy } from "@/lib/wordpress";

const { getVacancyBySlug, getOpenVacancies, isVacancyOpen } = vi.hoisted(() => ({
  getVacancyBySlug: vi.fn(),
  getOpenVacancies: vi.fn(),
  isVacancyOpen: vi.fn(),
}));

vi.mock("@/lib/wordpress", () => ({
  getVacancyBySlug,
  getOpenVacancies,
  isVacancyOpen,
  stripHtmlToPlainText: (value: string) => value.replace(/<[^>]+>/g, ""),
}));
vi.mock("next/navigation", () => ({
  notFound: () => { throw new Error("NEXT_NOT_FOUND"); },
}));

import VacancyPage, { generateMetadata } from "@/app/jobs/[slug]/page";

function buildVacancy(overrides: Partial<Vacancy> = {}): Vacancy {
  return {
    id: 24,
    slug: "people-partner",
    status: "open",
    title: "People Partner",
    reference: "APEX-024",
    summary: "Support managers and teams.",
    descriptionHtml: "<p>Role details.</p>",
    responsibilities: ["Support managers"],
    requirements: ["HR experience"],
    desirableSkills: [],
    benefits: [],
    sector: "Professional Services",
    department: "Human Resources",
    location: "London",
    employmentType: "Permanent",
    workplaceArrangement: "Hybrid",
    seniority: "Senior",
    salaryMin: null,
    salaryMax: null,
    salaryCurrency: "",
    salaryDisplay: "",
    salaryUnit: "",
    closingDate: "",
    applicationEmail: "",
    featured: false,
    seoTitle: "",
    metaDescription: "",
    publishedAt: "2026-09-20T09:00:00.000Z",
    modifiedAt: "2026-09-21T10:00:00.000Z",
    ...overrides,
  };
}

describe("vacancy detail route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getOpenVacancies.mockResolvedValue({ vacancies: [], unavailable: false });
    isVacancyOpen.mockImplementation((vacancy: Vacancy) => vacancy.status === "open");
  });

  it("renders application UI and JobPosting JSON-LD for an open vacancy", async () => {
    getVacancyBySlug.mockResolvedValue(buildVacancy());

    const page = await VacancyPage({ params: Promise.resolve({ slug: "people-partner" }) });
    const html = renderToString(page);

    expect(html).toContain("<h1");
    expect(html).toContain("People Partner");
    expect(html).toContain("Apply for This Role");
    expect(html).toContain('"@type":"JobPosting"');
    expect(html).toContain("application-email");
  });

  it("keeps a closed vacancy explanatory but removes application and JobPosting data", async () => {
    getVacancyBySlug.mockResolvedValue(buildVacancy({ status: "closed" }));

    const page = await VacancyPage({ params: Promise.resolve({ slug: "people-partner" }) });
    const html = renderToString(page);

    expect(html).toContain("Applications for this vacancy are closed.");
    expect(html).not.toContain('"@type":"JobPosting"');
    expect(html).not.toContain("application-email");
  });

  it("marks closed vacancy metadata noindex while retaining its canonical URL", async () => {
    getVacancyBySlug.mockResolvedValue(buildVacancy({ status: "closed" }));

    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "people-partner" }) });

    expect(metadata.robots).toMatchObject({ index: false, follow: true });
    expect(metadata.alternates?.canonical).toBe("https://www.apexhrllc.co.uk/jobs/people-partner/");
  });
});

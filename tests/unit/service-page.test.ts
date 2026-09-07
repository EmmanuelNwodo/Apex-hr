import { describe, expect, it } from "vitest";
import ServiceOrCategoryPage, { generateMetadata } from "@/app/services/[slug]/page";

describe("services/[slug] page — dynamic route resolution", () => {
  it("renders a known service slug without throwing", async () => {
    const result = await ServiceOrCategoryPage({ params: Promise.resolve({ slug: "executive-search" }) });
    expect(result).toBeTruthy();
  });

  it("renders a known category slug without throwing", async () => {
    const result = await ServiceOrCategoryPage({
      params: Promise.resolve({ slug: "recruitment-talent-acquisition" }),
    });
    expect(result).toBeTruthy();
  });

  it("calls notFound() for an unknown slug", async () => {
    await expect(
      ServiceOrCategoryPage({ params: Promise.resolve({ slug: "not-a-real-service-slug" }) }),
    ).rejects.toThrow();
  });
});

describe("services/[slug] page — metadata generation", () => {
  it("generates a title and description for a known service", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "executive-search" }) });
    expect(metadata.title).toBe("Executive Search");
    expect(metadata.description).toBeTruthy();
  });

  it("falls back to a generic title for an unknown slug without throwing", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "not-a-real-service-slug" }) });
    expect(metadata.title).toBe("Service");
  });
});

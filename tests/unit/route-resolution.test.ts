import { describe, expect, it } from "vitest";
import { getService, getServiceCategory, services, serviceCategories } from "@/config/services";
import { getSector, sectors } from "@/config/sectors";
import { getLocation, locations } from "@/config/locations";
import { talentRoleContent } from "@/content/talent-roles-data";
import { serviceContent, serviceCategoryContent } from "@/content/services-data";
import { sectorContent } from "@/content/sectors-data";
import { locationContent } from "@/content/locations-data";

describe("route resolution — valid slugs", () => {
  it("resolves every configured service slug", () => {
    for (const service of services) {
      expect(getService(service.slug)).toBeDefined();
    }
  });

  it("resolves every configured category slug", () => {
    for (const category of serviceCategories) {
      expect(getServiceCategory(category.slug)).toBeDefined();
    }
  });

  it("resolves every configured sector slug", () => {
    for (const sector of sectors) {
      expect(getSector(sector.slug)).toBeDefined();
    }
  });

  it("resolves every configured location slug", () => {
    for (const location of locations) {
      expect(getLocation(location.slug)).toBeDefined();
    }
  });
});

describe("route resolution — invalid slugs", () => {
  it("returns undefined for an unknown service slug", () => {
    expect(getService("not-a-real-service")).toBeUndefined();
  });

  it("returns undefined for an unknown category slug", () => {
    expect(getServiceCategory("not-a-real-category")).toBeUndefined();
  });

  it("returns undefined for an unknown sector slug", () => {
    expect(getSector("not-a-real-sector")).toBeUndefined();
  });

  it("returns undefined for an unknown location slug", () => {
    expect(getLocation("not-a-real-location")).toBeUndefined();
  });
});

describe("content records — 1:1 coverage with route config", () => {
  it("has exactly one content record per configured service, with no extras", () => {
    const configSlugs = services.map((s) => s.slug).sort();
    const contentSlugs = serviceContent.map((s) => s.slug).sort();
    expect(contentSlugs).toEqual(configSlugs);
  });

  it("has exactly one content record per configured category, with no extras", () => {
    const configSlugs = serviceCategories.map((c) => c.slug).sort();
    const contentSlugs = serviceCategoryContent.map((c) => c.slug).sort();
    expect(contentSlugs).toEqual(configSlugs);
  });

  it("has exactly one content record per configured sector, with no extras", () => {
    const configSlugs = sectors.map((s) => s.slug).sort();
    const contentSlugs = sectorContent.map((s) => s.slug).sort();
    expect(contentSlugs).toEqual(configSlugs);
  });

  it("has exactly one content record per configured location, with no extras", () => {
    const configSlugs = locations.map((l) => l.slug).sort();
    const contentSlugs = locationContent.map((l) => l.slug).sort();
    expect(contentSlugs).toEqual(configSlugs);
  });

  it("has exactly 62 talent-acquisition role records with unique slugs", () => {
    expect(talentRoleContent.length).toBe(62);
    const slugs = new Set(talentRoleContent.map((r) => r.slug));
    expect(slugs.size).toBe(62);
  });
});

describe("content records — cross-reference integrity", () => {
  it("has every service's relatedServiceSlugs pointing to a real, different service", () => {
    for (const service of serviceContent) {
      for (const relatedSlug of service.relatedServiceSlugs) {
        expect(getService(relatedSlug), `${service.slug} -> ${relatedSlug}`).toBeDefined();
        expect(relatedSlug).not.toBe(service.slug);
      }
    }
  });

  it("has every service's relatedSectorSlugs pointing to a real sector", () => {
    for (const service of serviceContent) {
      for (const sectorSlug of service.relatedSectorSlugs) {
        expect(getSector(sectorSlug), `${service.slug} -> ${sectorSlug}`).toBeDefined();
      }
    }
  });

  it("has every sector's relatedServiceSlugs pointing to a real service", () => {
    for (const sector of sectorContent) {
      for (const serviceSlug of sector.relatedServiceSlugs) {
        expect(getService(serviceSlug), `${sector.slug} -> ${serviceSlug}`).toBeDefined();
      }
    }
  });

  it("has every talent role's relatedServiceSlugs and relatedSectorSlugs pointing to real records", () => {
    for (const role of talentRoleContent) {
      for (const serviceSlug of role.relatedServiceSlugs) {
        expect(getService(serviceSlug), `${role.slug} -> service ${serviceSlug}`).toBeDefined();
      }
      for (const sectorSlug of role.relatedSectorSlugs) {
        expect(getSector(sectorSlug), `${role.slug} -> sector ${sectorSlug}`).toBeDefined();
      }
    }
  });
});

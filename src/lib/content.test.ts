import { describe, expect, it } from "vitest";
import { projects, services } from "./content";

describe("shared cleaning content", () => {
  it("defines one service and three illustrative gallery items per cleaning category", () => {
    expect(services.map((service) => service.type)).toEqual([
      "Commercial",
      "Industrial",
      "Move in move out cleaning",
    ]);
    expect(projects).toHaveLength(9);
    expect(new Set(projects.map((project) => project.image)).size).toBe(projects.length);
    for (const service of services) {
      expect(projects.filter((project) => project.type === service.type)).toHaveLength(3);
      expect(
        projects.some(
          (project) => project.type === service.type && project.image === service.image,
        ),
      ).toBe(true);
    }
  });

  it("lists the requested commercial and industrial cleaning offerings", () => {
    const offerings = services.flatMap((service) => service.details);

    expect(offerings).toEqual(
      expect.arrayContaining([
        "Commercial and Office Cleaning",
        "Industrial and Warehouse Cleaning",
        "Floor scrubbing, Stripping and waxing",
        "Post-Construction Cleaning",
        "Restaurant and Kitchen Area Cleaning",
        "Common Areas and Building Entrances",
        "Parking Lot Litter Pick Up",
        "Carpet and Upholstery Cleaning",
        "Window and Glass Cleaning",
        "Washroom Cleaning and Sanitation",
        "Deep Cleaning",
      ]),
    );
  });
});

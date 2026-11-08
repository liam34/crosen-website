import { describe, expect, it } from "vitest";
import { projects, services } from "./content";

describe("shared cleaning content", () => {
  it("defines one service and illustrative gallery item per cleaning category", () => {
    expect(services.map((service) => service.type)).toEqual([
      "Commercial",
      "Industrial",
      "Residential",
    ]);
    expect(projects).toEqual(
      services.map((service) => ({
        title: service.title,
        type: service.type,
        image: service.image,
      })),
    );
  });
});

import { describe, expect, it } from "vitest";
import { formatBookingReference } from "./booking-reference";

describe("formatBookingReference", () => {
  it("formats a booking ID as the concise dashboard reference", () => {
    expect(formatBookingReference("3093d400-748b-4e0b-8129-46d2fb87e1bc")).toBe(
      "BK-3093-D400-748B",
    );
  });
});

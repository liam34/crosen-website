import { describe, expect, it } from "vitest";
import { bookingSchema } from "./booking-schema";

const validBooking = {
  serviceType: "commercial",
  fullName: "Taylor Sample",
  email: "taylor@example.com",
  phone: "780-555-0100",
  address: "100 Main Street, Edmonton, AB",
  bookingDate: "2099-12-31",
  bookingTime: "09:00-12:00",
  squareFootage: null,
  notes: "",
};

describe("booking schema", () => {
  it("accepts a complete booking request with optional fields left empty", () => {
    expect(bookingSchema.safeParse(validBooking).success).toBe(true);
  });

  it("rejects unsupported services and past dates", () => {
    expect(
      bookingSchema.safeParse({
        ...validBooking,
        serviceType: "residential",
      }).success,
    ).toBe(false);
    expect(
      bookingSchema.safeParse({
        ...validBooking,
        bookingDate: "2000-01-01",
      }).success,
    ).toBe(false);
  });

  it("rejects invalid email addresses and oversized notes", () => {
    expect(
      bookingSchema.safeParse({
        ...validBooking,
        email: "not-an-email",
      }).success,
    ).toBe(false);
    expect(
      bookingSchema.safeParse({
        ...validBooking,
        notes: "x".repeat(2_001),
      }).success,
    ).toBe(false);
  });
});

import { z } from "zod";
import { bookingServiceTypes } from "./content";

export const bookingTimeValues = ["09:00-12:00", "13:00-16:00"] as const;

export const bookingTimeLabels: Record<(typeof bookingTimeValues)[number], string> = {
  "09:00-12:00": "9:00 AM–12:00 PM",
  "13:00-16:00": "1:00 PM–4:00 PM",
};

export const bookingSpaceSizes = [
  "Under 1,000 sq ft",
  "1,000–5,000 sq ft",
  "5,001–10,000 sq ft",
  "Over 10,000 sq ft",
  "Not sure",
] as const;

function getEdmontonDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Edmonton",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

export const bookingSchema = z.object({
  serviceType: z.enum(bookingServiceTypes),
  fullName: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z.email("Enter a valid email address.").max(254),
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(40),
  address: z.string().trim().min(5, "Enter the service address.").max(500),
  bookingDate: z.iso
    .date()
    .refine((date) => date >= getEdmontonDate(), "Choose today or a future date."),
  bookingTime: z.enum(bookingTimeValues),
  squareFootage: z.enum(bookingSpaceSizes).nullable().optional(),
  notes: z.string().trim().max(2_000).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

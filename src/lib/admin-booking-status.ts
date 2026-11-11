export const adminBookingStatuses = ["pending", "booked", "cancelled"] as const;

export type AdminBookingStatus = (typeof adminBookingStatuses)[number];

export function isAdminBookingStatus(value: unknown): value is AdminBookingStatus {
  return typeof value === "string" && adminBookingStatuses.some((status) => status === value);
}

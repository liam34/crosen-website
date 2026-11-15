export function formatBookingReference(id: string) {
  const compactId = id.replaceAll("-", "").slice(0, 12).toUpperCase();
  return `BK-${compactId.slice(0, 4)}-${compactId.slice(4, 8)}-${compactId.slice(8)}`;
}

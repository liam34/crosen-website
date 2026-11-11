import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/booking-schema";
import { getTursoClient } from "@/lib/turso";

const maxBodyBytes = 16 * 1024;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > maxBodyBytes) {
    return NextResponse.json({ error: "Booking request is too large." }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "Please submit a valid booking." }, { status: 400 });
  }

  if (new TextEncoder().encode(rawBody).byteLength > maxBodyBytes) {
    return NextResponse.json({ error: "Booking request is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Please submit a valid booking." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check your booking details." },
      { status: 400 },
    );
  }

  if (!process.env.TURSO_DATABASE_URL?.trim() || !process.env.TURSO_AUTH_TOKEN?.trim()) {
    return NextResponse.json(
      { error: "Online booking is not configured. Please contact us directly." },
      { status: 503 },
    );
  }

  const booking = parsed.data;
  const id = randomUUID();

  try {
    await getTursoClient().execute({
      sql: `INSERT INTO bookings (
        id,
        service_type,
        full_name,
        email,
        phone,
        address,
        booking_date,
        booking_time,
        square_footage,
        notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        booking.serviceType,
        booking.fullName,
        booking.email,
        booking.phone,
        booking.address,
        booking.bookingDate,
        booking.bookingTime,
        booking.squareFootage ?? null,
        booking.notes || null,
      ],
    });

    return NextResponse.json({ success: true, bookingId: id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save booking to Turso.", error);
    return NextResponse.json(
      { error: "We couldn’t save your booking. Please try again later." },
      { status: 500 },
    );
  }
}

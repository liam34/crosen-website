import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminSessionCookie, getAdminConfiguration, hasValidAdminSession } from "@/lib/admin-auth";
import { getTursoClient } from "@/lib/turso";

const noStore = { "Cache-Control": "no-store" };

export async function GET() {
  if (!getAdminConfiguration()) {
    return NextResponse.json(
      { error: "Admin sign-in is not configured." },
      { status: 503, headers: noStore },
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(adminSessionCookie)?.value;
  if (!(await hasValidAdminSession(token))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401, headers: noStore });
  }

  try {
    const result = await getTursoClient().execute(
      `SELECT
        id,
        service_type,
        full_name,
        email,
        phone,
        address,
        booking_date,
        booking_time,
        square_footage,
        notes,
        status,
        created_at
      FROM bookings
      ORDER BY created_at DESC
      LIMIT 100`,
    );

    const bookings = result.rows.map((row) => ({
      id: String(row.id),
      serviceType: String(row.service_type),
      fullName: String(row.full_name),
      email: String(row.email),
      phone: String(row.phone),
      address: String(row.address),
      bookingDate: String(row.booking_date),
      bookingTime: String(row.booking_time),
      squareFootage: row.square_footage == null ? null : String(row.square_footage),
      notes: row.notes == null ? null : String(row.notes),
      status: String(row.status),
      createdAt: String(row.created_at),
    }));

    return NextResponse.json({ bookings }, { headers: noStore });
  } catch (error) {
    console.error("Failed to load bookings for admin dashboard.", error);
    return NextResponse.json(
      { error: "We couldn’t load bookings. Please try again later." },
      { status: 500, headers: noStore },
    );
  }
}

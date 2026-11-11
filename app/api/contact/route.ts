import { Resend } from "resend";
import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid message." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Please submit a valid message." }, { status: 400 });
  }

  if (
    !("name" in body) ||
    typeof body.name !== "string" ||
    !("email" in body) ||
    typeof body.email !== "string" ||
    !("phone" in body) ||
    typeof body.phone !== "string" ||
    !("service" in body) ||
    typeof body.service !== "string" ||
    !("message" in body) ||
    typeof body.message !== "string"
  ) {
    return NextResponse.json(
      { error: "Name, email, service, and message are required." },
      { status: 400 },
    );
  }

  const { name, email, phone, service, message } = body;
  const normalizedName = name.trim().replace(/\s+/g, " ");
  const normalizedEmail = email.trim();
  const normalizedPhone = phone.trim();
  const normalizedService = service.trim();
  const normalizedMessage = message.trim();

  if (
    !normalizedName ||
    normalizedName.length > 120 ||
    !emailPattern.test(normalizedEmail) ||
    normalizedEmail.length > 254 ||
    normalizedPhone.length > 40 ||
    !normalizedService ||
    normalizedService.length > 120 ||
    !normalizedMessage ||
    normalizedMessage.length > 10_000
  ) {
    return NextResponse.json(
      { error: "Please enter a valid name, email, and message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable. Please try again later." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["admin@crosenclean.ca"],
      replyTo: normalizedEmail,
      subject: `New Contact Form Message from ${normalizedName}`,
      text: `Name: ${normalizedName}\nEmail: ${normalizedEmail}\nPhone: ${
        normalizedPhone || "Not provided"
      }\nService: ${normalizedService}\n\nMessage:\n${normalizedMessage}`,
    });

    if (error) {
      return NextResponse.json(
        { error: "We couldn’t send your message. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "We couldn’t send your message. Please try again later." },
      { status: 500 },
    );
  }
}

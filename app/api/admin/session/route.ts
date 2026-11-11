import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  adminSessionCookie,
  adminSessionMaxAge,
  createAdminSession,
  getAdminConfiguration,
} from "@/lib/admin-auth";

const maxBodyBytes = 2 * 1024;
const maxAttempts = 5;
const attemptWindowMs = 15 * 60 * 1000;
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

const loginSchema = z.object({
  email: z.email().max(254),
  password: z.string().min(1).max(256),
});

function getClientKey(request: Request) {
  const directIp = request.headers.get("x-real-ip")?.trim();
  const forwardedIp = request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  return (directIp || forwardedIp || "unknown").slice(0, 100);
}

function checkRateLimit(key: string) {
  const now = Date.now();
  let attempt = loginAttempts.get(key);

  if (!attempt || attempt.resetAt <= now) {
    if (loginAttempts.size >= 500 && !loginAttempts.has(key)) {
      for (const [storedKey, storedAttempt] of loginAttempts) {
        if (storedAttempt.resetAt <= now) loginAttempts.delete(storedKey);
      }
      if (loginAttempts.size >= 500) {
        const oldestKey = loginAttempts.keys().next().value;
        if (oldestKey) loginAttempts.delete(oldestKey);
      }
    }

    attempt = { count: 0, resetAt: now + attemptWindowMs };
    loginAttempts.set(key, attempt);
  }

  if (attempt.count >= maxAttempts) {
    return Math.max(1, Math.ceil((attempt.resetAt - now) / 1000));
  }

  attempt.count += 1;
  return 0;
}

function constantTimeEqual(first: string, second: string) {
  const firstHash = createHash("sha256").update(first).digest();
  const secondHash = createHash("sha256").update(second).digest();
  return timingSafeEqual(firstHash, secondHash);
}

function invalidRequest() {
  return NextResponse.json({ error: "Please enter a valid email and password." }, { status: 400 });
}

export async function POST(request: Request) {
  const config = getAdminConfiguration();
  if (!config) {
    return NextResponse.json(
      { error: "Admin sign-in is not configured. Please contact the site administrator." },
      { status: 503 },
    );
  }

  const clientKey = getClientKey(request);
  const retryAfter = checkRateLimit(clientKey);
  if (retryAfter > 0) {
    return NextResponse.json(
      { error: "Too many sign-in attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > maxBodyBytes) {
    return NextResponse.json({ error: "Sign-in request is too large." }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return invalidRequest();
  }

  if (new TextEncoder().encode(rawBody).byteLength > maxBodyBytes) {
    return NextResponse.json({ error: "Sign-in request is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return invalidRequest();
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return invalidRequest();

  const email = parsed.data.email.trim().toLowerCase();
  const validEmail = constantTimeEqual(email, config.email);
  const validPassword = constantTimeEqual(parsed.data.password, config.password);

  if (!validEmail || !validPassword) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  loginAttempts.delete(clientKey);
  const token = await createAdminSession(config.email);
  const response = NextResponse.json(
    { success: true },
    { headers: { "Cache-Control": "no-store" } },
  );
  response.cookies.set(adminSessionCookie, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: adminSessionMaxAge,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true },
    { headers: { "Cache-Control": "no-store" } },
  );
  response.cookies.set(adminSessionCookie, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}

import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export const adminSessionCookie = "crosen_admin_session";
export const adminSessionMaxAge = 8 * 60 * 60;

type AdminConfiguration = {
  email: string;
  password: string;
  sessionKey: Uint8Array;
};

export function getAdminConfiguration(): AdminConfiguration | null {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !password ||
    password.length < 16 ||
    !sessionSecret ||
    Buffer.byteLength(sessionSecret, "utf8") < 32
  ) {
    return null;
  }

  return {
    email,
    password,
    sessionKey: new TextEncoder().encode(sessionSecret),
  };
}

export async function createAdminSession(email: string) {
  const config = getAdminConfiguration();
  if (!config) throw new Error("Admin authentication is not configured.");

  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${adminSessionMaxAge}s`)
    .sign(config.sessionKey);
}

export async function hasValidAdminSession(token: string | undefined) {
  const config = getAdminConfiguration();
  if (!config || !token) return false;

  try {
    const { payload } = await jwtVerify(token, config.sessionKey, {
      algorithms: ["HS256"],
    });
    return payload.sub === config.email;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return hasValidAdminSession(cookieStore.get(adminSessionCookie)?.value);
}

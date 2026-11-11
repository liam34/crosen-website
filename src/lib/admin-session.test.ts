import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DELETE, POST } from "../../app/api/admin/session/route";

vi.mock("server-only", () => ({}));

const originalEnvironment = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  sessionSecret: process.env.ADMIN_SESSION_SECRET,
};

function loginRequest(
  email = "admin@crosenclean.ca",
  password = "test-password-that-is-long-enough",
) {
  return new Request("http://localhost/api/admin/session", {
    method: "POST",
    headers: { "content-type": "application/json", "x-real-ip": "203.0.113.5" },
    body: JSON.stringify({ email, password }),
  });
}

describe("admin session API", () => {
  beforeEach(() => {
    process.env.ADMIN_EMAIL = "admin@crosenclean.ca";
    process.env.ADMIN_PASSWORD = "test-password-that-is-long-enough";
    process.env.ADMIN_SESSION_SECRET = "test-session-secret-with-at-least-32-bytes";
  });

  afterEach(() => {
    if (originalEnvironment.email === undefined) delete process.env.ADMIN_EMAIL;
    else process.env.ADMIN_EMAIL = originalEnvironment.email;
    if (originalEnvironment.password === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = originalEnvironment.password;
    if (originalEnvironment.sessionSecret === undefined) delete process.env.ADMIN_SESSION_SECRET;
    else process.env.ADMIN_SESSION_SECRET = originalEnvironment.sessionSecret;
  });

  it("sets an HTTP-only same-site session cookie after valid credentials", async () => {
    const response = await POST(loginRequest());
    const cookie = response.headers.get("set-cookie");

    expect(response.status).toBe(200);
    expect(cookie).toContain("crosen_admin_session=");
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("SameSite=strict");
    expect(cookie).toContain("Max-Age=28800");
  });

  it("rejects incorrect credentials without issuing a session", async () => {
    const response = await POST(loginRequest("admin@crosenclean.ca", "incorrect-password"));

    expect(response.status).toBe(401);
    expect(response.headers.get("set-cookie")).toBeNull();
  });

  it("clears the session cookie on sign out", async () => {
    const response = await DELETE();

    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie")).toContain("Max-Age=0");
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAdminConfiguration: vi.fn(),
  hasValidAdminSession: vi.fn(),
  execute: vi.fn(),
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({ get: () => ({ value: "valid-session" }) })),
}));

vi.mock("@/lib/admin-auth", () => ({
  adminSessionCookie: "crosen_admin_session",
  getAdminConfiguration: mocks.getAdminConfiguration,
  hasValidAdminSession: mocks.hasValidAdminSession,
}));

vi.mock("@/lib/turso", () => ({
  getTursoClient: () => ({ execute: mocks.execute }),
}));

import { DELETE, PATCH } from "../../app/api/admin/bookings/route";

const bookingId = "3093d400-748b-4e0b-8129-46d2fb87e1bc";

function deleteRequest(body: unknown = { id: bookingId }) {
  return new Request("http://localhost/api/admin/bookings", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function statusRequest(body: unknown = { id: bookingId, status: "booked" }) {
  return new Request("http://localhost/api/admin/bookings", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("admin bookings DELETE API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getAdminConfiguration.mockReturnValue({
      email: "admin@crosenclean.ca",
      password: "test-password-that-is-long-enough",
      sessionKey: new Uint8Array(32),
    });
    mocks.hasValidAdminSession.mockResolvedValue(true);
    mocks.execute.mockResolvedValue({ rowsAffected: 1 });
  });

  it("deletes a booking only after an authenticated request", async () => {
    const response = await DELETE(deleteRequest());

    expect(response.status).toBe(200);
    expect(mocks.execute).toHaveBeenCalledWith({
      sql: "DELETE FROM bookings WHERE id = ?",
      args: [bookingId],
    });
  });

  describe("admin bookings PATCH API", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mocks.getAdminConfiguration.mockReturnValue({
        email: "admin@crosenclean.ca",
        password: "test-password-that-is-long-enough",
        sessionKey: new Uint8Array(32),
      });
      mocks.hasValidAdminSession.mockResolvedValue(true);
      mocks.execute.mockResolvedValue({ rowsAffected: 1 });
    });

    it("updates a booking to a permitted status after authentication", async () => {
      const response = await PATCH(statusRequest());

      expect(response.status).toBe(200);
      expect(mocks.execute).toHaveBeenCalledWith({
        sql: "UPDATE bookings SET status = ? WHERE id = ?",
        args: ["booked", bookingId],
      });
    });

    it("rejects unsupported statuses", async () => {
      const response = await PATCH(statusRequest({ id: bookingId, status: "confirmed" }));

      expect(response.status).toBe(400);
      expect(mocks.execute).not.toHaveBeenCalled();
    });

    it("rejects unauthenticated status changes", async () => {
      mocks.hasValidAdminSession.mockResolvedValue(false);

      const response = await PATCH(statusRequest());

      expect(response.status).toBe(401);
      expect(mocks.execute).not.toHaveBeenCalled();
    });
  });

  it("rejects unauthenticated requests without accessing the database", async () => {
    mocks.hasValidAdminSession.mockResolvedValue(false);

    const response = await DELETE(deleteRequest());

    expect(response.status).toBe(401);
    expect(mocks.execute).not.toHaveBeenCalled();
  });

  it("rejects invalid booking IDs", async () => {
    const response = await DELETE(deleteRequest({ id: "not-a-uuid" }));

    expect(response.status).toBe(400);
    expect(mocks.execute).not.toHaveBeenCalled();
  });

  it("returns not found when the booking does not exist", async () => {
    mocks.execute.mockResolvedValue({ rowsAffected: 0 });

    const response = await DELETE(deleteRequest());

    expect(response.status).toBe(404);
  });
});

import { describe, expect, it } from "vitest";
import { POST } from "../../app/api/bookings/route";

describe("booking API request validation", () => {
  it("returns a client error for malformed JSON", async () => {
    const response = await POST(
      new Request("http://localhost/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{",
      }),
    );

    expect(response.status).toBe(400);
  });

  it("rejects invalid booking data before accessing the database", async () => {
    const response = await POST(
      new Request("http://localhost/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ serviceType: "unknown" }),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: expect.any(String),
    });
  });
});

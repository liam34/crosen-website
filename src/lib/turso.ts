import { createClient, type Client } from "@libsql/client";

let client: Client | undefined;

export function getTursoClient() {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL?.trim();
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim();

  if (!url || !authToken) {
    throw new Error("Turso database configuration is missing.");
  }

  client = createClient({ url, authToken });
  return client;
}

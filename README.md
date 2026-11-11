# Crosen Cleaning Services

The Crosen Cleaning Services website uses Next.js App Router, React, TypeScript, and Tailwind CSS.

## Development

Install Node.js and npm, then run:

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Other scripts:

```sh
npm run build
npm start
npm test
npm run lint
```

## Online booking with Turso

The `/booking` page stores booking requests in the Turso `bookings` table. Create a Turso database, then apply the schema from the repository root:

```sh
turso auth login
turso db create crosen-bookings
turso db shell crosen-bookings < schema.sql
turso db show crosen-bookings --url
turso db tokens create crosen-bookings
```

Keep the URL and token private. Add them to the root `.env.local` for local development without replacing other entries in that file:

```dotenv
TURSO_DATABASE_URL=libsql://your-database-your-org.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token
```

### Hostinger deployment

Deploy this as a Node.js/Next.js application that runs the Next.js server (`npm run build` followed by `npm start`); a static-only deployment cannot run `/api/bookings`.

1. In Hostinger hPanel, open the production Node.js/Web App for `crosenclean.ca`.
2. In its environment-variable settings, add `TURSO_DATABASE_URL` with the value from `turso db show crosen-bookings --url`.
3. Add `TURSO_AUTH_TOKEN` with the value returned by `turso db tokens create crosen-bookings`. Use a database-scoped token and never prefix either variable with `NEXT_PUBLIC_`.
4. Save the settings and restart or redeploy the production app so the Node.js process loads them. Do not commit `.env.local` or paste tokens into source code.
5. Submit a test booking. A successful response displays a booking reference; verify it in the Turso SQL shell:

   ```sql
   SELECT id, service_type, booking_date, booking_time, status, created_at
   FROM bookings
   ORDER BY created_at DESC
   LIMIT 5;
   ```

The API returns a configuration error if either variable is missing and a generic storage error if the database insert fails. Check Hostinger's server logs for the underlying database error; never log or share the auth token.

### Booking status migration

The admin dashboard supports `pending`, `booked`, and `cancelled` statuses. Before deploying this status update to an existing database, run the one-time migration from the repository root, replacing `YOUR_DATABASE_NAME` with the Turso database name:

```sh
turso db shell YOUR_DATABASE_NAME < migrations/booking-status.sql
```

The migration preserves existing bookings, converts any `confirmed` statuses to `booked`, and updates the database constraint. New databases should use `schema.sql` and do not need this migration.

### Private booking admin

The unlinked `/booking/admindashboard` page requires an admin login and is marked `noindex`. Configure these server-side environment variables in Hostinger's production Node.js app:

```dotenv
ADMIN_EMAIL=admin@crosenclean.ca
ADMIN_PASSWORD=use-a-unique-random-password-at-least-16-characters-long
ADMIN_SESSION_SECRET=generate-a-random-secret-at-least-32-bytes-long
```

Generate a session secret with `openssl rand -hex 32`. Use a unique password from a password manager; never commit either secret or prefix them with `NEXT_PUBLIC_`. Save the variables and restart/redeploy the app. Sign-in creates an eight-hour, signed, `HttpOnly`, `Secure` (in production), `SameSite=Strict` session cookie. Login attempts are rate-limited per client IP in each Node.js process; also enable Hostinger-side rate limiting if the app runs multiple instances.

The dashboard lists the latest 100 requests in a table. Use the status dropdown to mark a request pending, booked, or cancelled; **Details** expands a request, and **Delete** permanently removes it from Turso after confirming.

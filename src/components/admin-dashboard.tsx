"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/content";

type Booking = {
  id: string;
  serviceType: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  bookingDate: string;
  bookingTime: string;
  squareFootage: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
};

function errorMessage(body: unknown, fallback: string) {
  if (typeof body === "object" && body !== null && "error" in body) {
    if (typeof body.error === "string") return body.error;
  }

  return fallback;
}

function isBooking(value: unknown): value is Booking {
  if (typeof value !== "object" || value === null) return false;

  return (
    "id" in value &&
    typeof value.id === "string" &&
    "serviceType" in value &&
    typeof value.serviceType === "string" &&
    "fullName" in value &&
    typeof value.fullName === "string" &&
    "email" in value &&
    typeof value.email === "string" &&
    "phone" in value &&
    typeof value.phone === "string" &&
    "address" in value &&
    typeof value.address === "string" &&
    "bookingDate" in value &&
    typeof value.bookingDate === "string" &&
    "bookingTime" in value &&
    typeof value.bookingTime === "string" &&
    "squareFootage" in value &&
    (typeof value.squareFootage === "string" || value.squareFootage === null) &&
    "notes" in value &&
    (typeof value.notes === "string" || value.notes === null) &&
    "status" in value &&
    typeof value.status === "string" &&
    "createdAt" in value &&
    typeof value.createdAt === "string"
  );
}

function serviceLabel(serviceType: string) {
  return (
    services.find((service) => service.bookingType === serviceType)?.bookingLabel ?? serviceType
  );
}

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function BookingDetails({ booking }: { booking: Booking }) {
  return (
    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
      <div>
        <dt className="font-semibold">Service</dt>
        <dd className="text-muted-foreground">{serviceLabel(booking.serviceType)}</dd>
      </div>
      <div>
        <dt className="font-semibold">Preferred date and time</dt>
        <dd className="text-muted-foreground">
          {formatDate(booking.bookingDate)} · {booking.bookingTime} Mountain Time
        </dd>
      </div>
      <div>
        <dt className="font-semibold">Email</dt>
        <dd>
          <a className="break-all text-primary underline" href={`mailto:${booking.email}`}>
            {booking.email}
          </a>
        </dd>
      </div>
      <div>
        <dt className="font-semibold">Phone</dt>
        <dd>
          <a className="text-primary underline" href={`tel:${booking.phone}`}>
            {booking.phone}
          </a>
        </dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="font-semibold">Service address</dt>
        <dd className="whitespace-pre-wrap text-muted-foreground">{booking.address}</dd>
      </div>
      {booking.squareFootage && (
        <div>
          <dt className="font-semibold">Space size</dt>
          <dd className="text-muted-foreground">{booking.squareFootage}</dd>
        </div>
      )}
      {booking.notes && (
        <div className="sm:col-span-2">
          <dt className="font-semibold">Notes</dt>
          <dd className="whitespace-pre-wrap text-muted-foreground">{booking.notes}</dd>
        </div>
      )}
      <div>
        <dt className="font-semibold">Submitted</dt>
        <dd className="text-muted-foreground">{new Date(booking.createdAt).toLocaleString()}</dd>
      </div>
    </dl>
  );
}

export function AdminDashboard({ initialAuthenticated }: { initialAuthenticated: boolean }) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(initialAuthenticated);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!authenticated) return;

    let active = true;
    async function loadBookings() {
      setFeedback("");

      try {
        const response = await fetch("/api/admin/bookings", { cache: "no-store" });
        const body: unknown = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            if (active) setAuthenticated(false);
          }
          throw new Error(errorMessage(body, "Unable to load bookings."));
        }

        if (
          typeof body !== "object" ||
          body === null ||
          !("bookings" in body) ||
          !Array.isArray(body.bookings)
        ) {
          throw new Error("The booking service returned an unexpected response.");
        }

        const validBookings = body.bookings.filter(isBooking);
        if (validBookings.length !== body.bookings.length) {
          throw new Error("The booking service returned invalid booking data.");
        }

        if (active) setBookings(validBookings);
      } catch (error) {
        if (active) {
          setFeedback(error instanceof Error ? error.message : "Unable to load bookings.");
        }
      } finally {
        if (active) setLoadingBookings(false);
      }
    }

    void loadBookings();
    return () => {
      active = false;
    };
  }, [authenticated]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFeedback("");

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body: unknown = await response.json();
      if (!response.ok) throw new Error(errorMessage(body, "Unable to sign in."));

      setPassword("");
      setLoadingBookings(true);
      setAuthenticated(true);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    setFeedback("");
    try {
      const response = await fetch("/api/admin/session", { method: "DELETE" });
      if (!response.ok) throw new Error("Unable to sign out. Please try again.");
      setBookings([]);
      setAuthenticated(false);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to sign out.");
    }
  }

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border bg-background p-6 shadow-sm md:p-10">
        <p className="eyebrow">Crosen Cleaning Services</p>
        <h1 className="mt-3 text-3xl font-bold">Admin sign in</h1>
        <p className="mt-3 text-sm text-muted-foreground">Sign in to view booking requests.</p>
        <form onSubmit={handleLogin} className="mt-8 grid gap-5">
          <label className="text-sm font-semibold">
            Admin email
            <input
              required
              type="email"
              name="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-md border bg-background px-3 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="admin@crosenclean.ca"
            />
          </label>
          <label className="text-sm font-semibold">
            Password
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-md border bg-background px-3 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          {feedback && (
            <p className="text-sm text-destructive" role="alert">
              {feedback}
            </p>
          )}
          <Button type="submit" disabled={submitting} className="h-12">
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Crosen Cleaning Services</p>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">Booking requests</h1>
          <p className="mt-2 text-sm text-muted-foreground">Showing the latest 100 requests.</p>
        </div>
        <Button type="button" variant="outline" onClick={handleLogout}>
          Sign out
        </Button>
      </div>

      {feedback && (
        <p className="mb-5 text-sm text-destructive" role="alert">
          {feedback}
        </p>
      )}

      {loadingBookings ? (
        <p className="rounded-xl border bg-background p-6 text-muted-foreground" role="status">
          Loading bookings…
        </p>
      ) : bookings.length === 0 ? (
        <p className="rounded-xl border bg-background p-6 text-muted-foreground">
          No booking requests yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <article key={booking.id} className="rounded-xl border bg-background p-5 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">{booking.fullName}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Reference: {booking.id}</p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold capitalize">
                  {booking.status}
                </span>
              </div>
              <BookingDetails booking={booking} />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  bookingSchema,
  bookingSpaceSizes,
  bookingTimeLabels,
  bookingTimeValues,
} from "@/lib/booking-schema";
import { services } from "@/lib/content";

const field =
  "w-full rounded-md border bg-background px-3 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

type SubmissionStatus = "idle" | "loading" | "success" | "error";

function getLocalDate() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

export function BookingForm() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [minimumDate, setMinimumDate] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const parsed = bookingSchema.safeParse({
      serviceType: formData.get("serviceType"),
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      bookingDate: formData.get("bookingDate"),
      bookingTime: formData.get("bookingTime"),
      squareFootage: formData.get("squareFootage") || null,
      notes: formData.get("notes"),
    });

    if (!parsed.success) {
      setStatus("error");
      setFeedback(parsed.error.issues[0]?.message ?? "Please check your booking details.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result: unknown = await response.json();

      if (!response.ok) {
        const message =
          typeof result === "object" &&
          result !== null &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "We couldn’t submit your booking. Please try again.";
        throw new Error(message);
      }

      if (
        typeof result !== "object" ||
        result === null ||
        !("bookingId" in result) ||
        typeof result.bookingId !== "string"
      ) {
        throw new Error("We couldn’t confirm your booking request. Please try again.");
      }

      form.reset();
      setBookingId(result.bookingId);
      setStatus("success");
      setFeedback("Your booking request has been received. Our team will contact you to confirm.");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "We couldn’t submit your booking. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border-l-4 border-fresh bg-secondary p-6 md:p-8" role="status">
        <h3 className="text-2xl font-bold">Request received.</h3>
        <p className="mt-3 text-muted-foreground">{feedback}</p>
        <p className="mt-2 text-sm text-muted-foreground">Reference: {bookingId}</p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
            setFeedback("");
            setBookingId("");
          }}
        >
          Request another booking
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2" noValidate>
      {status === "error" && (
        <p className="text-sm text-destructive md:col-span-2" role="alert">
          {feedback}
        </p>
      )}
      <label className="text-sm font-semibold">
        Service
        <select name="serviceType" className={field} defaultValue="" required>
          <option value="" disabled>
            Select a cleaning service
          </option>
          {services.map((service) => (
            <option key={service.bookingType} value={service.bookingType}>
              {service.bookingLabel}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-semibold">
        Full name
        <input
          required
          name="fullName"
          autoComplete="name"
          maxLength={120}
          placeholder="Your full name"
          className={field}
        />
      </label>
      <label className="text-sm font-semibold">
        Email address
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          placeholder="you@example.com"
          className={field}
        />
      </label>
      <label className="text-sm font-semibold">
        Phone number
        <input
          required
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          placeholder="Your phone number"
          className={field}
        />
      </label>
      <label className="text-sm font-semibold md:col-span-2">
        Service address / location details
        <textarea
          required
          name="address"
          autoComplete="street-address"
          maxLength={500}
          rows={2}
          placeholder="Street address, city, and any access details"
          className={field}
        />
      </label>
      <label className="text-sm font-semibold">
        Preferred date
        <input
          required
          name="bookingDate"
          type="date"
          min={minimumDate}
          onFocus={() => setMinimumDate((date) => date || getLocalDate())}
          className={field}
        />
      </label>
      <label className="text-sm font-semibold">
        Preferred time slot
        <select name="bookingTime" className={field} defaultValue="" required>
          <option value="" disabled>
            Select a time slot
          </option>
          {bookingTimeValues.map((value) => (
            <option key={value} value={value}>
              {bookingTimeLabels[value]} (Mountain Time)
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-semibold md:col-span-2">
        Approximate space size <span className="font-normal text-muted-foreground">(optional)</span>
        <select name="squareFootage" className={field} defaultValue="">
          <option value="">Select a size</option>
          {bookingSpaceSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-semibold md:col-span-2">
        Special notes <span className="font-normal text-muted-foreground">(optional)</span>
        <textarea
          name="notes"
          maxLength={2_000}
          rows={4}
          placeholder="Share any instructions or special requirements"
          className={field}
        />
      </label>
      <p className="text-xs text-muted-foreground md:col-span-2">
        This is a booking request, not a confirmed appointment. Our team will contact you to confirm
        the details.
      </p>
      <Button
        className="h-12 md:col-span-2 md:justify-self-start"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting…" : "Request booking"} <ArrowUpRight />
      </Button>
    </form>
  );
}

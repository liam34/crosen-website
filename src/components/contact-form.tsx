"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/content";

const field = "w-full border-b-2 bg-transparent py-3 outline-none transition focus:border-primary";

type SubmissionStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service: formData.get("service"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        const result: { error?: string } = await response.json();
        throw new Error(result.error ?? "We couldn’t send your message. Please try again.");
      }

      form.reset();
      setStatus("success");
      setFeedback("Thanks for reaching out. Your message has been sent.");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error ? error.message : "We couldn’t send your message. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-7 md:grid-cols-2">
      <label className="text-sm font-semibold">
        Name
        <input required name="name" autoComplete="name" placeholder="Your name" className={field} />
      </label>
      <label className="text-sm font-semibold">
        Email
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email"
          className={field}
        />
      </label>
      <label className="text-sm font-semibold">
        Phone
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Your phone number"
          className={field}
        />
      </label>
      <label className="text-sm font-semibold">
        Service
        <select name="service" className={field} defaultValue="" required>
          <option value="" disabled>
            Select cleaning service
          </option>
          {services.map((service) => (
            <option key={service.n} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-semibold md:col-span-2">
        Your message
        <textarea
          required
          name="message"
          placeholder="Tell us about your cleaning needs"
          rows={4}
          className={field}
        />
      </label>
      {feedback && (
        <p
          className={`text-sm md:col-span-2 ${
            status === "error" ? "text-destructive" : "text-muted-foreground"
          }`}
          role={status === "error" ? "alert" : "status"}
        >
          {feedback}
        </p>
      )}
      <Button
        className="h-12 md:col-span-2 md:justify-self-start"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting…" : "Submit"} <ArrowUpRight />
      </Button>
    </form>
  );
}

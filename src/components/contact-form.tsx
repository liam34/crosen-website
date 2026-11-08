"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const field = "w-full border-b-2 bg-transparent py-3 outline-none transition focus:border-primary";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border-l-4 border-fresh bg-secondary p-8">
        <h3 className="text-2xl font-bold">Your details are ready.</h3>
        <p className="mt-4 text-muted-foreground">
          This form is a preview only. Your request has not been sent.
        </p>
        <Button variant="outline" onClick={() => setSent(false)} className="mt-6">
          Back to form
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
      className="grid gap-7 md:grid-cols-2"
    >
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
          <option>Commercial cleaning</option>
          <option>Industrial cleaning</option>
          <option>Residential cleaning</option>
        </select>
      </label>
      <label className="text-sm font-semibold md:col-span-2">
        Your space
        <textarea
          required
          name="message"
          placeholder="Tell us about your cleaning needs"
          rows={4}
          className={field}
        />
      </label>
      <p className="text-xs text-muted-foreground md:col-span-2">
        Quote requests are not being sent yet.
      </p>
      <Button className="h-12 md:col-span-2 md:justify-self-start" type="submit">
        Preview quote request <ArrowUpRight />
      </Button>
    </form>
  );
}

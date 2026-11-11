import type { Metadata } from "next";
import home from "@/assets/crosen-home.webp";
import { BookingForm } from "@/components/booking-form";
import { PageHero } from "@/components/site";

export const metadata: Metadata = {
  title: "Book a Cleaning",
  description: "Request a commercial, industrial, or move-in/move-out cleaning appointment.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Book a Cleaning — Crosen",
    url: "/booking",
    description: "Request a cleaning appointment with Crosen Cleaning Services.",
  },
};

export default function BookingPage() {
  return (
    <>
      <PageHero
        image={home}
        eyebrow="Request a booking"
        title="Let’s find a time that works."
        compact
      />
      <section aria-labelledby="booking-heading" className="bg-secondary">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="eyebrow">Book a cleaning</p>
            <h2 id="booking-heading" className="mt-4 text-3xl font-bold">
              Tell us what your space needs.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Send a booking request and our team will contact you to confirm availability.
            </p>
          </div>
          <div className="rounded-2xl border bg-background p-6 shadow-sm md:p-10">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import home from "@/assets/crosen-home.jpg";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/site";

export const metadata: Metadata = {
  title: "Get a Cleaning Quote",
  description: "Tell Crosen about your commercial, industrial, or move-in/move-out cleaning needs.",
  openGraph: {
    title: "Get a Cleaning Quote — Crosen",
    description: "Start a conversation about a cleaner home or workplace.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero image={home} eyebrow="Talk to Crosen" title="Let’s freshen up your space." />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="eyebrow">Get a quote</p>
          <h2 className="mt-4 text-3xl font-bold">Every fresh start begins with a conversation.</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Tell us about your space and the cleaning you have in mind.
          </p>
          <div className="mt-8 space-y-3 text-sm font-semibold">
            <p>Commercial cleaning</p>
            <p>Industrial cleaning</p>
            <p>Move in move out cleaning</p>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}

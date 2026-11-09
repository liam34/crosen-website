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
      <PageHero
        image={home}
        eyebrow="Talk to Crosen"
        title="Let’s freshen up your space."
        compact
      />
      <section
        id="quote-form"
        aria-labelledby="quote-heading"
        className="scroll-mt-32 bg-secondary"
      >
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="eyebrow">Get a quote</p>
            <h2 id="quote-heading" className="mt-4 text-3xl font-bold">
              Every fresh start begins with a conversation.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Tell us about your space and the cleaning you have in mind.
            </p>
          </div>
          <div className="rounded-2xl border bg-background p-6 shadow-sm md:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

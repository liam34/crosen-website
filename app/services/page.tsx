import type { Metadata } from "next";
import Image from "next/image";
import office from "@/assets/crosen-office.jpg";
import { CtaBand, PageHero } from "@/components/site";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description: "Explore commercial, industrial, and move-in/move-out cleaning from Crosen.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Cleaning Services — Crosen",
    url: "/services",
    description:
      "Cleaning care for workplaces, industrial facilities, and move-in/move-out spaces.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image={office}
        eyebrow="Our services"
        title="Cleaning care for every kind of space."
      />
      <section className="mx-auto max-w-7xl space-y-20 px-6 py-20">
        {services.map((service, index) => (
          <div key={service.n} className="grid items-center gap-10 md:grid-cols-2">
            <div
              className={`group relative aspect-[4/3] overflow-hidden rounded-md ${
                index % 2 ? "md:order-2" : ""
              }`}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) calc(50vw - 3rem), 592px"
                quality={85}
                className="img-zoom object-cover"
              />
            </div>
            <div>
              <p className="eyebrow">
                {service.n} / {service.type}
              </p>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">{service.title}</h2>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">{service.text}</p>
              <ul className="mt-8 grid grid-cols-2 gap-4 text-sm font-semibold">
                {service.details.map((detail) => (
                  <li key={detail} className="border-l-2 border-fresh pl-3">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import office from "@/assets/crosen-office.jpg";
import home from "@/assets/crosen-home.jpg";
import { CtaBand, PageHero } from "@/components/site";

export const metadata: Metadata = {
  title: "About Crosen",
  description:
    "Get to know Crosen’s thoughtful approach to commercial, industrial, and residential cleaning.",
  openGraph: {
    title: "About Crosen Cleaning Services Inc.",
    description: "A cleaner space. A brighter day. Discover the Crosen approach.",
  },
};

const values = [
  ["Care in the details", "The little things make a space feel truly clean."],
  ["A plan for your space", "Cleaning shaped around your environment and needs."],
  ["A brighter everyday", "Fresh surroundings for the way you live and work."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero image={office} eyebrow="About Crosen" title="A fresh perspective on clean." />
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2">
        <h2 className="text-3xl font-bold md:text-5xl">Your space deserves thoughtful care.</h2>
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Crosen Cleaning Services Inc. brings a fresh approach to commercial, industrial, and
            residential spaces.
          </p>
          <p>
            We believe cleaning is about more than appearances. It’s about a welcoming home, a
            comfortable workplace, and spaces that are ready for the day ahead.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative aspect-[16/7] w-full overflow-hidden rounded-md">
          <Image
            src={home}
            alt="A welcoming clean living space"
            fill
            sizes="(max-width: 767px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {values.map(([title, description]) => (
            <div key={title} className="border-t-2 border-fresh pt-6">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-3 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

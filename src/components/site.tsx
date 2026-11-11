import type { ReactNode } from "react";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Image
            src="/crosen-logo.webp"
            alt="Crosen Cleaning Services Inc."
            className="h-32 w-56 object-contain"
            width={1152}
            height={768}
            sizes="224px"
            quality={75}
          />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A cleaner space. A brighter day.
            <br />
            Commercial, industrial, and move-in/move-out cleaning.
          </p>
        </div>
        <div className="space-y-4 text-sm">
          <p className="font-bold">Explore</p>
          <Link href="/" className="block text-muted-foreground hover:text-primary">
            Home
          </Link>
          <Link href="/services" className="block text-muted-foreground hover:text-primary">
            Our services
          </Link>
          <Link href="/booking" className="block text-muted-foreground hover:text-primary">
            Book a cleaning
          </Link>
          <Link href="/projects" className="block text-muted-foreground hover:text-primary">
            Spaces we clean
          </Link>
          <Link href="/about" className="block text-muted-foreground hover:text-primary">
            About Crosen
          </Link>
          <Link href="/find-us" className="block text-muted-foreground hover:text-primary">
            Find Us
          </Link>
          <Link href="/contact" className="block text-muted-foreground hover:text-primary">
            Contact
          </Link>
        </div>
        <div>
          <p className="font-bold">Let’s freshen things up.</p>
          <p className="mt-4 text-sm text-muted-foreground">Tell us about your space.</p>
          <Button asChild variant="link" className="mt-3 px-0">
            <Link href="/find-us">
              Talk to Crosen <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t px-6 py-6 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Crosen Cleaning Services Inc.</span>
        <span>Commercial · Industrial · Move in move out cleaning</span>
        <a
          href="https://squarevendo.com"
          aria-label="Website by Square Vendo Website Studio"
          className="ml-auto shrink-0"
        >
          <Image
            src="/squarevendo-logo.png"
            alt="Square Vendo Website Studio"
            width={64}
            height={64}
            sizes="64px"
            className="size-16 object-contain"
          />
        </a>
      </div>
    </footer>
  );
}

export function PageHero({
  image,
  eyebrow,
  title,
  children,
  compact = false,
}: {
  image: ImageProps["src"];
  eyebrow: string;
  title: string;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative flex items-center overflow-hidden bg-secondary",
        compact ? "min-h-[190px] md:min-h-[220px]" : "min-h-[420px] md:min-h-[480px]",
      )}
    >
      <Image src={image} alt="" fill priority sizes="100vw" quality={75} className="object-cover" />
      <div className="absolute inset-0 bg-hero-fade" />
      <div
        className={cn(
          "relative mx-auto w-full max-w-7xl px-6",
          compact ? "py-8 md:py-10" : "py-20",
        )}
      >
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
        {children}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center">
        <div>
          <Sparkles className="mb-4 size-7 text-fresh" />
          <h2 className="text-3xl font-bold md:text-4xl">Your next fresh start.</h2>
          <p className="mt-3 text-ink-foreground/75">Let’s make your space feel its best.</p>
        </div>
        <Button asChild size="lg" className="h-14 bg-fresh text-fresh-foreground hover:bg-fresh/90">
          <Link href="/contact#quote-form">
            Get a cleaning quote <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}

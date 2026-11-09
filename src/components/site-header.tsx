"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our services" },
  { href: "/projects", label: "Spaces we clean" },
  { href: "/about", label: "About Crosen" },
  { href: "/find-us", label: "Find Us" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" aria-label="Crosen Cleaning Services home" onClick={() => setOpen(false)}>
          <Image
            src="/crosen-logo.webp"
            alt="Crosen Cleaning Services Inc."
            className="h-20 w-40 object-contain md:h-24 md:w-48"
            width={1152}
            height={768}
            sizes="(min-width: 768px) 192px, 160px"
            quality={85}
            priority
          />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "transition hover:text-primary",
                pathname === item.href && "text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden h-12 sm:inline-flex">
            <Link href="/contact#quote-form">
              Get a quote <ArrowUpRight />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="absolute inset-x-0 top-full flex flex-col gap-5 border-b bg-background px-6 py-6 shadow-sm lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn("font-semibold", pathname === item.href && "text-primary")}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact#quote-form"
            onClick={() => setOpen(false)}
            className="font-semibold text-primary"
          >
            Get a quote
          </Link>
        </nav>
      )}
    </header>
  );
}

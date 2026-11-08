import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
const logo = "/crosen-logo.webp";

const nav = [{ to: "/services", label: "Our services" }, { to: "/projects", label: "Spaces we clean" }, { to: "/about", label: "About Crosen" }] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="relative z-30 border-b bg-background">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
      <Link to="/" aria-label="Crosen Cleaning Services home" onClick={() => setOpen(false)}><img src={logo} alt="Crosen Cleaning Services Inc." className="h-20 w-40 object-contain md:h-24 md:w-48" width={1152} height={768} /></Link>
      <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex">{nav.map(n => <Link key={n.to} to={n.to} activeProps={{ className: "text-primary" }} className="transition hover:text-primary">{n.label}</Link>)}</nav>
      <div className="flex items-center gap-2"><Button asChild className="hidden h-12 sm:inline-flex"><Link to="/contact">Get a quote <ArrowUpRight /></Link></Button><Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>
    </div>
    {open && <nav className="absolute inset-x-0 top-full flex flex-col gap-5 border-b bg-background px-6 py-6 shadow-sm lg:hidden">{nav.map(n => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-semibold">{n.label}</Link>)}<Link to="/contact" onClick={() => setOpen(false)} className="font-semibold text-primary">Get a quote</Link></nav>}
  </header>;
}

export function Footer() {
  return <footer className="border-t bg-background"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[2fr_1fr_1fr]">
    <div><img src={logo} alt="Crosen Cleaning Services Inc." className="h-32 w-56 object-contain" width={1152} height={768} loading="lazy" /><p className="mt-3 max-w-sm text-sm text-muted-foreground">A cleaner space. A brighter day.<br />Commercial, industrial, and residential cleaning.</p></div>
    <div className="space-y-4 text-sm"><p className="font-bold">Explore</p>{nav.map(n => <Link key={n.to} to={n.to} className="block text-muted-foreground hover:text-primary">{n.label}</Link>)}<Link to="/contact" className="block text-muted-foreground hover:text-primary">Contact</Link></div>
    <div><p className="font-bold">Let’s freshen things up.</p><p className="mt-4 text-sm text-muted-foreground">Tell us about your space.</p><Button asChild variant="link" className="mt-3 px-0"><Link to="/contact">Talk to Crosen <ArrowUpRight /></Link></Button></div>
  </div><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 border-t px-6 py-6 text-xs text-muted-foreground"><span>© {new Date().getFullYear()} Crosen Cleaning Services Inc.</span><span>Commercial · Industrial · Residential</span></div></footer>;
}

export function PageHero({ image, eyebrow, title, children }: { image: string; eyebrow: string; title: string; children?: ReactNode }) {
  return <section className="relative flex min-h-[420px] items-center overflow-hidden bg-secondary md:min-h-[480px]"><img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1088} /><div className="absolute inset-0 bg-hero-fade" /><div className="relative mx-auto w-full max-w-7xl px-6 py-20"><p className="eyebrow">{eyebrow}</p><h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight md:text-6xl">{title}</h1>{children}</div></section>;
}

export function CtaBand() {
  return <section className="bg-ink text-ink-foreground"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center"><div><Sparkles className="mb-4 size-7 text-fresh" /><h2 className="text-3xl font-bold md:text-4xl">Your next fresh start.</h2><p className="mt-3 text-ink-foreground/75">Let’s make your space feel its best.</p></div><Button asChild size="lg" className="h-14 bg-fresh text-fresh-foreground hover:bg-fresh/90"><Link to="/contact">Get a cleaning quote <ArrowUpRight /></Link></Button></div></section>;
}

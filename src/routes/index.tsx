import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Factory, House, Check, Sparkles } from "lucide-react";
import hero from "@/assets/crosen-office.jpg";
import home from "@/assets/crosen-home.jpg";
import { services } from "@/lib/content";
import { CtaBand } from "@/components/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Crosen Cleaning Services Inc. — A Cleaner Space" },
    { name: "description", content: "Crosen Cleaning Services offers commercial, industrial, and residential cleaning for spaces that feel their best." },
    { property: "og:title", content: "Crosen Cleaning Services Inc. — A Cleaner Space" },
    { property: "og:description", content: "Commercial, industrial, and residential cleaning. A cleaner space. A brighter day." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Index,
});
const icons = [Building2, Factory, House] as const;
function Index() {
  return <>
    <section className="home-hero relative flex items-center overflow-hidden bg-secondary">
      <img src={hero} alt="Professional cleaners caring for a bright office" className="absolute inset-0 h-full w-full object-cover object-right" width={1920} height={1088} />
      <div className="absolute inset-0 bg-hero-fade" />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
        <p className="eyebrow flex items-center gap-2"><Sparkles className="size-4" /> A cleaner space. A brighter day.</p>
        <h1 className="mt-6 max-w-2xl text-5xl font-bold leading-[1.08] md:text-7xl">Crosen<br />Cleaning Services<span className="text-primary">.</span></h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">Fresh spaces for the way you live and work. Commercial, industrial, and residential cleaning with care in every detail.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="h-13"><Link to="/contact">Get a quote <ArrowUpRight /></Link></Button><Button asChild variant="outline" size="lg" className="h-13"><Link to="/services">Explore our services</Link></Button></div>
        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold">{["Attention to detail", "Your space, your schedule"].map(t => <span key={t} className="flex items-center gap-2"><Check className="size-4 text-fresh" />{t}</span>)}</div>
      </div>
    </section>
    <section className="border-b bg-background"><div className="mx-auto grid max-w-7xl grid-cols-3 px-4 py-7 md:py-9">{services.map((s,i) => { const Icon = icons[i] ?? Building2; return <Link key={s.n} to="/services" className="flex flex-col items-center justify-center gap-3 border-r text-center last:border-r-0 md:flex-row md:gap-4"><Icon className="size-6 text-primary" /><span className="text-xs font-bold md:text-base">{s.type} cleaning</span></Link>; })}</div></section>
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-24"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">Made for your space</p><h2 className="mt-4 text-3xl font-bold md:text-5xl">Clean looks good everywhere.</h2></div><Button asChild variant="link" className="px-0"><Link to="/services">Our services <ArrowUpRight /></Link></Button></div>
      <div className="mt-10 grid gap-8 md:grid-cols-3">{services.map(s => <Link to="/services" key={s.n} className="group"><div className="relative overflow-hidden rounded-md"><img src={s.image} alt={s.title} loading="lazy" className="img-zoom aspect-[4/3] w-full object-cover" width={1440} height={1024} /><span className="absolute bottom-4 left-4 rounded-sm bg-background px-3 py-1 text-xs font-bold text-primary">{s.type}</span></div><div className="mt-5 flex items-center justify-between gap-2"><h3 className="text-xl font-bold">{s.title}</h3><ArrowUpRight className="size-5 shrink-0 text-primary" /></div><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p></Link>)}</div>
    </section>
    <section className="bg-secondary"><div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2"><img src={home} alt="A fresh, clean residential living room" loading="lazy" className="aspect-[5/4] w-full rounded-md object-cover" width={1440} height={1024} /><div><p className="eyebrow">The Crosen approach</p><h2 className="mt-4 text-3xl font-bold md:text-5xl">Small details.<br />A big difference.</h2><p className="mt-6 leading-relaxed text-muted-foreground">From a welcoming home to a ready-for-business workplace, a clean space changes how your day feels. We bring a thoughtful approach to every surface and every room.</p><ol className="mt-8 space-y-5">{["Tell us about your space", "Choose the right cleaning plan", "Enjoy a fresh start"].map((t,i) => <li key={t} className="flex items-center gap-4 border-t pt-5"><span className="text-sm font-bold text-primary">0{i+1}</span><span className="font-semibold">{t}</span></li>)}</ol><Button asChild variant="link" className="mt-6 px-0"><Link to="/about">Meet Crosen <ArrowUpRight /></Link></Button></div></div></section>
    <CtaBand />
  </>;
}

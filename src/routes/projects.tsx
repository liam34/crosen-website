import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import home from "@/assets/crosen-home.jpg";
import { projects } from "@/lib/content";
import { CtaBand, PageHero } from "@/components/site";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/projects")({ head: () => ({ meta: [
  { title: "Spaces We Clean — Crosen Cleaning Services Inc." }, { name: "description", content: "Explore the commercial, industrial, and residential spaces Crosen can care for." }, { property: "og:title", content: "Spaces We Clean — Crosen" }, { property: "og:description", content: "Cleaning for your office, industrial facility, and home." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: Projects });
const filters = ["All", "Commercial", "Industrial", "Residential"];
function Projects() { const [f,setF] = useState("All"); const list = projects.filter(p => f === "All" || p.type === f); return <><PageHero image={home} eyebrow="Spaces we clean" title="Room for a fresh start." /><section className="mx-auto max-w-7xl px-6 py-20"><div className="flex flex-wrap gap-2">{filters.map(x => <Button key={x} onClick={() => setF(x)} variant={f === x ? "default" : "outline"} aria-pressed={f === x}>{x}</Button>)}</div><div className="mt-10 grid gap-8 md:grid-cols-3">{list.map(p => <figure key={p.title} className="group"><div className="overflow-hidden rounded-md"><img src={p.image} alt={p.title} loading="lazy" className="img-zoom aspect-[4/3] w-full object-cover" width={1440} height={1024} /></div><figcaption className="mt-4"><span className="text-xl font-bold">{p.title}</span><p className="mt-2 text-sm text-muted-foreground">{p.type} spaces</p></figcaption></figure>)}</div></section><CtaBand /></>; }

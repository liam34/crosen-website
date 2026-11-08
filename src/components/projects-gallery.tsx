"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/content";

const filters = ["All", "Commercial", "Industrial", "Residential"] as const;
type ProjectFilter = (typeof filters)[number];

export function ProjectsGallery() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const visibleProjects = projects.filter((project) => filter === "All" || project.type === filter);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <Button
            key={item}
            onClick={() => setFilter(item)}
            variant={filter === item ? "default" : "outline"}
            aria-pressed={filter === item}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {visibleProjects.map((project) => (
          <figure key={project.title} className="group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                className="img-zoom object-cover"
              />
            </div>
            <figcaption className="mt-4">
              <span className="text-xl font-bold">{project.title}</span>
              <p className="mt-2 text-sm text-muted-foreground">{project.type} spaces</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

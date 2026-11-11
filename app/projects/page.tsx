import type { Metadata } from "next";
import home from "@/assets/crosen-home.jpg";
import { ProjectsGallery } from "@/components/projects-gallery";
import { CtaBand, PageHero } from "@/components/site";

export const metadata: Metadata = {
  title: "Spaces We Clean",
  description: "Explore commercial, industrial, and move-in/move-out spaces Crosen can care for.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Spaces We Clean — Crosen",
    url: "/projects",
    description: "Cleaning for your office, industrial facility, and home.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero image={home} eyebrow="Spaces we clean" title="Room for a fresh start." />
      <ProjectsGallery />
      <CtaBand />
    </>
  );
}

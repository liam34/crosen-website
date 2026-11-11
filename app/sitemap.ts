import type { MetadataRoute } from "next";

const siteUrl = "https://crosenclean.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/services", "/projects", "/contact", "/find-us"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}

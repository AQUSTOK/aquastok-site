import { MetadataRoute } from "next";
import { articles } from "@/content/articles/_meta";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticPages: MetadataRoute.Sitemap = [
  { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  { url: `${base}/statti`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${base}/gutter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 }, // 👈 додали
];

  const posts = articles.map((a) => ({
    url: `${base}/statti/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...posts];
}

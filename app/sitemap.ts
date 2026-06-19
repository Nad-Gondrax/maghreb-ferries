import type { MetadataRoute } from "next";
import { routes } from "@/lib/ferry/mockData";
import { guideArticles } from "@/lib/guides";
import { absoluteUrl } from "@/lib/seo";

const staticPaths = [
  "/",
  "/bateau-maroc",
  "/bateau-algerie",
  "/bateau-tunisie",
  "/guides",
  "/contact-aide-whatsapp",
  "/transparence-affiliation"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : path.startsWith("/bateau-") ? 0.95 : 0.7
    })),
    ...routes.map((route) => ({
      url: absoluteUrl(`/routes/${route.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: ["marseille-tanger-med", "sete-nador", "algesiras-tanger-med"].includes(route.slug)
        ? 0.9
        : 0.75
    })),
    ...routes.map((route) => ({
      url: absoluteUrl(`/bateau/${route.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: ["marseille-tanger-med", "sete-nador", "algesiras-tanger-med"].includes(route.slug)
        ? 0.9
        : 0.72
    })),
    ...guideArticles.map((guide) => ({
      url: absoluteUrl(guide.href),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}

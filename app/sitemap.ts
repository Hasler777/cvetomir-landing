import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cvetomir-franchise.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const legalPaths = ["/privacy", "/cookies", "/consent", "/marketing-consent"];
  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...legalPaths.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}

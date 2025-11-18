import type { MetadataRoute } from "next";

const BASE_URL = "https://sundby-sliberi.dk";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/bestil", "/aflevering", "/tak", "/knivslibning-nykoebing-falster", "/erhverv"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  return routes;
}



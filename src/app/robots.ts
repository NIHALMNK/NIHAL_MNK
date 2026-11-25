import { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/data/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = (await getSiteSettings()).defaultSeo.siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

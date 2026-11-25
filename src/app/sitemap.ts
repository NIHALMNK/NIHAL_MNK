import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/data/projects";
import { getAllPosts } from "@/lib/data/blog";
import { getSiteSettings } from "@/lib/data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, projects, posts] = await Promise.all([
    getSiteSettings(),
    getAllProjects(),
    getAllPosts(),
  ]);
  const baseUrl = site.defaultSeo.siteUrl;

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/projects",
    "/blogs",
    "/stack",
    "/books",
    "/movies",
    "/snaps",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...staticRoutes, ...projectUrls, ...postUrls];
}

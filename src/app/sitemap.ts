import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/data/projects";
import { getAllPosts } from "@/lib/data/blog";
import { siteSettingsData } from "@/data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteSettingsData.defaultSeo.siteUrl;

  const projects = await getAllProjects();
  const posts = await getAllPosts();

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/blog",
    "/craft",
    "/stack",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...staticRoutes, ...projectUrls, ...postUrls];
}

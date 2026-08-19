import { BlogPost } from "@/types/blog";
import { blogData } from "@/data/blogs";

export async function getAllPosts(): Promise<BlogPost[]> {
  return blogData;
}

export async function getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return [...allPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = await getAllPosts();
  return allPosts.find((p) => p.slug === slug) ?? null;
}

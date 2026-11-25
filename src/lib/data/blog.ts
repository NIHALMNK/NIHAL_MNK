import { BlogPost } from "@/types/blog";
import { sanityFetch, isSanityConfigured } from "@/sanity/client";
import { allBlogPostsQuery, blogPostBySlugQuery } from "@/sanity/queries";

interface SanityBlogPostDoc {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  introCallout?: string;
  content: string;
  coverImageUrl?: string;
  publishedAt: string;
  readingTime?: string;
  tags?: string[];
  featured?: boolean;
  author?: {
    name?: string;
    role?: string;
  };
}

function mapSanityBlogPostToDomain(doc: SanityBlogPostDoc): BlogPost {
  return {
    id: doc.id || doc._id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    introCallout: doc.introCallout,
    content: doc.content,
    coverImage: {
      url: doc.coverImageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
      alt: doc.title,
      width: 1200,
      height: 675,
      aspectRatio: "16/9",
    },
    publishedAt: doc.publishedAt,
    readingTime: doc.readingTime || "5 min read",
    tags: doc.tags || [],
    featured: doc.featured ?? false,
    author: {
      name: doc.author?.name || "",
      role: doc.author?.role || "MERN Stack Developer",
    },
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (isSanityConfigured()) {
    const sanityPosts = await sanityFetch<SanityBlogPostDoc[]>({
      query: allBlogPostsQuery,
      tags: ["blogPost"],
    });

    if (sanityPosts && sanityPosts.length > 0) {
      return sanityPosts.map(mapSanityBlogPostToDomain);
    }
  }

  return [];
}

export async function getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return [...allPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isSanityConfigured()) {
    const sanityPost = await sanityFetch<SanityBlogPostDoc>({
      query: blogPostBySlugQuery,
      params: { slug },
      tags: ["blogPost"],
    });

    if (sanityPost) {
      return mapSanityBlogPostToDomain(sanityPost);
    }
  }

  return null;
}

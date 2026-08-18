import { MediaItem } from "./media";

export interface BlogAuthor {
  name: string;
  avatar?: MediaItem;
  role?: string;
}

export interface BlogSEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: MediaItem;
}

export interface BlogHeading {
  id: string;
  text: string;
  level: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  introCallout?: string;
  content: string;
  coverImage?: MediaItem;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  author?: BlogAuthor;
  featured?: boolean;
  seo?: BlogSEO;
}

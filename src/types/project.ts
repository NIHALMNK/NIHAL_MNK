import { MediaItem } from "./media";

export type ProjectPriority = 1 | 2 | 3 | 4;

export interface ProjectSEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: MediaItem;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverImage: MediaItem;
  gallery?: MediaItem[];
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudy?: string;
  publishedAt: string;
  priority?: ProjectPriority;
  seo?: ProjectSEO;
}

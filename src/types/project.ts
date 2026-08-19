import { MediaItem } from "./media";
import { Technology } from "./stack";

export type ProjectPriority = number;

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
  videoUrl?: string;
  gallery?: MediaItem[];
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudy?: string;
  publishedAt: string;
  priority?: ProjectPriority;
  status?: "Operational" | "In Development" | "Archived";
  seo?: ProjectSEO;
}

export interface ResolvedProject extends Omit<Project, "technologies"> {
  technologies: Technology[];
}

import { MediaItem } from "./media";

export interface CraftItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  previewUrl?: string;
  githubUrl?: string;
  media: MediaItem;
  technologies: string[];
  createdAt: string;
}

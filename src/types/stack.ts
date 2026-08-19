import { MediaItem } from "./media";

export type StackCategory = string;

export interface Technology {
  id: string;
  name: string;
  slug: string;
  icon: MediaItem;
  category: string;
  description?: string;
  tagline?: string;
  documentationUrl?: string;
  proficiencyLevel?: "expert" | "proficient" | "familiar";
  yearsOfExperience?: number;
  order?: number;
  isActive?: boolean;
}

/** Alias for backward compatibility with existing stack views */
export type StackItem = Technology;

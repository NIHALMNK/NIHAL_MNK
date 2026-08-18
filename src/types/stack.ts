import { MediaItem } from "./media";

export type StackCategory = "languages" | "frameworks" | "tools" | "infrastructure" | "design";

export interface Technology {
  id: string;
  name: string;
  slug: string;
  icon: MediaItem;
  category?: StackCategory;
  description?: string;
  proficiencyLevel?: "expert" | "proficient" | "familiar";
  yearsOfExperience?: number;
}

/** @deprecated Alias for backward compatibility with existing stack views */
export type StackItem = Technology;

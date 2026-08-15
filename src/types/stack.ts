export type StackCategory = "languages" | "frameworks" | "tools" | "infrastructure" | "design";

export interface StackItem {
  id: string;
  name: string;
  category: StackCategory;
  description: string;
  iconName?: string;
  url?: string;
  proficiencyLevel?: "expert" | "proficient" | "familiar";
  yearsOfExperience?: number;
}

import { Technology } from "@/types/stack";

export interface AboutProfile {
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  availableForHire: boolean;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    instagram?: string;
  };
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  period: string;
  location?: string;
  description?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  slug?: string;
  icon?: {
    url: string;
    alt?: string;
  };
}

export interface SkillCategory {
  id: string;
  category: string;
  description?: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  responsibilities?: string[];
  technologies?: string[];
}

export interface AboutData {
  profile: AboutProfile;
  summary: {
    title: string;
    content: string[];
    highlights: { label: string; value: string }[];
  };
  education: EducationItem[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
}

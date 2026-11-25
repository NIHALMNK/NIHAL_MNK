export interface AboutProfile {
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  availableForHire: boolean;
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
  experience: ExperienceItem[];
}

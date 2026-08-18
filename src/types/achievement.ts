import { MediaItem } from "./media";

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  shortDescription?: string;
  credentialId?: string; // Preserved in data model for CMS/DB identity
  skills?: string[]; // Skills Acquired
  credentialUrl?: string;
  logo?: MediaItem;
}

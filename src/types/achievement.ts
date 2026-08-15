import { MediaItem } from "./media";

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl?: string;
  image?: MediaItem;
}

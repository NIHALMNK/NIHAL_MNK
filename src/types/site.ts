import { MediaItem } from "./media";

export interface SiteSettings {
  name: string;
  role: string;
  headline: string;
  bio: string;
  avatar: MediaItem;
  profileImage?: string;
  location: string;
  availableForHire: boolean;
  defaultSeo: {
    title: string;
    description: string;
    siteUrl: string;
    ogImage: MediaItem;
  };
}

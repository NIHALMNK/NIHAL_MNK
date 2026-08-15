import { MediaItem } from "./media";

export interface Snap {
  id: string;
  caption: string;
  location?: string;
  takenAt: string;
  media: MediaItem;
}

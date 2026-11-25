import { Snap } from "@/types/snap";
import { sanityFetch, isSanityConfigured } from "@/sanity/client";
import { allRecentSnapsQuery } from "@/sanity/queries";

interface SanitySnapDoc {
  _id: string;
  id?: string;
  caption: string;
  location: string;
  takenAt: string;
  mediaUrl: string;
  alt?: string;
}

export async function getRecentSnaps(limit?: number): Promise<Snap[]> {
  if (isSanityConfigured()) {
    const sanitySnaps = await sanityFetch<SanitySnapDoc[]>({
      query: allRecentSnapsQuery,
      tags: ["recentSnap"],
    });

    if (sanitySnaps && sanitySnaps.length > 0) {
      const mapped: Snap[] = sanitySnaps.map((s) => ({
        id: s.id || s._id,
        caption: s.caption,
        location: s.location,
        takenAt: s.takenAt,
        media: {
          url: s.mediaUrl,
          alt: s.alt || s.caption,
          width: 800,
          height: 600,
        },
      }));
      return limit ? mapped.slice(0, limit) : mapped;
    }
  }

  return [];
}

/**
 * Returns all snaps for the dedicated Gallery page.
 */
export async function getAllSnaps(): Promise<Snap[]> {
  return getRecentSnaps();
}

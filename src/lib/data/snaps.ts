import { Snap } from "@/types/snap";
import { snapsData as localSnapsData } from "@/data/home/recent-snaps";
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

  const sorted = [...localSnapsData].sort(
    (a, b) => new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

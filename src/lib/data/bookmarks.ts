import { Bookmark } from "@/types/bookmark";
import { bookmarksData as localBookmarksData } from "@/data/home/current-resources";
import { sanityFetch, isSanityConfigured } from "@/sanity/client";
import { allCurrentResourcesQuery } from "@/sanity/queries";

interface SanityResourceDoc {
  _id: string;
  id?: string;
  title: string;
  url: string;
  domain?: string;
  category?: string;
  description?: string;
}

export async function getBookmarks(): Promise<Bookmark[]> {
  if (isSanityConfigured()) {
    const sanityResources = await sanityFetch<SanityResourceDoc[]>({
      query: allCurrentResourcesQuery,
      tags: ["currentResource"],
    });

    if (sanityResources && sanityResources.length > 0) {
      return sanityResources.map((r) => ({
        id: r.id || r._id,
        title: r.title,
        url: r.url,
        domain: r.domain || "web",
        category: r.category || "General",
        description: r.description || "",
      }));
    }
  }

  return localBookmarksData;
}

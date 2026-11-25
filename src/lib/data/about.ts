import { AboutData } from "@/types/about";
import { sanityFetch } from "@/sanity/client";
import { aboutDataQuery } from "@/sanity/queries";

/**
 * Returns About Me page content from the Sanity `about` singleton,
 * or null when it has not been created yet.
 */
export async function getAboutData(): Promise<AboutData | null> {
  const doc = await sanityFetch<Partial<AboutData>>({
    query: aboutDataQuery,
    tags: ["about", "stack"],
  });

  if (!doc?.profile?.name) return null;

  return {
    profile: {
      name: doc.profile.name,
      role: doc.profile.role || "",
      location: doc.profile.location || "",
      avatarUrl: doc.profile.avatarUrl || "",
      availableForHire: doc.profile.availableForHire ?? false,
    },
    summary: {
      title: doc.summary?.title || "",
      content: doc.summary?.content || [],
      highlights: doc.summary?.highlights || [],
    },
    education: doc.education || [],
    experience: doc.experience || [],
  };
}

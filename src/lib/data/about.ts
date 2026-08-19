import { AboutData } from "@/types/about";
import { aboutData as localAboutData } from "@/data/home/about-me";
import { sanityFetch, isSanityConfigured } from "@/sanity/client";
import { aboutDataQuery } from "@/sanity/queries";

/**
 * Returns About Me page content from Sanity (or fallback local dataset).
 */
export async function getAboutData(): Promise<AboutData> {
  if (isSanityConfigured()) {
    const sanityAbout = await sanityFetch<AboutData>({
      query: aboutDataQuery,
      tags: ["about"],
    });

    if (sanityAbout && sanityAbout.profile?.name) {
      return {
        ...localAboutData,
        ...sanityAbout,
        profile: {
          ...localAboutData.profile,
          ...sanityAbout.profile,
        },
      };
    }
  }

  return localAboutData;
}

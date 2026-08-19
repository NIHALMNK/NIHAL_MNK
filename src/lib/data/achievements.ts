import { Achievement } from "@/types/achievement";
import { achievementsData as localAchievementsData } from "@/data/home/achievements";
import { sanityFetch, isSanityConfigured } from "@/sanity/client";
import { allAchievementsQuery } from "@/sanity/queries";

interface SanityAchievementDoc {
  _id: string;
  id?: string;
  title: string;
  issuer: string;
  date: string;
  shortDescription?: string;
  description: string;
  credentialId?: string;
  logoUrl?: string;
  skills?: string[];
}

/**
 * Returns Achievements from Sanity (or fallback local dataset).
 */
export async function getAchievements(): Promise<Achievement[]> {
  if (isSanityConfigured()) {
    const sanityAchievements = await sanityFetch<SanityAchievementDoc[]>({
      query: allAchievementsQuery,
      tags: ["achievement"],
    });

    if (sanityAchievements && sanityAchievements.length > 0) {
      return sanityAchievements.map((doc) => ({
        id: doc.id || doc._id,
        title: doc.title,
        issuer: doc.issuer,
        date: doc.date,
        shortDescription: doc.shortDescription || doc.description,
        description: doc.description,
        credentialId: doc.credentialId,
        skills: doc.skills || [],
        logo: {
          url: doc.logoUrl || "https://res.cloudinary.com/doyxte1wf/image/upload/v1787072866/Untitled_design_13_oe4d2e.png",
          alt: `${doc.issuer} Logo`,
          width: 48,
          height: 48,
        },
      }));
    }
  }

  return localAchievementsData;
}

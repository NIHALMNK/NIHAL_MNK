import { SiteSettings } from "@/types/site";
import { siteSettingsData as localSiteSettingsData } from "@/data/home/site";
import { sanityFetch, isSanityConfigured } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";

interface SanitySiteSettingsDoc {
  name: string;
  role: string;
  headline?: string;
  bio?: string;
  profileImage?: string;
  location?: string;
  availableForHire?: boolean;
  defaultSeo?: {
    title?: string;
    description?: string;
    siteUrl?: string;
    ogImageUrl?: string;
  };
}

/**
 * Returns Site Settings & Hero content from Sanity (or fallback local dataset).
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSanityConfigured()) {
    const sanitySite = await sanityFetch<SanitySiteSettingsDoc>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    });

    if (sanitySite && sanitySite.name) {
      return {
        ...localSiteSettingsData,
        name: sanitySite.name,
        role: sanitySite.role,
        headline: sanitySite.headline || localSiteSettingsData.headline,
        bio: sanitySite.bio || localSiteSettingsData.bio,
        profileImage: sanitySite.profileImage || localSiteSettingsData.profileImage,
        location: sanitySite.location || localSiteSettingsData.location,
        availableForHire: sanitySite.availableForHire ?? localSiteSettingsData.availableForHire,
        defaultSeo: {
          ...localSiteSettingsData.defaultSeo,
          title: sanitySite.defaultSeo?.title || localSiteSettingsData.defaultSeo.title,
          description: sanitySite.defaultSeo?.description || localSiteSettingsData.defaultSeo.description,
          siteUrl: sanitySite.defaultSeo?.siteUrl || localSiteSettingsData.defaultSeo.siteUrl,
          ogImage: {
            ...localSiteSettingsData.defaultSeo.ogImage,
            url: sanitySite.defaultSeo?.ogImageUrl || localSiteSettingsData.defaultSeo.ogImage.url,
          },
        },
      };
    }
  }

  return localSiteSettingsData;
}

import { SiteSettings } from "@/types/site";
import { sanityFetch } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";

interface SanitySiteSettingsDoc {
  name?: string;
  role?: string;
  headline?: string;
  bio?: string;
  profileImage?: string;
  avatarAssetUrl?: string;
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
 * Returns Site Settings & Hero content from the Sanity `siteSettings` singleton.
 * Fields not set in the CMS come back empty; the UI degrades gracefully.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const doc = await sanityFetch<SanitySiteSettingsDoc>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });

  const name = doc?.name || "";
  const avatarUrl = doc?.profileImage || doc?.avatarAssetUrl || "";
  const title = doc?.defaultSeo?.title || name || "Portfolio";

  return {
    name,
    role: doc?.role || "",
    headline: doc?.headline || "",
    bio: doc?.bio || "",
    avatar: {
      url: avatarUrl,
      alt: name ? `${name} Profile Photo` : "Profile Photo",
      width: 512,
      height: 512,
      aspectRatio: "1/1",
    },
    profileImage: avatarUrl || undefined,
    location: doc?.location || "",
    availableForHire: doc?.availableForHire ?? false,
    defaultSeo: {
      title,
      description: doc?.defaultSeo?.description || doc?.headline || "",
      siteUrl:
        process.env.NEXT_PUBLIC_SITE_URL || doc?.defaultSeo?.siteUrl || "http://localhost:3000",
      ogImage: {
        url: doc?.defaultSeo?.ogImageUrl || avatarUrl,
        alt: title,
        width: 1200,
        height: 630,
      },
    },
  };
}

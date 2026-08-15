import { Metadata } from "next";
import { siteSettingsData } from "@/data/site";

export function constructMetadata({
  title = siteSettingsData.defaultSeo.title,
  description = siteSettingsData.defaultSeo.description,
  image = siteSettingsData.defaultSeo.ogImage.url,
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteSettingsData.defaultSeo.siteUrl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: siteSettingsData.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@nihal_dev",
    },
    icons,
    metadataBase: new URL(siteUrl),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

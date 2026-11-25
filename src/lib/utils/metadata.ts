import { Metadata } from "next";
import { SiteSettings } from "@/types/site";

/**
 * Builds the root metadata from Sanity site settings.
 * Child pages set a plain `title` (e.g. "About"); the template appends the site name.
 */
export function constructMetadata(
  site: SiteSettings,
  { icons = "/favicon.ico", noIndex = false }: { icons?: string; noIndex?: boolean } = {}
): Metadata {
  const { title, description, siteUrl, ogImage } = site.defaultSeo;
  const images = ogImage.url
    ? [{ url: ogImage.url, width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    title: {
      default: title,
      template: site.name ? `%s — ${site.name}` : "%s",
    },
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: site.name || title,
      images,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images?.map((i) => i.url),
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

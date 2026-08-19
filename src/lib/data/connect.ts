import { ConnectLinks } from "@/types/connect";
import { connectLinksData as localConnectLinksData } from "@/data/connect";
import { sanityFetch, isSanityConfigured } from "@/sanity/client";
import { connectLinksQuery } from "@/sanity/queries";

/**
 * Returns the centralized social/contact links from Sanity (or local fallback).
 */
export async function getConnectLinks(): Promise<ConnectLinks> {
  if (isSanityConfigured()) {
    const sanityLinks = await sanityFetch<ConnectLinks>({
      query: connectLinksQuery,
      tags: ["connectLinks"],
    });

    if (sanityLinks && sanityLinks.github) {
      return sanityLinks;
    }
  }

  return localConnectLinksData;
}

/**
 * Synchronous version for use in client components.
 */
export function getConnectLinksSync(): ConnectLinks {
  return localConnectLinksData;
}

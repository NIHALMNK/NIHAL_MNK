import { ConnectLinks } from "@/types/connect";
import { sanityFetch } from "@/sanity/client";
import { connectLinksQuery } from "@/sanity/queries";

export const EMPTY_CONNECT_LINKS: ConnectLinks = {
  github: "",
  linkedin: "",
  instagram: "",
  leetcode: "",
  email: "",
  resume: "",
};

/**
 * Returns the social/contact/resume links from the Sanity `connectLinks` singleton.
 * Missing fields come back as empty strings so the UI can hide them.
 */
export async function getConnectLinks(): Promise<ConnectLinks> {
  const links = await sanityFetch<Partial<ConnectLinks>>({
    query: connectLinksQuery,
    tags: ["connectLinks"],
  });

  const merged = { ...EMPTY_CONNECT_LINKS };
  for (const key of Object.keys(merged) as (keyof ConnectLinks)[]) {
    merged[key] = links?.[key]?.trim() || "";
  }
  return merged;
}

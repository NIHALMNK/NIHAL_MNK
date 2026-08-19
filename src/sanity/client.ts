import { createClient, type ClientConfig } from "next-sanity";
import { projectId, dataset, apiVersion, isSanityConfigured } from "./config";

export { isSanityConfigured };

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
};

/**
 * Public Sanity client for fetching content on the server or client.
 */
export const client = createClient(config);

/**
 * Server-only authenticated Sanity client for mutations and data migrations.
 * NEVER expose to the browser.
 */
export function getAdminClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
  if (!token) {
    throw new Error(
      "Missing SANITY_API_WRITE_TOKEN in environment. Server mutations require an authenticated API token."
    );
  }
  return createClient({
    ...config,
    token,
    useCdn: false,
  });
}

/**
 * Helper function for typed GROQ queries with Next.js revalidation tag caching.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T | null> {
  if (!isSanityConfigured()) {
    return null;
  }

  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: revalidate !== false ? revalidate : undefined,
        tags: ["sanity", ...tags],
      },
    });
  } catch (error) {
    console.warn("[Sanity] Fetch failed, falling back to local dataset:", error);
    return null;
  }
}

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-19";

/**
 * Returns true if Sanity environment variables are present and configured.
 */
export function isSanityConfigured(): boolean {
  return Boolean(projectId && projectId.trim() !== "" && projectId !== "your_project_id_here");
}

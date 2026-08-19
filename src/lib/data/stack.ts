import { Technology } from "@/types/stack";
import { Project, ResolvedProject } from "@/types/project";
import { stackData } from "@/data/stack";

/**
 * Returns all technologies from the central Tech Stack dataset.
 */
export async function getAllTechnologies(): Promise<Technology[]> {
  return stackData;
}

/**
 * Synchronous version of getAllTechnologies for use in client components.
 * Returns the full stack dataset without requiring async/await.
 */
export function getAllTechnologiesSync(): Technology[] {
  return stackData;
}

/**
 * Alias for backward compatibility with stack page views.
 */
export async function getStackItems(): Promise<Technology[]> {
  return getAllTechnologies();
}

/**
 * Returns a single Technology entity by its URL slug.
 */
export async function getTechnologyBySlug(slug: string): Promise<Technology | null> {
  const all = await getAllTechnologies();
  return all.find((t) => t.slug === slug) ?? null;
}

/**
 * Returns a single Technology entity by its ID.
 */
export async function getTechnologyById(id: string): Promise<Technology | null> {
  const all = await getAllTechnologies();
  return all.find((t) => t.id === id) ?? null;
}

/**
 * Synchronously maps array of technology IDs to resolved Technology objects.
 */
export function getTechnologiesByIdsSync(ids: string[]): Technology[] {
  return ids
    .map((techIdOrName) => {
      const match = stackData.find(
        (t) =>
          t.id === techIdOrName ||
          t.slug === techIdOrName ||
          t.name.toLowerCase() === techIdOrName.toLowerCase()
      );

      if (match) return match;

      // Safe fallback entity if reference ID is unknown
      return {
        id: `tech-${techIdOrName.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
        name: techIdOrName,
        slug: techIdOrName.toLowerCase().replace(/[^a-z0-9]/g, ""),
        icon: {
          url: `https://res.cloudinary.com/demo/image/upload/v1/portfolio/tech/${techIdOrName.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`,
          alt: techIdOrName,
        },
      };
    })
    .filter((t): t is Technology => Boolean(t));
}

/**
 * Async DAL helper returning resolved Technology objects for array of IDs.
 */
export async function getTechnologiesByIds(ids: string[]): Promise<Technology[]> {
  return getTechnologiesByIdsSync(ids);
}

/**
 * Resolves a Project's raw technology ID references into full Technology objects.
 */
export function resolveProjectTechnologies(project: Project): ResolvedProject {
  const resolvedTechnologies = getTechnologiesByIdsSync(project.technologies || []);
  return {
    ...project,
    technologies: resolvedTechnologies,
  };
}

import { ResolvedProject, ProjectPriority } from "@/types/project";
import { projectsData } from "@/data/projects";
import { resolveProjectTechnologies } from "./stack";

/**
 * Returns all published projects with resolved Technology objects.
 */
export async function getAllProjects(): Promise<ResolvedProject[]> {
  return projectsData.map((project) => resolveProjectTechnologies(project));
}

/**
 * Strictly filters and returns the four featured projects with priority 1, 2, 3, or 4,
 * sorted in exact priority order (1 -> 2 -> 3 -> 4) with resolved Technology entities.
 */
export async function getFeaturedProjects(): Promise<ResolvedProject[]> {
  const allProjects = await getAllProjects();
  const validPriorities: ProjectPriority[] = [1, 2, 3, 4];
  
  return allProjects
    .filter((p): p is ResolvedProject & { priority: ProjectPriority } => 
      p.priority !== undefined && validPriorities.includes(p.priority)
    )
    .sort((a, b) => a.priority - b.priority);
}

/**
 * Returns a single project matching the specified slug with resolved Technology entities, or null if not found.
 */
export async function getProjectBySlug(slug: string): Promise<ResolvedProject | null> {
  const allProjects = await getAllProjects();
  return allProjects.find((p) => p.slug === slug) ?? null;
}

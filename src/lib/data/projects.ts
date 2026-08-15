import { Project, ProjectPriority } from "@/types/project";
import { projectsData } from "@/data/projects";

/**
 * Returns all published projects from the collection.
 */
export async function getAllProjects(): Promise<Project[]> {
  return projectsData;
}

/**
 * Strictly filters and returns the four featured projects with priority 1, 2, 3, or 4,
 * sorted in exact priority order (1 -> 2 -> 3 -> 4).
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getAllProjects();
  const validPriorities: ProjectPriority[] = [1, 2, 3, 4];
  
  return allProjects
    .filter((p): p is Project & { priority: ProjectPriority } => 
      p.priority !== undefined && validPriorities.includes(p.priority)
    )
    .sort((a, b) => a.priority - b.priority);
}

/**
 * Returns a single project matching the specified slug, or null if not found.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const allProjects = await getAllProjects();
  return allProjects.find((p) => p.slug === slug) ?? null;
}

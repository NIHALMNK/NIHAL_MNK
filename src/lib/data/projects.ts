import { ResolvedProject, ProjectPriority } from "@/types/project";
import { projectsData as localProjectsData } from "@/data/projects";
import { resolveProjectTechnologies } from "./stack";
import { sanityFetch, isSanityConfigured } from "@/sanity/client";
import { allProjectsQuery, projectBySlugQuery } from "@/sanity/queries";

interface SanityTechItem {
  id?: string;
  name: string;
  slug: string;
  category?: string;
  iconUrl?: string;
  icon?: { url?: string };
  tagline?: string;
  description?: string;
  proficiencyLevel?: "expert" | "proficient" | "familiar";
  documentationUrl?: string;
}

interface SanityProjectDoc {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverImageUrl?: string;
  videoUrl?: string;
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
  priority?: number;
  publishedAt: string;
  status?: "Operational" | "In Development" | "Archived";
  technologies?: SanityTechItem[];
}

function mapSanityProjectToDomain(doc: SanityProjectDoc): ResolvedProject {
  return {
    id: doc.id || doc._id,
    title: doc.title,
    slug: doc.slug,
    shortDescription: doc.shortDescription,
    description: doc.description,
    coverImage: {
      url: doc.coverImageUrl || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      alt: `${doc.title} Preview`,
      width: 1200,
      height: 675,
      aspectRatio: "16/9",
    },
    videoUrl: doc.videoUrl,
    technologies: (doc.technologies || []).map((t) => ({
      id: t.id || t.slug,
      name: t.name,
      slug: t.slug,
      category: t.category || "Additional Skills",
      icon: {
        url: t.iconUrl || t.icon?.url || "", // empty → TechIcon renders neutral fallback
        alt: `${t.name} Logo`,
      },
      tagline: t.tagline,
      description: t.description,
      proficiencyLevel: t.proficiencyLevel,
      documentationUrl: t.documentationUrl,
    })),
    features: doc.features || [],
    liveUrl: doc.liveUrl,
    githubUrl: doc.githubUrl,
    priority: (doc.priority as ProjectPriority) || undefined,
    publishedAt: doc.publishedAt,
    status: doc.status || "Operational",
  };
}

/**
 * Returns all published projects with resolved Technology objects.
 */
export async function getAllProjects(): Promise<ResolvedProject[]> {
  if (isSanityConfigured()) {
    const sanityProjects = await sanityFetch<SanityProjectDoc[]>({
      query: allProjectsQuery,
      tags: ["project", "stack"],
    });

    if (sanityProjects && sanityProjects.length > 0) {
      return sanityProjects.map(mapSanityProjectToDomain);
    }
  }

  return localProjectsData.map((project) => resolveProjectTechnologies(project));
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
  if (isSanityConfigured()) {
    const sanityProject = await sanityFetch<SanityProjectDoc>({
      query: projectBySlugQuery,
      params: { slug },
      tags: ["project", "stack"],
    });

    if (sanityProject) {
      return mapSanityProjectToDomain(sanityProject);
    }
  }

  const allProjects = await getAllProjects();
  return allProjects.find((p) => p.slug === slug) ?? null;
}

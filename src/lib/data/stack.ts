import { Technology } from "@/types/stack";
import { Project, ResolvedProject } from "@/types/project";
import { stackData as localStackData } from "@/data/stacks";
import { sanityFetch, isSanityConfigured } from "@/sanity/client";
import { allStacksQuery, stackBySlugQuery } from "@/sanity/queries";

interface SanityStackDoc {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  category: string;
  iconUrl?: string;
  tagline?: string;
  description?: string;
  proficiencyLevel?: Technology["proficiencyLevel"];
  yearsOfExperience?: number;
  documentationUrl?: string;
  order?: number;
  isActive?: boolean;
}

function mapSanityStackToDomain(doc: SanityStackDoc): Technology {
  return {
    id: doc.id || doc._id,
    name: doc.name,
    slug: doc.slug,
    category: doc.category || "Additional Skills",
    icon: {
      url: doc.iconUrl || "", // empty → TechIcon renders neutral fallback
      alt: `${doc.name} Logo`,
    },
    tagline: doc.tagline,
    description: doc.description,
    proficiencyLevel: doc.proficiencyLevel,
    yearsOfExperience: doc.yearsOfExperience,
    documentationUrl: doc.documentationUrl,
    order: doc.order,
    isActive: doc.isActive ?? true,
  };
}

/**
 * Returns all technologies from Sanity (or fallback local Tech Stack dataset).
 */
export async function getAllTechnologies(): Promise<Technology[]> {
  if (isSanityConfigured()) {
    const sanityStacks = await sanityFetch<SanityStackDoc[]>({
      query: allStacksQuery,
      tags: ["stack", "stackCategory"],
    });

    if (sanityStacks && sanityStacks.length > 0) {
      return sanityStacks.map(mapSanityStackToDomain);
    }
  }

  return localStackData;
}

/**
 * Synchronous version of getAllTechnologies for use in client components.
 */
export function getAllTechnologiesSync(): Technology[] {
  return localStackData;
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
  if (isSanityConfigured()) {
    const sanityStack = await sanityFetch<SanityStackDoc>({
      query: stackBySlugQuery,
      params: { slug },
      tags: ["stack"],
    });

    if (sanityStack) {
      return mapSanityStackToDomain(sanityStack);
    }
  }

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
      const match = localStackData.find(
        (t) =>
          t.id === techIdOrName ||
          t.slug === techIdOrName ||
          t.name.toLowerCase() === techIdOrName.toLowerCase()
      );

      if (match) return match;

      const fallbackSlug = techIdOrName.toLowerCase().replace(/[^a-z0-9]/g, "");
      return {
        id: `tech-${fallbackSlug}`,
        name: techIdOrName,
        slug: fallbackSlug,
        // No icon URL → TechIcon renders its neutral fallback icon.
        icon: { url: "", alt: techIdOrName },
      };
    })
    .filter((t): t is Technology => Boolean(t));
}

/**
 * Async DAL helper returning resolved Technology objects for array of IDs.
 */
export async function getTechnologiesByIds(ids: string[]): Promise<Technology[]> {
  const all = await getAllTechnologies();
  return ids
    .map((idOrName) => {
      const match = all.find(
        (t) =>
          t.id === idOrName ||
          t.slug === idOrName ||
          t.name.toLowerCase() === idOrName.toLowerCase()
      );
      return match || getTechnologiesByIdsSync([idOrName])[0];
    })
    .filter(Boolean);
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

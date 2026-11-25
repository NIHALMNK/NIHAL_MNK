import { Technology } from "@/types/stack";
import { sanityFetch } from "@/sanity/client";
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
 * Returns all active technologies from Sanity (empty when none are published).
 */
export async function getAllTechnologies(): Promise<Technology[]> {
  const docs = await sanityFetch<SanityStackDoc[]>({
    query: allStacksQuery,
    tags: ["stack", "stackCategory"],
  });
  return (docs || []).map(mapSanityStackToDomain);
}

/**
 * Returns a single Technology entity by its URL slug.
 */
export async function getTechnologyBySlug(slug: string): Promise<Technology | null> {
  const doc = await sanityFetch<SanityStackDoc>({
    query: stackBySlugQuery,
    params: { slug },
    tags: ["stack"],
  });
  return doc ? mapSanityStackToDomain(doc) : null;
}

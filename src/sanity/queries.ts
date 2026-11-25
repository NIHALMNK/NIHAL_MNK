import { groq } from "next-sanity";

// ─── Stacks Queries ─────────────────────────────────────────────────────────

export const allStackCategoriesQuery = groq`
  *[_type == "stackCategory"] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    order,
    description
  }
`;

export const allStacksQuery = groq`
  *[_type == "stack" && isActive != false] | order(order asc, name asc) {
    _id,
    "id": _id,
    name,
    "slug": slug.current,
    "category": category->name,
    "categorySlug": category->slug.current,
    iconUrl,
    icon,
    tagline,
    description,
    proficiencyLevel,
    yearsOfExperience,
    documentationUrl,
    order,
    isActive
  }
`;

export const stackBySlugQuery = groq`
  *[_type == "stack" && slug.current == $slug][0] {
    _id,
    "id": _id,
    name,
    "slug": slug.current,
    "category": category->name,
    "categorySlug": category->slug.current,
    iconUrl,
    icon,
    tagline,
    description,
    proficiencyLevel,
    yearsOfExperience,
    documentationUrl,
    order,
    isActive
  }
`;

// ─── Connect Query ──────────────────────────────────────────────────────────

export const connectLinksQuery = groq`
  *[_type == "connectLinks"][0] {
    github,
    linkedin,
    instagram,
    leetcode,
    email,
    resume
  }
`;

// ─── Home Domain Queries ───────────────────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    name,
    role,
    headline,
    bio,
    profileImage,
    "avatarAssetUrl": avatarAsset.asset->url,
    location,
    availableForHire,
    defaultSeo
  }
`;

export const aboutDataQuery = groq`
  *[_type == "about"][0] {
    profile,
    summary,
    education[] {
      id,
      institution,
      degree,
      field,
      period,
      location,
      description
    },
    experience[] {
      id,
      role,
      company,
      period,
      location,
      description,
      responsibilities,
      "technologies": technologies[]->name
    }
  }
`;

export const allAchievementsQuery = groq`
  *[_type == "achievement"] | order(date desc) {
    _id,
    "id": _id,
    title,
    issuer,
    date,
    shortDescription,
    description,
    credentialId,
    logoUrl,
    "skills": skills[]->name
  }
`;

export const allBooksQuery = groq`
  *[_type == "book"] | order(rating desc, title asc) {
    _id,
    "id": _id,
    title,
    author,
    coverUrl,
    review,
    rating,
    status,
    goodreadsUrl
  }
`;

export const allMoviesQuery = groq`
  *[_type == "movie"] | order(rating desc, year desc) {
    _id,
    "id": _id,
    title,
    director,
    year,
    posterUrl,
    review,
    rating,
    imdbUrl
  }
`;

export const allRecentSnapsQuery = groq`
  *[_type == "recentSnap"] | order(takenAt desc) {
    _id,
    "id": _id,
    caption,
    location,
    takenAt,
    mediaUrl,
    alt
  }
`;

export const allCurrentResourcesQuery = groq`
  *[_type == "currentResource"] | order(category asc, title asc) {
    _id,
    "id": _id,
    title,
    url,
    domain,
    category,
    description
  }
`;

// ─── Projects Queries ───────────────────────────────────────────────────────

export const allProjectsQuery = groq`
  *[_type == "project"] | order(priority asc, publishedAt desc) {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    coverImageUrl,
    videoUrl,
    features,
    liveUrl,
    githubUrl,
    status,
    priority,
    publishedAt,
    "technologies": technologies[]-> {
      _id,
      "id": _id,
      name,
      "slug": slug.current,
      "category": category->name,
      iconUrl,
      icon,
      tagline,
      description,
      proficiencyLevel,
      documentationUrl
    }
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    coverImageUrl,
    videoUrl,
    features,
    liveUrl,
    githubUrl,
    status,
    priority,
    publishedAt,
    "technologies": technologies[]-> {
      _id,
      "id": _id,
      name,
      "slug": slug.current,
      "category": category->name,
      iconUrl,
      icon,
      tagline,
      description,
      proficiencyLevel,
      documentationUrl
    }
  }
`;

// ─── Blogs Queries ──────────────────────────────────────────────────────────

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    introCallout,
    content,
    coverImageUrl,
    publishedAt,
    readingTime,
    tags,
    featured,
    author
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    introCallout,
    content,
    coverImageUrl,
    publishedAt,
    readingTime,
    tags,
    featured,
    author
  }
`;

import { BlogPost } from "@/types/blog";

export const blogData: BlogPost[] = [
  {
    id: "post-1",
    title: "Building Production-Grade Data Access Boundaries in Next.js App Router",
    slug: "building-production-grade-data-access-boundaries-nextjs",
    excerpt: "Learn how to decouple presentation logic from CMS & external API dependencies using strict TypeScript data contracts and server-side data access mappers.",
    content: `
# Building Production-Grade Data Access Boundaries in Next.js App Router

Architecting modern frontend applications requires a disciplined separation between how data is presented and how data is fetched or stored.

## The Core Problem

Directly coupling UI components to raw API schemas or CMS GROQ responses introduces tight coupling. When backend APIs mutate or CMS schemas evolve, presentation components shatter across the entire codebase.

## The Solution: Application-Level Data Contracts

By defining clean TypeScript domain interfaces (\`Project\`, \`BlogPost\`, \`User\`), the UI component layer only interacts with normalized domain shapes.

\`\`\`typescript
// src/types/project.ts
export interface Project {
  id: string;
  title: string;
  slug: string;
  coverImage: MediaItem;
  publishedAt: string;
}
\`\`\`

## Data Access Layer (DAL)

The Data Access Layer acts as an intermediary mapping raw data sources into domain types:

\`\`\`typescript
export async function getFeaturedProjects(): Promise<Project[]> {
  const data = await fetchProjectsFromSource();
  return data.map(mapToProjectDomain);
}
\`\`\`

This pattern enables seamless content migration from local datasets to Headless CMS instances like Sanity without touching a single UI line.
    `,
    coverImage: {
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
      alt: "Clean TypeScript Code Structure",
      width: 1200,
      height: 675,
      aspectRatio: "16/9",
    },
    publishedAt: "2026-02-10",
    readingTime: "5 min read",
    tags: ["Next.js", "TypeScript", "Architecture", "Design Patterns"],
    featured: true,
    author: {
      name: "Nihal",
      role: "Frontend Architect",
    },
  },
  {
    id: "post-2",
    title: "Zero-FOUC Theme Architecture with CSS Variables and next-themes",
    slug: "zero-fouc-theme-architecture-css-variables-next-themes",
    excerpt: "Eliminate dark mode hydration flashes and layout jumps in Next.js using semantic CSS custom properties and SSR theme scripts.",
    content: `
# Zero-FOUC Theme Architecture with CSS Variables and next-themes

Hydration mismatch and Flash of Unstyled Content (FOUC) are frequent challenges when implementing dark mode in server-rendered applications.

## Semantic CSS Design Tokens

Instead of hardcoding color classes across components, define semantic token aliases in \`globals.css\`:

\`\`\`css
:root {
  --background: 0 0% 100%;
  --foreground: 224 71.4% 4.1%;
}

.dark {
  --background: 224 71.4% 4.1%;
  --foreground: 210 20% 98%;
}
\`\`\`

## Integrating next-themes

Wrapping the application shell with \`next-themes\` injects an inline theme detection script before hydration completes, ensuring consistent visual themes across SSR and Client interactions.
    `,
    coverImage: {
      url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
      alt: "Dark and Light Visual Theme",
      width: 1200,
      height: 675,
      aspectRatio: "16/9",
    },
    publishedAt: "2026-01-28",
    readingTime: "4 min read",
    tags: ["CSS", "Tailwind CSS", "UX", "Web Performance"],
    featured: false,
    author: {
      name: "Nihal",
      role: "Frontend Architect",
    },
  },
  {
    id: "post-3",
    title: "Designing Accessible Focus States and Reduced Motion Rules",
    slug: "designing-accessible-focus-states-and-reduced-motion-rules",
    excerpt: "How to craft keyboard-accessible interfaces and respect prefers-reduced-motion media queries without sacrificing delight.",
    content: `
# Designing Accessible Focus States and Reduced Motion Rules

Accessibility (a11y) should be baked into the foundational design tokens of an application, not bolted on at launch.

## Focus Ring System

Visible focus indicators guide keyboard users across interactive elements:

\`\`\`css
:focus-visible {
  @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
}
\`\`\`

## Respecting Prefers-Reduced-Motion

Animations should dynamically degrade for users with motion sensitivity:

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`
    `,
    coverImage: {
      url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
      alt: "Keyboard Accessibility",
      width: 1200,
      height: 675,
      aspectRatio: "16/9",
    },
    publishedAt: "2025-12-14",
    readingTime: "6 min read",
    tags: ["Accessibility", "Web Standards", "UX"],
    featured: false,
  },
];

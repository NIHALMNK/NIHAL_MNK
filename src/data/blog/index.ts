import { BlogPost } from "@/types/blog";

export const blogData: BlogPost[] = [
  {
    id: "post-1",
    title: "Building Production-Grade Data Access Boundaries in Next.js App Router",
    slug: "building-production-grade-data-access-boundaries-nextjs",
    excerpt: "Learn how to decouple presentation logic from CMS & external API dependencies using strict TypeScript data contracts and server-side data access mappers.",
    introCallout: "Architecting modern frontend applications requires a disciplined separation between how data is presented and how data is fetched or stored.",
    content: `
Architecting modern frontend applications requires a disciplined separation between how data is presented and how data is fetched or stored. Without explicit architectural boundaries, UI components quickly become brittle, directly depending on third-party API response shapes.

## The core problem

Directly coupling UI components to raw API schemas or Headless CMS responses introduces severe technical debt. When external endpoints mutate or CMS schemas evolve, presentation components shatter across the entire codebase.

### Schema instability and refactoring risk

- Hardcoded API properties leak backend implementation details into React components.
- Renaming a single GraphQL field requires sweeping changes across dozens of JSX files.
- Testing presentation components becomes difficult when mock structures must mirror volatile API payloads.

## The solution: application-level data contracts

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

## Data access layer pattern

The Data Access Layer acts as an intermediary mapping raw data sources into domain types.

\`\`\`typescript
export async function getFeaturedProjects(): Promise<Project[]> {
  const data = await fetchProjectsFromSource();
  return data.map(mapToProjectDomain);
}
\`\`\`

This pattern enables seamless content migration from local datasets to Headless CMS instances like Sanity without touching a single line of UI code.

### In-memory caching and performance

Implementing custom server-side caching decorators ensures data access boundaries remain fast under heavy traffic loads while preventing unnecessary upstream network calls.
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
    introCallout: "Hydration mismatch and Flash of Unstyled Content (FOUC) are frequent challenges when implementing dark mode in server-rendered applications.",
    content: `
Hydration mismatch and Flash of Unstyled Content (FOUC) are frequent challenges when implementing dark mode in server-rendered applications. When server HTML and client theme state disagree, users experience unpleasant flashes.

## Understanding hydration mismatches

When the server renders HTML assuming a default theme (e.g. light mode), but the client user preference stored in localStorage or system settings is dark mode, the client runtime re-renders the DOM with mismatched classes.

### Eliminating the flash of unstyled content

- Server-side theme injection scripts run before DOM rendering completes.
- CSS custom properties provide instantaneous, zero-JS layout theme switches.
- Tailwind CSS color mappings utilize CSS variable channels for atomic class consistency.

## Semantic CSS design tokens

Instead of hardcoding color classes across components, define semantic token aliases in \`globals.css\`:

\`\`\`css
:root {
  --background: 38.18 33.33% 93.53%;
  --foreground: 240 5.9% 10%;
}

.dark {
  --background: 240 10% 3.92%;
  --foreground: 0 0% 95%;
}
\`\`\`

## Integrating next-themes cleanly

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
    introCallout: "Accessibility (a11y) should be baked into the foundational design tokens of an application, not bolted on at launch.",
    content: `
Accessibility (a11y) should be baked into the foundational design tokens of an application, not bolted on at launch. Creating inclusive software requires thoughtful attention to keyboard navigation, visual focus states, and user motion preferences.

## Focus ring system design

Visible focus indicators guide keyboard users across interactive elements without cluttering pointer-based interactions:

\`\`\`css
:focus-visible {
  outline: none;
  ring: 2px;
  ring-offset: 2px;
}
\`\`\`

### Keyboard navigation standards

- Ensure logical DOM focus ordering across custom modal dialogues and dropdowns.
- Always provide clear ESC key dismissal handlers for overlay elements.
- Never strip focus indicators without providing accessible high-contrast alternatives.

## Respecting prefers-reduced-motion

Animations should dynamically degrade for users with vestibular disorders or motion sensitivity:

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
    author: {
      name: "Nihal",
      role: "Frontend Architect",
    },
  },
];

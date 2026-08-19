import { Bookmark } from "@/types/bookmark";

export const bookmarksData: Bookmark[] = [
  {
    id: "bm-1",
    title: "The unfounded popularity of object-oriented programming",
    url: "https://youtube.com/watch?v=QM1iUe6IofM",
    domain: "youtube.com",
    category: "Engineering",
    description: "Challenges the status quo of OOP thinking.",
  },
  {
    id: "bm-2",
    title: "W3C Web Content Accessibility Guidelines (WCAG) 2.2",
    url: "https://www.w3.org/TR/WCAG22/",
    domain: "w3.org",
    category: "Accessibility",
    description: "Official standards for creating accessible, inclusive web interfaces.",
  },
  {
    id: "bm-3",
    title: "Next.js Documentation — App Router",
    url: "https://nextjs.org/docs/app",
    domain: "nextjs.org",
    category: "Documentation",
    description: "Official reference guide for Server Components, routing, and data access patterns.",
  },
  {
    id: "bm-4",
    title: "Tailwind CSS v4 Roadmap",
    url: "https://tailwindcss.com",
    domain: "tailwindcss.com",
    category: "Design Systems",
    description: "Key updates on CSS variable engine and high-performance compilation.",
  },
];

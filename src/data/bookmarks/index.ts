import { Bookmark } from "@/types/bookmark";

export const bookmarksData: Bookmark[] = [
  {
    id: "bm-1",
    title: "W3C Web Content Accessibility Guidelines (WCAG) 2.2",
    url: "https://www.w3.org/TR/WCAG22/",
    category: "Accessibility",
    description: "Official standards for creating accessible, inclusive web interfaces.",
    savedAt: "2026-02-01",
  },
  {
    id: "bm-2",
    title: "Next.js Documentation — App Router",
    url: "https://nextjs.org/docs/app",
    category: "Documentation",
    description: "Official reference guide for Server Components, routing, and data access patterns.",
    savedAt: "2026-01-15",
  },
  {
    id: "bm-3",
    title: "Tailwind CSS v4 Roadmap",
    url: "https://tailwindcss.com",
    category: "Design Systems",
    description: "Key updates on CSS variable engine and high-performance compilation.",
    savedAt: "2025-12-10",
  },
];

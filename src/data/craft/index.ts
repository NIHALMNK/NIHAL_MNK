import { CraftItem } from "@/types/craft";

export const craftData: CraftItem[] = [
  {
    id: "craft-1",
    title: "Glassmorphism Card Shimmer",
    slug: "glassmorphism-card-shimmer",
    description: "Interactive mouse-tracking light reflections over frosted glass containers using CSS custom properties.",
    githubUrl: "https://github.com/nihal/craft-glass-shimmer",
    previewUrl: "https://craft-shimmer.example.com",
    media: {
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      alt: "Glassmorphism Shimmer Preview",
    },
    technologies: ["CSS Variables", "React", "TypeScript"],
    createdAt: "2026-02-01",
  },
  {
    id: "craft-2",
    title: "Smooth Kinetic Text Scroll",
    slug: "kinetic-text-scroll",
    description: "Variable font weight and skew animations synchronized with scroll velocity.",
    githubUrl: "https://github.com/nihal/craft-kinetic-scroll",
    media: {
      url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
      alt: "Kinetic Scroll Preview",
    },
    technologies: ["Variable Fonts", "Framer Motion"],
    createdAt: "2026-01-18",
  },
  {
    id: "craft-3",
    title: "Command Palette Primitive",
    slug: "command-palette-primitive",
    description: "Accessible search overlay modal with keyboard arrow navigation and fuzzy search scoring.",
    githubUrl: "https://github.com/nihal/craft-cmd-k",
    media: {
      url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
      alt: "Command Palette Preview",
    },
    technologies: ["React", "ARIA", "Tailwind CSS"],
    createdAt: "2025-11-30",
  },
];

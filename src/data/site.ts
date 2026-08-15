import { SiteSettings } from "@/types/site";

export const siteSettingsData: SiteSettings = {
  name: "Nihal",
  role: "Senior Frontend Architect & Full-Stack Engineer",
  headline: "Crafting production-grade web systems with modern React, Next.js, and clean architecture.",
  bio: "I design and build resilient digital products, scalable web applications, and accessible UI component systems. Focused on performance, TypeScript strictness, and beautiful user experiences.",
  avatar: {
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    alt: "Nihal Profile Photo",
    width: 600,
    height: 600,
  },
  location: "Kochi, India",
  availableForHire: true,
  email: "nihal.mnk.dev@gmail.com",
  socials: {
    github: "https://github.com/nihal",
    linkedin: "https://linkedin.com/in/nihal-mnk",
    twitter: "https://twitter.com/nihal_dev",
  },
  defaultSeo: {
    title: "Nihal — Senior Frontend Architect & Portfolio",
    description: "Personal developer portfolio of Nihal featuring projects, articles, craft experiments, and tech stack.",
    siteUrl: "https://nihal-portfolio.vercel.app",
    ogImage: {
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
      alt: "Nihal Portfolio Preview",
      width: 1200,
      height: 630,
    },
  },
};

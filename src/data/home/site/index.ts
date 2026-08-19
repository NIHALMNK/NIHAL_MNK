import { SiteSettings } from "@/types/site";
import { NavigationConfig } from "@/types/navigation";

// ─── Site Identity (Hero / Global) ───────────────────────────────────────────
// This is the single source of truth for site-level identity data.
// Social / contact links live in src/data/connect/index.ts — NOT here.
export const siteSettingsData: SiteSettings = {
  name: "Mohammed Nihal K",
  role: "MERN Stack Developer • Engineer • Builder",
  headline: "I build complete web and AI experiences from zero to one. Focused on the entire lifecycle from design to deployment, I prioritize shipping products that users love over getting lost in technical details.",
  bio: "I build complete web and AI experiences from zero to one. Focused on the entire lifecycle from design to deployment, I prioritize shipping products that users love over getting lost in technical details.",
  avatar: {
    url: "https://res.cloudinary.com/doyxte1wf/image/upload/v1787069442/NIHAL-MNK_f2epho.png",
    alt: "Mohammed Nihal K Profile Photo",
    width: 512,
    height: 512,
    aspectRatio: "1/1",
  },
  profileImage: "https://res.cloudinary.com/doyxte1wf/image/upload/v1787069442/NIHAL-MNK_f2epho.png",
  location: "India (UTC+5:30)",
  availableForHire: true,
  email: "mohammednihal.dev@gmail.com",
  resumeUrl: "/resume.pdf",
  // socials is kept for backward-compat but the authoritative source is src/data/connect/index.ts
  socials: {
    instagram: "https://instagram.com/",
    github: "https://github.com/NIHALMNK",
    linkedin: "https://www.linkedin.com/in/mohammednihalk6061/",
  },
  defaultSeo: {
    title: "Mohammed Nihal K — MERN Stack Developer Portfolio",
    description:
      "Personal developer portfolio of Mohammed Nihal K featuring projects, articles, recent snaps, and tech stack.",
    siteUrl: "https://nihalmnk-portfolio.vercel.app",
    ogImage: {
      url: "https://res.cloudinary.com/doyxte1wf/image/upload/v1785831231/NIHAL_MNK_profile.webp",
      alt: "Mohammed Nihal K Portfolio Preview",
      width: 1200,
      height: 630,
    },
  },
};

// ─── Navigation Config ────────────────────────────────────────────────────────
export const navigationConfigData: NavigationConfig = {
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blogs" },
    { title: "Stack", href: "/stack" },
    { title: "Contact", href: "/contact" },
  ],
  // socialLinks resolved from connect domain — kept here for backward-compat only
  socialLinks: {
    instagram: "https://instagram.com/",
    github: "https://github.com/NIHALMNK",
    linkedin: "https://www.linkedin.com/in/mohammednihalk6061/",
    email: "/contact",
    resume: "/resume.pdf",
  },
};

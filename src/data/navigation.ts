import { NavigationConfig } from "@/types/navigation";

export const navigationConfigData: NavigationConfig = {
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blogs" },
    { title: "Craft", href: "/craft" },
    { title: "Stack", href: "/stack" },
    { title: "Contact", href: "/contact" },
  ],
  socialLinks: {
    instagram: "https://instagram.com/",
    github: "https://github.com/nihal",
    linkedin: "https://linkedin.com/in/nihal-mnk",
    email: "mailto:nihal.mnk.dev@gmail.com",
    resume: "/resume.pdf",
  },
};

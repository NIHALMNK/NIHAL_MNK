import { ConnectLinks } from "@/types/connect";

// ─── Connect — Single Source of Truth for Social & Contact Links ──────────────
// All UI (Footer, Navbar, About, Contact page) must read from this file.
// Do NOT hardcode these URLs in components.
// Twitter/X is intentionally excluded.
export const connectLinksData: ConnectLinks = {
  instagram: "https://instagram.com/",
  github: "https://github.com/NIHALMNK",
  linkedin: "https://www.linkedin.com/in/mohammednihalk6061/",
  email: "mohammednihal.dev@gmail.com",
  resume: "/resume.pdf",
};

import { ConnectLinks } from "@/types/connect";

// ─── Connect — Single Source of Truth for Social & Contact Links ──────────────
// Seed values only — at runtime the site reads these from Sanity (`connectLinks`).
// Leave a value empty to fill it in Sanity Studio instead.
// Twitter/X is intentionally excluded.
export const connectLinksData: ConnectLinks = {
  instagram: "",
  leetcode: "https://leetcode.com/u/MohammedNihalk",
  github: "https://github.com/NIHALMNK",
  linkedin: "https://www.linkedin.com/in/mohammednihalk6061/",
  email: "mohammednihal.dev@gmail.com",
  resume: "", // paste the Google Drive share link in Sanity Studio
};

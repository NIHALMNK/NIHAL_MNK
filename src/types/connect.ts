// Connect domain — social/contact links (single source of truth: Sanity `connectLinks`).
// Any field may be an empty string when not set in the CMS; UI hides empty links.
export interface ConnectLinks {
  github: string;
  linkedin: string;
  instagram: string;
  leetcode: string;
  email: string;
  /** Google Drive share link to the resume PDF */
  resume: string;
}

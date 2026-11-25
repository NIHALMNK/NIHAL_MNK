import type { ComponentType } from "react";
import { FileText, Github, Instagram, Linkedin, Mail } from "lucide-react";
import type { ConnectLinks } from "@/types/connect";

export interface SocialLinkItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  external: boolean;
}

/**
 * Extracts a Google Drive file ID from the common share-link shapes:
 *   https://drive.google.com/file/d/<id>/view?usp=sharing
 *   https://drive.google.com/open?id=<id>
 *   https://drive.google.com/uc?id=<id>&export=download
 */
export function getDriveFileId(url: string): string | null {
  if (!url) return null;
  const pathMatch = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (pathMatch) return pathMatch[1];
  try {
    const parsed = new URL(url);
    if (parsed.hostname.endsWith("google.com")) {
      return parsed.searchParams.get("id");
    }
  } catch {
    // not a valid URL
  }
  return null;
}

/**
 * Normalises the resume link from Sanity into a URL that opens the PDF in
 * Google Drive's viewer (works for any share-link shape). Non-Drive URLs are
 * returned unchanged; an empty value returns "".
 */
export function getResumeViewUrl(url: string): string {
  const id = getDriveFileId(url);
  return id ? `https://drive.google.com/file/d/${id}/view` : url;
}

/** Direct-download URL for a Drive-hosted resume (falls back to the original URL). */
export function getResumeDownloadUrl(url: string): string {
  const id = getDriveFileId(url);
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : url;
}

/** Returns the last non-empty path segment of a profile URL (e.g. the GitHub/LeetCode username). */
export function getProfileUsername(url: string): string | null {
  if (!url) return null;
  try {
    const segments = new URL(url).pathname.split("/").filter(Boolean);
    return segments.length ? segments[segments.length - 1] : null;
  } catch {
    return null;
  }
}

/**
 * Builds the ordered list of social / contact buttons from the CMS links.
 * Links that are empty in Sanity are omitted.
 */
export function buildSocialLinks(
  connect: ConnectLinks,
  { includeEmail = true, includeResume = true }: { includeEmail?: boolean; includeResume?: boolean } = {}
): SocialLinkItem[] {
  const items: (SocialLinkItem | false)[] = [
    !!connect.instagram && { label: "Instagram", href: connect.instagram, icon: Instagram, external: true },
    !!connect.github && { label: "GitHub", href: connect.github, icon: Github, external: true },
    !!connect.linkedin && { label: "LinkedIn", href: connect.linkedin, icon: Linkedin, external: true },
    includeEmail && { label: "Email", href: "/contact", icon: Mail, external: false },
    includeResume &&
      !!connect.resume && {
        label: "Resume",
        href: getResumeViewUrl(connect.resume),
        icon: FileText,
        external: true,
      },
  ];
  return items.filter((item): item is SocialLinkItem => Boolean(item));
}

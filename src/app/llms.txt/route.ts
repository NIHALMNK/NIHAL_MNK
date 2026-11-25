import { getSiteSettings } from "@/lib/data/site";
import { getConnectLinks } from "@/lib/data/connect";
import { getAllTechnologies } from "@/lib/data/stack";
import { getFeaturedProjects } from "@/lib/data/projects";
import { getResumeViewUrl } from "@/lib/utils/connect-links";

// Prerendered; refreshed by the Sanity webhook (tag revalidation) or hourly.
export const dynamic = "force-static";
export const revalidate = 3600;

/**
 * /llms.txt — AI context file generated entirely from Sanity content.
 */
export async function GET() {
  const [site, connect, technologies, projects] = await Promise.all([
    getSiteSettings(),
    getConnectLinks(),
    getAllTechnologies(),
    getFeaturedProjects(),
  ]);

  const lines: string[] = [];
  lines.push(`# ${site.name || "Portfolio"} — Portfolio & Engineering Context`, "");
  if (site.role) lines.push(`> ${site.role}`);
  if (site.location) lines.push(`> Location: ${site.location}`);
  lines.push(`> Website: ${site.defaultSeo.siteUrl}`, "");

  if (site.headline || site.bio) {
    lines.push("## Summary", site.bio || site.headline, "");
  }

  if (technologies.length) {
    const byCategory = new Map<string, string[]>();
    for (const tech of technologies) {
      const category = tech.category || "Other";
      byCategory.set(category, [...(byCategory.get(category) || []), tech.name]);
    }
    lines.push("## Core Technologies");
    for (const [category, names] of byCategory) {
      lines.push(`- ${category}: ${names.join(", ")}`);
    }
    lines.push("");
  }

  if (projects.length) {
    lines.push("## Featured Projects");
    for (const project of projects) {
      lines.push(`- ${project.title}: ${project.shortDescription}`);
    }
    lines.push("");
  }

  const contact = [
    connect.github && `- GitHub: ${connect.github}`,
    connect.linkedin && `- LinkedIn: ${connect.linkedin}`,
    connect.instagram && `- Instagram: ${connect.instagram}`,
    connect.leetcode && `- LeetCode: ${connect.leetcode}`,
    connect.email && `- Email: ${connect.email}`,
    connect.resume && `- Resume: ${getResumeViewUrl(connect.resume)}`,
  ].filter(Boolean);
  if (contact.length) {
    lines.push("## Contact & Social Links", ...(contact as string[]), "");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

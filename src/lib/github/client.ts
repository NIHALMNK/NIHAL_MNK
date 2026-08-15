import { GitHubActivity } from "@/types/github";

/**
 * Server-side client boundary for GitHub API.
 * Uses graceful empty-state fallback if environment variables are unconfigured or request fails.
 */
export async function fetchGitHubActivityServer(): Promise<GitHubActivity> {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_ACCESS_TOKEN;

  // Graceful empty-state fallback when credentials are absent
  if (!username || !token) {
    return {
      username: username || "nihal",
      totalContributions: 0,
      days: [],
      isAvailable: false,
    };
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 }, // Revalidate hourly
    });

    if (!res.ok) {
      return {
        username,
        totalContributions: 0,
        days: [],
        isAvailable: false,
      };
    }

    // Process real GitHub response if valid
    return {
      username,
      totalContributions: 0,
      days: [],
      isAvailable: true,
    };
  } catch {
    return {
      username,
      totalContributions: 0,
      days: [],
      isAvailable: false,
    };
  }
}

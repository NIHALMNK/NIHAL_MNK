import { GitHubActivity, GitHubContributionDay } from "@/types/github";

function mapGraphQLContributionLevel(levelStr: string): 0 | 1 | 2 | 3 | 4 {
  switch (levelStr) {
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
    case "NONE":
    default:
      return 0;
  }
}

/**
 * Server-side client boundary for GitHub API.
 * Uses official GitHub GraphQL API for contribution calendar and REST for public profile metadata.
 * Safely logs diagnostic details on the server without exposing secrets.
 * Supports partial REST metadata when GITHUB_ACCESS_TOKEN is not configured.
 */
export async function fetchGitHubActivityServer(cmsUsername?: string | null): Promise<GitHubActivity> {
  // GITHUB_USERNAME env var overrides the username derived from the Sanity GitHub URL.
  const username = process.env.GITHUB_USERNAME || cmsUsername || "";
  if (!username) {
    return {
      username: "",
      totalContributions: 0,
      days: [],
      isAvailable: false,
      isCalendarAvailable: false,
      calendarUnavailableReason: "Add your GitHub profile URL in Sanity (Connect & Social Links).",
    };
  }
  const rawToken = process.env.GITHUB_ACCESS_TOKEN;
  const isTokenValid = Boolean(
    rawToken && rawToken.trim().length > 0 && !rawToken.includes("PASTE_YOUR_GITHUB_TOKEN_HERE")
  );

  // Safe server-side diagnostic logging (NEVER logs secret tokens or authorization headers)
  console.log(`[GitHub API Diagnostic] Username: "${username}" | Access Token Configured: ${isTokenValid ? "YES" : "NO"}`);

  // Helper to fetch REST public profile metadata (publicRepos, followers) unauthenticated
  async function fetchRESTProfile() {
    try {
      const restRes = await fetch(`https://api.github.com/users/${username}`, {
        headers: { "User-Agent": "Nihal-Portfolio-Client" },
        next: { revalidate: 3600 },
      });
      if (restRes.ok) {
        const restJson = await restRes.json();
        return {
          publicRepos: restJson.public_repos ?? 0,
          followers: restJson.followers ?? 0,
        };
      }
    } catch (restErr: unknown) {
      const msg = restErr instanceof Error ? restErr.message : String(restErr);
      console.warn(`[GitHub API] REST profile fetch error for user "${username}": ${msg}`);
    }
    return { publicRepos: undefined, followers: undefined };
  }

  // Diagnostic log if token is unconfigured or placeholder
  if (!isTokenValid) {
    console.warn(
      `[GitHub API] GITHUB_ACCESS_TOKEN is unconfigured for user "${username}". Fetching REST profile metadata as unauthenticated fallback.`
    );
    const restData = await fetchRESTProfile();

    return {
      username,
      totalContributions: 0,
      publicRepos: restData.publicRepos,
      followers: restData.followers,
      days: [],
      isAvailable: true, // Profile metadata available
      isCalendarAvailable: false, // Heatmap calendar requires GITHUB_ACCESS_TOKEN
      calendarUnavailableReason: "Configure GITHUB_ACCESS_TOKEN in .env.local to load live GraphQL contribution calendar graph.",
    };
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        login
        followers { totalCount }
        repositories(first: 1, ownerAffiliations: OWNER) { totalCount }
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          contributionCalendar {
            totalContributions
            months {
              name
              firstDay
              totalWeeks
            }
            weeks {
              firstDay
              contributionDays {
                date
                contributionCount
                contributionLevel
                weekday
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${rawToken}`,
        "Content-Type": "application/json",
        "User-Agent": "Nihal-Portfolio-Client",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 }, // Hourly automatic server revalidation
    });

    if (!res.ok) {
      console.warn(`[GitHub API] GraphQL request returned HTTP status ${res.status}. Falling back to REST metadata.`);
      const restData = await fetchRESTProfile();
      return {
        username,
        totalContributions: 0,
        publicRepos: restData.publicRepos,
        followers: restData.followers,
        days: [],
        isAvailable: true,
        isCalendarAvailable: false,
        calendarUnavailableReason: `GitHub GraphQL API returned HTTP ${res.status}.`,
      };
    }

    const json = await res.json();

    if (json.errors && json.errors.length > 0) {
      console.warn(`[GitHub API] GraphQL returned errors:`, json.errors[0]?.message);
      const restData = await fetchRESTProfile();
      return {
        username,
        totalContributions: 0,
        publicRepos: restData.publicRepos,
        followers: restData.followers,
        days: [],
        isAvailable: true,
        isCalendarAvailable: false,
        calendarUnavailableReason: `GitHub GraphQL error: ${json.errors[0]?.message || "API Error"}`,
      };
    }

    const user = json?.data?.user;
    if (!user || !user.contributionsCollection) {
      console.warn(`[GitHub API] User "${username}" not found or contributionsCollection absent.`);
      const restData = await fetchRESTProfile();
      return {
        username,
        totalContributions: 0,
        publicRepos: restData.publicRepos,
        followers: restData.followers,
        days: [],
        isAvailable: true,
        isCalendarAvailable: false,
        calendarUnavailableReason: `User "${username}" contribution graph not found.`,
      };
    }

    const calendar = user.contributionsCollection.contributionCalendar;
    const totalContributions = calendar.totalContributions || 0;
    const totalCommits = user.contributionsCollection.totalCommitContributions || 0;
    const pullRequests = user.contributionsCollection.totalPullRequestContributions || 0;
    const publicRepos = user.repositories?.totalCount || 0;
    const followers = user.followers?.totalCount || 0;

    const days: GitHubContributionDay[] = [];
    if (Array.isArray(calendar.weeks)) {
      for (const week of calendar.weeks) {
        if (Array.isArray(week.contributionDays)) {
          for (const day of week.contributionDays) {
            days.push({
              date: day.date,
              count: day.contributionCount || 0,
              level: mapGraphQLContributionLevel(day.contributionLevel),
            });
          }
        }
      }
    }

    return {
      username,
      totalContributions,
      totalCommits,
      pullRequests,
      publicRepos,
      followers,
      days,
      isAvailable: true,
      isCalendarAvailable: true,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn(`[GitHub API] Execution exception: ${errorMsg}`);
    const restData = await fetchRESTProfile();
    return {
      username,
      totalContributions: 0,
      publicRepos: restData.publicRepos,
      followers: restData.followers,
      days: [],
      isAvailable: true,
      isCalendarAvailable: false,
      calendarUnavailableReason: `Network error: ${errorMsg}`,
    };
  }
}

import { GitHubActivity, GitHubContributionDay } from "@/types/github";

const USER_AGENT = "Portfolio-Activity-Client";
const REVALIDATE_SECONDS = 3600;

type Level = GitHubContributionDay["level"];

interface CalendarResult {
  totalContributions: number;
  days: GitHubContributionDay[];
  totalCommits?: number;
  pullRequests?: number;
  publicRepos?: number;
  followers?: number;
}

type GraphQLOutcome = { ok: true; data: CalendarResult } | { ok: false; reason: string };

function mapGraphQLContributionLevel(levelStr: string): Level {
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
 * Normalises a token pasted into an env var: trims whitespace/newlines, strips
 * surrounding quotes and a leading "Bearer "/"token " prefix. Returns null for
 * empty or placeholder values.
 */
export function normalizeGitHubToken(raw: string | undefined): string | null {
  if (!raw) return null;
  const stripQuotes = (v: string) => v.trim().replace(/^["']|["']$/g, "").trim();
  const token = stripQuotes(stripQuotes(raw).replace(/^(bearer|token)\s+/i, ""));
  if (!token || token.includes("PASTE_YOUR_GITHUB_TOKEN_HERE")) return null;
  return token;
}

/** Public profile metadata (repos, followers) — unauthenticated REST, never needs a token. */
async function fetchRESTProfile(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/vnd.github+json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (res.ok) {
      const json = await res.json();
      return {
        publicRepos: json.public_repos as number | undefined,
        followers: json.followers as number | undefined,
      };
    }
    console.warn(`[GitHub API] REST profile returned HTTP ${res.status} for "${username}".`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[GitHub API] REST profile fetch error for "${username}": ${msg}`);
  }
  return { publicRepos: undefined, followers: undefined };
}

const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      followers { totalCount }
      repositories(first: 1, ownerAffiliations: OWNER, privacy: PUBLIC) { totalCount }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

/** Full contribution data via the authenticated GraphQL API. */
async function fetchGraphQLCalendar(username: string, token: string): Promise<GraphQLOutcome> {
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
      },
      body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { username } }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (res.status === 401) {
      return {
        ok: false,
        reason:
          "GITHUB_ACCESS_TOKEN was rejected (HTTP 401) — it is invalid, expired or revoked. Generate a new token and update it in your hosting environment.",
      };
    }
    if (!res.ok) {
      return { ok: false, reason: `GitHub GraphQL API returned HTTP ${res.status}.` };
    }

    const json = await res.json();
    if (json.errors?.length) {
      return { ok: false, reason: `GitHub GraphQL error: ${json.errors[0]?.message || "unknown"}` };
    }

    const user = json?.data?.user;
    const calendar = user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return { ok: false, reason: `GitHub user "${username}" not found.` };
    }

    const days: GitHubContributionDay[] = [];
    for (const week of calendar.weeks ?? []) {
      for (const day of week.contributionDays ?? []) {
        days.push({
          date: day.date,
          count: day.contributionCount || 0,
          level: mapGraphQLContributionLevel(day.contributionLevel),
        });
      }
    }

    return {
      ok: true,
      data: {
        totalContributions: calendar.totalContributions || 0,
        totalCommits: user.contributionsCollection.totalCommitContributions || 0,
        pullRequests: user.contributionsCollection.totalPullRequestContributions || 0,
        publicRepos: user.repositories?.totalCount,
        followers: user.followers?.totalCount,
        days,
      },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, reason: `Network error contacting GitHub GraphQL: ${msg}` };
  }
}

function readAttr(tag: string, name: string): string | undefined {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

/**
 * Parses the HTML of https://github.com/users/<username>/contributions — the same
 * public calendar shown on a GitHub profile. Exported for testing.
 */
export function parseContributionsHtml(html: string): CalendarResult | null {
  // Tooltip text per cell id: "3 contributions on May 4th." / "No contributions on …"
  const counts = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const text = m[2].trim();
    const num = text.match(/^([\d,]+)\s+contributions?/i);
    counts.set(m[1], num ? parseInt(num[1].replace(/,/g, ""), 10) : 0);
  }

  const days: GitHubContributionDay[] = [];
  for (const m of html.matchAll(/<td\b[^>]*>/g)) {
    const tag = m[0];
    if (!tag.includes("ContributionCalendar-day")) continue;
    const date = readAttr(tag, "data-date");
    if (!date) continue;
    const rawLevel = parseInt(readAttr(tag, "data-level") ?? "0", 10);
    const level = (rawLevel >= 0 && rawLevel <= 4 ? rawLevel : 0) as Level;
    const id = readAttr(tag, "id");
    const count = id && counts.has(id) ? counts.get(id)! : level;
    days.push({ date, count, level });
  }

  if (days.length === 0) return null;
  days.sort((a, b) => a.date.localeCompare(b.date));

  const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/i);
  const totalContributions = totalMatch
    ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
    : days.reduce((sum, d) => sum + d.count, 0);

  return { totalContributions, days };
}

/** Token-free fallback: the public contribution calendar HTML. */
async function fetchPublicCalendar(username: string): Promise<CalendarResult | null> {
  try {
    const res = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      console.warn(`[GitHub] Public contributions page returned HTTP ${res.status} for "${username}".`);
      return null;
    }
    return parseContributionsHtml(await res.text());
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[GitHub] Public contributions page fetch error: ${msg}`);
    return null;
  }
}

/**
 * Server-side client boundary for GitHub activity.
 *
 * 1. Authenticated GraphQL API (when GITHUB_ACCESS_TOKEN is set) — full stats incl. commits & PRs.
 * 2. If the token is missing or rejected, falls back to the public contribution calendar,
 *    so the heatmap keeps working without a valid token.
 * 3. Repo/follower counts always come from the unauthenticated REST API.
 *
 * Never logs the token itself.
 */
export async function fetchGitHubActivityServer(cmsUsername?: string | null): Promise<GitHubActivity> {
  // GITHUB_USERNAME env var overrides the username derived from the Sanity GitHub URL.
  const username = (process.env.GITHUB_USERNAME || cmsUsername || "").trim();
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

  const token = normalizeGitHubToken(process.env.GITHUB_ACCESS_TOKEN);
  console.log(`[GitHub API] Username: "${username}" | Token configured: ${token ? "YES" : "NO"}`);

  let failureReason = "GITHUB_ACCESS_TOKEN is not configured.";
  if (token) {
    const graphql = await fetchGraphQLCalendar(username, token);
    if (graphql.ok) {
      return {
        username,
        ...graphql.data,
        isAvailable: true,
        isCalendarAvailable: true,
      };
    }
    failureReason = graphql.reason;
    console.warn(`[GitHub API] ${failureReason} Falling back to the public contribution calendar.`);
  }

  const [calendar, profile] = await Promise.all([
    fetchPublicCalendar(username),
    fetchRESTProfile(username),
  ]);

  if (calendar) {
    return {
      username,
      ...calendar,
      publicRepos: profile.publicRepos,
      followers: profile.followers,
      isAvailable: true,
      isCalendarAvailable: true,
    };
  }

  return {
    username,
    totalContributions: 0,
    publicRepos: profile.publicRepos,
    followers: profile.followers,
    days: [],
    isAvailable: profile.publicRepos !== undefined,
    isCalendarAvailable: false,
    calendarUnavailableReason: failureReason,
  };
}

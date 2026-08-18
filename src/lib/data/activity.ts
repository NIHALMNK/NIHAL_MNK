import { fetchGitHubActivityServer } from "@/lib/github/client";
import { fetchLeetCodeActivityServer } from "@/lib/leetcode/client";
import { EngineeringActivityData, ProviderActivityData, ActivityHeatmapDay } from "@/types/activity";

export async function getEngineeringActivity(): Promise<EngineeringActivityData> {
  const [gh, lc] = await Promise.all([
    fetchGitHubActivityServer(),
    fetchLeetCodeActivityServer(),
  ]);

  const ghDaysMap: Record<string, ActivityHeatmapDay> = {};
  if (Array.isArray(gh.days)) {
    for (const d of gh.days) {
      if (d.date) {
        ghDaysMap[d.date] = {
          date: d.date,
          count: d.count,
          level: d.level,
        };
      }
    }
  }

  const githubProvider: ProviderActivityData = {
    provider: "github",
    username: gh.username,
    profileUrl: `https://github.com/${gh.username}`,
    summaryText: "Code contributions and open source activity on GitHub.",
    totalCountText:
      gh.isCalendarAvailable && gh.totalContributions > 0
        ? `${gh.totalContributions.toLocaleString()} contributions in the last year`
        : "GitHub activity graph",
    stats: [
      {
        label: "TOTAL CONTRIBUTIONS",
        value: gh.isCalendarAvailable && gh.totalContributions > 0 ? gh.totalContributions.toLocaleString() : "—",
      },
      {
        label: "PUBLIC REPOS",
        value: typeof gh.publicRepos === "number" ? gh.publicRepos.toString() : "—",
      },
      {
        label: "COMMITS & PRS",
        value:
          gh.isCalendarAvailable && ((gh.totalCommits || 0) + (gh.pullRequests || 0) > 0)
            ? `${(gh.totalCommits || 0) + (gh.pullRequests || 0)}+`
            : "—",
      },
      {
        label: "FOLLOWERS",
        value: typeof gh.followers === "number" ? gh.followers.toString() : "—",
      },
    ],
    daysMap: ghDaysMap,
    ctaText: "View Full History →",
    isAvailable: gh.isAvailable,
    isCalendarAvailable: gh.isCalendarAvailable,
    calendarUnavailableReason: gh.calendarUnavailableReason,
  };

  const lcDaysMap: Record<string, ActivityHeatmapDay> = {};
  if (Array.isArray(lc.days)) {
    for (const d of lc.days) {
      if (d.date) {
        lcDaysMap[d.date] = {
          date: d.date,
          count: d.count,
          level: d.level,
        };
      }
    }
  }

  const leetcodeProvider: ProviderActivityData = {
    provider: "leetcode",
    username: lc.username,
    profileUrl: `https://leetcode.com/u/${lc.username}`,
    summaryText: "Problem-solving & algorithm practice activity on LeetCode.",
    totalCountText:
      lc.isAvailable && lc.totalSolved > 0
        ? `${lc.totalSolved.toLocaleString()} problems solved on LeetCode`
        : "LeetCode submission graph",
    stats: [
      {
        label: "PROBLEMS SOLVED",
        value: lc.isAvailable && lc.totalSolved > 0 ? lc.totalSolved.toString() : "—",
      },
      {
        label: "EASY / MED / HARD",
        value: lc.isAvailable ? `${lc.stats.easy} / ${lc.stats.medium} / ${lc.stats.hard}` : "—",
      },
      {
        label: "ACTIVE DAYS",
        value: lc.isAvailable && lc.totalActiveDays > 0 ? `${lc.totalActiveDays} Days` : "—",
      },
      {
        label: "CURRENT STREAK",
        value: lc.isAvailable && lc.streak > 0 ? `${lc.streak} Days` : "—",
      },
    ],
    daysMap: lcDaysMap,
    ctaText: "View LeetCode Profile →",
    isAvailable: lc.isAvailable,
    isCalendarAvailable: lc.isCalendarAvailable,
    calendarUnavailableReason: lc.calendarUnavailableReason,
  };

  return {
    github: githubProvider,
    leetcode: leetcodeProvider,
  };
}

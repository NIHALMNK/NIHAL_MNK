import { LeetCodeActivity, LeetCodeSubmissionDay } from "@/types/leetcode";

function mapCountToLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

/**
 * Server-side client boundary for LeetCode GraphQL API.
 * Uses official LeetCode GraphQL endpoint with next: { revalidate: 3600 }.
 * Gracefully degrades with isAvailable: false if fetch fails or user is not found.
 */
export async function fetchLeetCodeActivityServer(): Promise<LeetCodeActivity> {
  const username = process.env.LEETCODE_USERNAME || "MohammedNihalk";

  console.log(`[LeetCode API Diagnostic] Username: "${username}"`);

  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
          reputation
        }
        userCalendar {
          activeYears
          streak
          totalActiveDays
          submissionCalendar
        }
      }
    }
  `;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 }, // Hourly server revalidation
    });

    if (!res.ok) {
      console.warn(`[LeetCode API] GraphQL request returned HTTP status ${res.status}.`);
      return {
        username,
        totalSolved: 0,
        stats: { all: 0, easy: 0, medium: 0, hard: 0 },
        streak: 0,
        totalActiveDays: 0,
        ranking: 0,
        days: [],
        isAvailable: false,
        isCalendarAvailable: false,
        calendarUnavailableReason: `LeetCode API returned HTTP status ${res.status}`,
      };
    }

    const json = await res.json();
    const matchedUser = json?.data?.matchedUser;

    if (!matchedUser) {
      console.warn(`[LeetCode API] User "${username}" not found or matchedUser absent.`);
      return {
        username,
        totalSolved: 0,
        stats: { all: 0, easy: 0, medium: 0, hard: 0 },
        streak: 0,
        totalActiveDays: 0,
        ranking: 0,
        days: [],
        isAvailable: false,
        isCalendarAvailable: false,
        calendarUnavailableReason: `User "${username}" not found on LeetCode.`,
      };
    }

    // Extract submission counts per difficulty
    const acSubmissions = matchedUser.submitStats?.acSubmissionNum || [];
    let totalSolved = 0;
    let easy = 0;
    let medium = 0;
    let hard = 0;

    for (const item of acSubmissions) {
      if (item.difficulty === "All") totalSolved = item.count || 0;
      if (item.difficulty === "Easy") easy = item.count || 0;
      if (item.difficulty === "Medium") medium = item.count || 0;
      if (item.difficulty === "Hard") hard = item.count || 0;
    }

    const streak = matchedUser.userCalendar?.streak || 0;
    const totalActiveDays = matchedUser.userCalendar?.totalActiveDays || 0;
    const ranking = matchedUser.profile?.ranking || 0;

    // Parse submission calendar JSON string: { "1768176000": 1, ... }
    const rawCalendarMap: Record<string, number> = {};
    const calendarStr = matchedUser.userCalendar?.submissionCalendar;

    if (calendarStr) {
      try {
        const parsed: Record<string, number> = JSON.parse(calendarStr);
        for (const [tsStr, count] of Object.entries(parsed)) {
          const ts = parseInt(tsStr, 10);
          if (!isNaN(ts)) {
            const dateStr = new Date(ts * 1000).toISOString().split("T")[0];
            rawCalendarMap[dateStr] = count || 0;
          }
        }
      } catch (err) {
        console.warn(`[LeetCode API] Submission calendar parse error:`, err);
      }
    }

    // Build raw submission days array
    const days: LeetCodeSubmissionDay[] = [];
    for (const [date, count] of Object.entries(rawCalendarMap)) {
      days.push({
        date,
        count,
        level: mapCountToLevel(count),
      });
    }

    return {
      username,
      totalSolved,
      stats: { all: totalSolved, easy, medium, hard },
      streak,
      totalActiveDays,
      ranking,
      days,
      isAvailable: true,
      isCalendarAvailable: true,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn(`[LeetCode API] Network error: ${errorMsg}`);
    return {
      username,
      totalSolved: 0,
      stats: { all: 0, easy: 0, medium: 0, hard: 0 },
      streak: 0,
      totalActiveDays: 0,
      ranking: 0,
      days: [],
      isAvailable: false,
      isCalendarAvailable: false,
      calendarUnavailableReason: `Network error: ${errorMsg}`,
    };
  }
}

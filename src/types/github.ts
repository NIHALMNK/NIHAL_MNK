export interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubActivity {
  username: string;
  totalContributions: number;
  totalCommits?: number;
  pullRequests?: number;
  publicRepos?: number;
  followers?: number;
  days: GitHubContributionDay[];
  isAvailable: boolean;
  isCalendarAvailable: boolean;
  calendarUnavailableReason?: string;
}

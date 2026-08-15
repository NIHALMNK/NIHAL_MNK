export interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubActivity {
  username: string;
  totalContributions: number;
  days: GitHubContributionDay[];
  isAvailable: boolean;
}

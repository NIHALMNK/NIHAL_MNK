export interface ActivityStatCard {
  label: string;
  value: string;
  subtext?: string;
}

export interface ActivityHeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ProviderActivityData {
  provider: "github" | "leetcode";
  username: string;
  profileUrl: string;
  summaryText: string;
  totalCountText: string;
  stats: ActivityStatCard[];
  daysMap: Record<string, ActivityHeatmapDay>;
  ctaText: string;
  isAvailable: boolean;
  isCalendarAvailable: boolean;
  calendarUnavailableReason?: string;
}

export interface EngineeringActivityData {
  github: ProviderActivityData;
  leetcode: ProviderActivityData;
}

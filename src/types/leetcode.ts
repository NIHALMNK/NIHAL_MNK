export interface LeetCodeSubmissionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface LeetCodeDifficultyStats {
  all: number;
  easy: number;
  medium: number;
  hard: number;
}

export interface LeetCodeActivity {
  username: string;
  totalSolved: number;
  stats: LeetCodeDifficultyStats;
  streak: number;
  totalActiveDays: number;
  ranking: number;
  days: LeetCodeSubmissionDay[];
  isAvailable: boolean;
  isCalendarAvailable: boolean;
  calendarUnavailableReason?: string;
}

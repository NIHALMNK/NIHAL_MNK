"use client";

import * as React from "react";
import { ActivityHeatmapDay } from "@/types/activity";
import { cn } from "@/lib/utils/cn";
import { AlertCircle } from "lucide-react";

interface CalendarYearHeatmapProps {
  daysMap: Record<string, ActivityHeatmapDay>;
  isCalendarAvailable: boolean;
  calendarUnavailableReason?: string;
  provider: "github" | "leetcode";
  summaryText: string;
  totalCountText: string;
  year?: number;
}

interface GridDayCell {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  isTargetYear: boolean;
}

interface MonthHeader {
  name: string;
  firstWeekIndex: number;
}

export function CalendarYearHeatmap({
  daysMap,
  isCalendarAvailable,
  calendarUnavailableReason,
  provider,
  summaryText,
  totalCountText,
  year = 2026,
}: CalendarYearHeatmapProps) {
  const [hoveredDay, setHoveredDay] = React.useState<{ date: string; count: number } | null>(null);

  // Build the complete Jan 1 -> Dec 31 calendar grid for the target year
  const { weeks, monthLabels } = React.useMemo(() => {
    const jan1 = new Date(Date.UTC(year, 0, 1));
    const dec31 = new Date(Date.UTC(year, 11, 31));

    // Sunday preceding or on Jan 1
    const startSunday = new Date(jan1);
    startSunday.setUTCDate(jan1.getUTCDate() - jan1.getUTCDay());

    // Saturday following or on Dec 31
    const endSaturday = new Date(dec31);
    endSaturday.setUTCDate(dec31.getUTCDate() + (6 - dec31.getUTCDay()));

    const totalDays = Math.round((endSaturday.getTime() - startSunday.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const totalWeeks = Math.ceil(totalDays / 7);

    const weeksList: GridDayCell[][] = [];
    const monthsList: MonthHeader[] = [];
    let registeredMonth = -1;

    for (let w = 0; w < totalWeeks; w++) {
      const weekDays: GridDayCell[] = [];
      for (let d = 0; d < 7; d++) {
        const dayDate = new Date(startSunday);
        dayDate.setUTCDate(startSunday.getUTCDate() + (w * 7 + d));

        const dateStr = dayDate.toISOString().split("T")[0];
        const isTargetYear = dayDate.getUTCFullYear() === year;
        const monthIndex = dayDate.getUTCMonth();

        // Register month label for the first week containing days of a new month in the target year
        if (isTargetYear && monthIndex !== registeredMonth) {
          const monthName = dayDate.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
          monthsList.push({
            name: monthName, // Standard 3-letter abbreviation: Jan, Feb, Mar...
            firstWeekIndex: w,
          });
          registeredMonth = monthIndex;
        }

        const realDay = daysMap[dateStr];
        weekDays.push({
          date: dateStr,
          count: realDay ? realDay.count : 0,
          level: realDay ? realDay.level : 0,
          isTargetYear,
        });
      }
      weeksList.push(weekDays);
    }

    return { weeks: weeksList, monthLabels: monthsList };
  }, [daysMap, year]);

  if (!isCalendarAvailable) {
    return (
      <div className="py-10 text-center space-y-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-muted-foreground">
          <AlertCircle className="h-5 w-5" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">
          {provider === "github" ? "GitHub" : "LeetCode"} Contribution Graph Unavailable
        </h3>
        <p className="text-xs text-muted-foreground font-mono max-w-md mx-auto">
          {calendarUnavailableReason ||
            (provider === "github"
              ? "Configure GITHUB_ACCESS_TOKEN in .env.local to load live GraphQL contribution heatmap."
              : "LeetCode live submission calendar could not be reached.")}
        </p>
      </div>
    );
  }

  const gridColumnCount = weeks.length;

  return (
    <div className="w-full">
      {/* Tooltip & Status Header */}
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3 h-5">
        <span className="truncate">
          {hoveredDay
            ? `${hoveredDay.count} ${provider === "github" ? "contributions" : "submissions"} on ${hoveredDay.date}`
            : summaryText}
        </span>
        <span className="text-[11px] text-muted-foreground/75 font-mono">
          {year} Calendar Year
        </span>
      </div>

      {/* Month Header Labels Row (Strict Jan -> Dec 3-Letter Abbreviations, Column Aligned) */}
      <div
        className="grid gap-[1px] sm:gap-[2px] text-[9px] sm:text-[11px] font-mono text-muted-foreground/75 mb-1.5 w-full"
        style={{ gridTemplateColumns: `repeat(${gridColumnCount}, minmax(0, 1fr))` }}
      >
        {monthLabels.map((m, idx) => (
          <span
            key={`${m.name}-${idx}`}
            style={{ gridColumnStart: m.firstWeekIndex + 1 }}
            className="inline-block whitespace-nowrap"
          >
            {m.name}
          </span>
        ))}
      </div>

      {/* Full-Year Heatmap Grid (NO HORIZONTAL SCROLLBAR, Responsive Auto-Scaling) */}
      <div
        className="grid gap-[1px] sm:gap-[2px] w-full"
        style={{ gridTemplateColumns: `repeat(${gridColumnCount}, minmax(0, 1fr))` }}
      >
        {weeks.map((week, wIdx) => (
          <div key={`week-${wIdx}`} className="flex flex-col gap-[1px] sm:gap-[2px] w-full">
            {week.map((day, dIdx) => (
              <div
                key={`${day.date}-${dIdx}`}
                onMouseEnter={() => day.isTargetYear && setHoveredDay({ date: day.date, count: day.count })}
                onMouseLeave={() => setHoveredDay(null)}
                className={cn(
                  "w-full aspect-square rounded-[1px] sm:rounded-[2px] transition-colors cursor-pointer",
                  !day.isTargetYear && "opacity-0 pointer-events-none",
                  day.isTargetYear && day.level === 0 && "bg-muted/40 border border-border/20 hover:bg-muted/80",
                  day.isTargetYear && day.level === 1 && "bg-emerald-950/70 dark:bg-emerald-900/60 border border-emerald-800/40 hover:bg-emerald-800",
                  day.isTargetYear && day.level === 2 && "bg-emerald-700/80 dark:bg-emerald-700/90 hover:bg-emerald-600",
                  day.isTargetYear && day.level === 3 && "bg-emerald-500 hover:bg-emerald-400",
                  day.isTargetYear && day.level === 4 && "bg-emerald-400 dark:bg-emerald-300 hover:bg-emerald-200"
                )}
                title={day.isTargetYear ? `${day.count} ${provider === "github" ? "contributions" : "submissions"} on ${day.date}` : undefined}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Footer Metadata & Intensity Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-border/30 text-xs font-mono text-muted-foreground">
        <span>{totalCountText}</span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span>Less</span>
          <span className="h-2.5 w-2.5 rounded-[2px] bg-muted/40 border border-border/20 inline-block" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-950/70 dark:bg-emerald-900/60 inline-block" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-700/80 inline-block" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-500 inline-block" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-400 dark:bg-emerald-300 inline-block" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

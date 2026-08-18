"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { EngineeringActivityData, ProviderActivityData } from "@/types/activity";
import { CalendarYearHeatmap } from "@/components/home/calendar-year-heatmap";
import { cn } from "@/lib/utils/cn";
import { ExternalLink } from "lucide-react";

interface EngineeringActivitySectionProps {
  data: EngineeringActivityData;
}

export function EngineeringActivitySection({ data }: EngineeringActivitySectionProps) {
  const [activeTab, setActiveTab] = React.useState<"github" | "leetcode">("github");
  const activeProvider: ProviderActivityData = data[activeTab];

  return (
    <section className="py-10 sm:py-14 md:py-16 border-b border-border/40 bg-background">
      <Container>
        {/* Section Header & Provider Segment Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Engineering <span className="text-muted-foreground font-normal">|</span> Activity
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-mono">
              Code contributions and problem-solving activity.
            </p>
          </div>

          {/* Provider Segmented Toggle Controls */}
          <div className="inline-flex items-center rounded-lg border border-border/60 bg-muted/30 p-1 shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("github")}
              className={cn(
                "px-3.5 py-1.5 text-xs font-mono font-medium rounded-md transition-all duration-150 select-none",
                activeTab === "github"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              GitHub
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("leetcode")}
              className={cn(
                "px-3.5 py-1.5 text-xs font-mono font-medium rounded-md transition-all duration-150 select-none",
                activeTab === "leetcode"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              LeetCode
            </button>
          </div>
        </div>

        {/* 4 Statistics Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {activeProvider.stats.map((stat, i) => (
            <div
              key={`${activeProvider.provider}-${stat.label}-${i}`}
              className="rounded-xl border border-border/50 bg-secondary/20 p-3.5 sm:p-4 text-left transition-colors hover:border-border/80"
            >
              <p className="text-[10px] sm:text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1 font-sans">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Shared Calendar-Year Heatmap Grid Container (NO HORIZONTAL SCROLLBAR) */}
        <div className="mt-4 rounded-xl border border-border/50 bg-secondary/15 p-4 sm:p-6 transition-all">
          <CalendarYearHeatmap
            daysMap={activeProvider.daysMap || {}}
            isCalendarAvailable={activeProvider.isCalendarAvailable}
            calendarUnavailableReason={activeProvider.calendarUnavailableReason}
            provider={activeProvider.provider}
            summaryText={activeProvider.summaryText}
            totalCountText={activeProvider.totalCountText}
            year={2026}
          />
        </div>

        {/* Bottom External Profile CTA */}
        <div className="mt-6 text-center">
          <a
            href={activeProvider.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-muted/20 px-4 py-2 text-xs font-medium text-foreground hover:bg-muted/50 hover:border-border transition-colors shadow-sm"
          >
            <span>{activeProvider.ctaText}</span>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
          </a>
        </div>
      </Container>
    </section>
  );
}

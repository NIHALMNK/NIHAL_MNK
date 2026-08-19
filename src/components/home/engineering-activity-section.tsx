"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { EngineeringActivityData, ProviderActivityData } from "@/types/activity";
import { CalendarYearHeatmap } from "@/components/home/calendar-year-heatmap";
import { cn } from "@/lib/utils/cn";
import { ExternalLink } from "lucide-react";
import { SectionCtaButton } from "@/components/ui/section-cta-button";
import { useStaggerReveal } from "@/lib/animation/hooks";

interface EngineeringActivitySectionProps {
  data: EngineeringActivityData;
}

export function EngineeringActivitySection({ data }: EngineeringActivitySectionProps) {
  const sectionRef = useStaggerReveal<HTMLElement>({
    itemSelector: "[data-animate-item]",
    y: 25,
    duration: 0.55,
    stagger: 0.08,
  });
  const [activeTab, setActiveTab] = React.useState<"github" | "leetcode">("github");
  const activeProvider: ProviderActivityData = data[activeTab];

  return (
    <section ref={sectionRef} className="py-10 sm:py-14 md:py-16 border-b border-border/40 bg-background">
      <Container>
        {/* Section Header & Provider Segment Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Engineering Activity
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-mono">
              Code contributions and problem-solving activity.
            </p>
          </div>

          {/* Provider Segmented Toggle Controls */}
          <div className="glass-surface inline-flex items-center rounded-lg p-1 shrink-0 self-start sm:self-auto">
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
              data-animate-item
              className="glass-card glass-highlight rounded-xl p-3.5 sm:p-4 text-left shadow-xs"
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
        <div data-animate-item className="glass-surface glass-highlight mt-4 rounded-xl p-4 sm:p-6 transition-all">
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
        <div className="mt-6 flex justify-center">
          <SectionCtaButton
            href={activeProvider.profileUrl}
            icon={ExternalLink}
            isExternal
          >
            {activeProvider.ctaText}
          </SectionCtaButton>
        </div>
      </Container>
    </section>
  );
}

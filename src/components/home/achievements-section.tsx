"use client";

import * as React from "react";
import Image from "next/image";
import { Award, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Achievement } from "@/types/achievement";
import { AchievementOverviewModal } from "@/components/home/achievement-overview-modal";
import { useStaggerReveal } from "@/lib/animation/hooks";
import { onGlassMouseMove } from "@/lib/utils/glass-glow";

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const sectionRef = useStaggerReveal<HTMLElement>({
    itemSelector: "[data-animate-item]",
    y: 30,
    duration: 0.6,
    stagger: 0.08,
  });
  const [selectedAchievement, setSelectedAchievement] = React.useState<Achievement | null>(null);
  const [visibleCount, setVisibleCount] = React.useState(6);
  const [failedLogos, setFailedLogos] = React.useState<Record<string, boolean>>({});

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const displayedAchievements = achievements.slice(0, visibleCount);
  const hasMore = achievements.length > visibleCount;

  return (
    <section ref={sectionRef} className="py-8 sm:py-10 md:py-12 border-b border-border/40">
      <Container>
        {/* Section Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
            Achievements
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm font-mono text-muted-foreground">
            Professional certifications and competitive programming wins.
          </p>
        </div>

        {/* 2-Column Grid of Certification Cards */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {displayedAchievements.map((item) => (
            <div
              key={item.id}
              data-animate-item
              onClick={() => setSelectedAchievement(item)}
              onMouseMove={onGlassMouseMove}
              className="glass-card glass-highlight group relative flex flex-col justify-between rounded-xl p-4 sm:p-5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none shadow-sm"
            >
              {/* Cursor-Following Glow */}
              <span className="glass-glow-effect" />

              <div>
                {/* Top Row: Logo + Title & Date */}
                <div className="flex items-start gap-3 sm:gap-3.5">
                  {/* Logo Container */}
                  <div className="glass-surface relative h-11 w-11 shrink-0 rounded-xl flex items-center justify-center overflow-hidden shadow-xs">
                    {item.logo && !failedLogos[item.id] ? (
                      <Image
                        src={item.logo.url}
                        alt={item.logo.alt || item.title}
                        width={44}
                        height={44}
                        onError={() => setFailedLogos((prev) => ({ ...prev, [item.id]: true }))}
                        className="w-full h-full object-contain p-1.5 rounded-xl"
                      />
                    ) : (
                      <Award className="h-5 w-5 text-amber-500" />
                    )}
                  </div>

                  {/* Title & Date */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h3>
                      {item.date && (
                        <span className="text-[11px] font-mono text-muted-foreground/75 shrink-0">
                          {item.date}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-muted-foreground line-clamp-2">
                      {item.shortDescription || item.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Badge Row */}
              <div className="mt-4 flex items-center justify-start pt-2">
                <span className="glass-pill inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
                  {item.issuer}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Achievements Progressive Reveal Button */}
        {hasMore && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleViewMore}
              className="glass-button inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-all select-none"
            >
              <span>View All Achievements</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </Container>

      {/* Achievement Overview Modal (Simplified without ID field) */}
      <AchievementOverviewModal
        achievement={selectedAchievement}
        isOpen={Boolean(selectedAchievement)}
        onClose={() => setSelectedAchievement(null)}
      />
    </section>
  );
}

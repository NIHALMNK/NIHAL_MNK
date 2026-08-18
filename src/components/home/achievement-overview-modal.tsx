"use client";

import * as React from "react";
import Image from "next/image";
import { X, Award, Calendar } from "lucide-react";
import { Achievement } from "@/types/achievement";

interface AchievementOverviewModalProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AchievementOverviewModal({
  achievement,
  isOpen,
  onClose,
}: AchievementOverviewModalProps) {
  const [logoError, setLogoError] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !achievement) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-border/60 bg-card p-5 sm:p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 rounded-lg p-1.5 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Top Header: Logo + Title + Issuer & Date */}
        <div className="flex items-start gap-3.5 pr-6">
          {/* Certificate Logo Container */}
          <div className="relative h-12 w-12 shrink-0 rounded-xl border border-border/60 bg-zinc-900/90 flex items-center justify-center overflow-hidden shadow-sm">
            {achievement.logo && !logoError ? (
              <Image
                src={achievement.logo.url}
                alt={achievement.logo.alt || achievement.title}
                width={48}
                height={48}
                onError={() => setLogoError(true)}
                className="w-full h-full object-contain p-2 rounded-xl"
              />
            ) : (
              <Award className="h-6 w-6 text-amber-500" />
            )}
          </div>

          {/* Title & Metadata */}
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground font-sans leading-snug">
              {achievement.title}
            </h3>

            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
                <span>{achievement.issuer}</span>
              </span>

              {achievement.date && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
                  <span>{achievement.date}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="border-b border-border/40 pt-1" />

        {/* Description Section */}
        <div className="space-y-1.5">
          <h4 className="text-[11px] font-mono font-semibold tracking-wider text-muted-foreground/80 uppercase">
            DESCRIPTION
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {achievement.description}
          </p>
        </div>

        {/* Skills Acquired Section */}
        {achievement.skills && achievement.skills.length > 0 && (
          <div className="space-y-2 pt-1">
            <h4 className="text-[11px] font-mono font-semibold tracking-wider text-muted-foreground/80 uppercase">
              SKILLS ACQUIRED
            </h4>
            <div className="flex flex-wrap gap-2">
              {achievement.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-md border border-border/50 bg-secondary/30 px-2.5 py-1 text-[11px] sm:text-xs font-mono text-muted-foreground select-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* NO Certificate ID field is rendered, eliminating bottom empty space! */}
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import Image from "next/image";
import { SiteSettings } from "@/types/site";
import { Technology } from "@/types/stack";
import { Container } from "@/components/ui/container";
import { TechIcon } from "@/components/ui/tech-icon";
import { useStaggerReveal } from "@/lib/animation/hooks";

interface AboutSectionProps {
  siteSettings: SiteSettings;
  allTechnologies: Technology[];
}

export function AboutSection({ siteSettings, allTechnologies }: AboutSectionProps) {
  const sectionRef = useStaggerReveal<HTMLElement>({
    itemSelector: "[data-animate-item]",
    y: 30,
    duration: 0.65,
    stagger: 0.15,
  });
  const [imageError, setImageError] = React.useState(false);

  // Profile image from data layer — never hardcoded local path
  const avatarUrl = siteSettings.profileImage || siteSettings.avatar?.url;
  const avatarAlt = siteSettings.avatar?.alt || `${siteSettings.name} Profile Photo`;

  return (
    <section ref={sectionRef} className="py-10 sm:py-14 md:py-16 border-b border-border/40 bg-background">
      <Container>
        {/* Section Label */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
          About Me
        </h2>

        {/* Two-column layout: Profile Image left + Content right */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
          {/* LEFT: Profile Image */}
          <div data-animate-item className="shrink-0">
            <div className="relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] rounded-2xl overflow-hidden border border-border/50 bg-muted/20 shadow-sm">
              {avatarUrl && !imageError ? (
                <Image
                  src={avatarUrl}
                  alt={avatarAlt}
                  fill
                  sizes="(max-width: 640px) 200px, 220px"
                  priority
                  onError={() => setImageError(true)}
                  className="object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted/30 text-muted-foreground font-mono font-bold text-4xl select-none">
                  {siteSettings.name ? siteSettings.name.charAt(0).toUpperCase() : "N"}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Bio + Tech Stack */}
          <div data-animate-item className="flex-1 min-w-0 space-y-5 sm:space-y-6">
            {/* Bio / Headline */}
            <div>
              <p className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                I&apos;m {siteSettings.name.split(" ")[1] || siteSettings.name}.
              </p>
              <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
                {siteSettings.bio || siteSettings.headline}
              </p>
            </div>

            {/* Tech Stack Icons Wall */}
            <div>
              {/* Label */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-[1px] w-8 bg-border/60" />
                <span className="text-[10px] font-mono font-semibold text-muted-foreground/80 uppercase tracking-[0.12em]">
                  Tech Stack
                </span>
              </div>

              {/* Icons Grid — ALL technologies, icons only, hover tooltip */}
              <div className="flex flex-wrap gap-2">
                {allTechnologies.map((tech) => (
                  <div key={tech.id} className="group relative">
                    {/* Icon Container */}
                    <div className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-border/50 bg-secondary/20 hover:border-border/80 hover:bg-secondary/40 transition-colors cursor-default">
                      <TechIcon technology={tech} className="h-5 w-5 sm:h-6 sm:w-6 object-contain" />
                    </div>

                    {/* Hover Tooltip: Technology Name Only */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap">
                      <div className="rounded-md bg-zinc-950/95 dark:bg-zinc-900 border border-white/10 px-2 py-1 text-[10px] font-mono font-medium text-white shadow-lg">
                        {tech.name}
                      </div>
                      {/* Tooltip Caret */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-zinc-950/95 dark:border-t-zinc-900" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

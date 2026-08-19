"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin, FileText, Send, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SiteSettings } from "@/types/site";
import { cn } from "@/lib/utils/cn";
import { getTechnologiesByIdsSync } from "@/lib/data/stack";
import { TechIcon } from "@/components/ui/tech-icon";
import { useHeroParallax } from "@/lib/animation/hooks";

interface IntroSectionProps {
  siteSettings: SiteSettings;
}

export function IntroSection({ siteSettings }: IntroSectionProps) {
  const heroRef = useHeroParallax<HTMLElement>();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleDoubleClick = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  // URL-driven profile image source from data layer
  const avatarUrl = siteSettings.profileImage || siteSettings.avatar?.url;
  const avatarAlt = siteSettings.avatar?.alt || siteSettings.name;

  // Authoritative technology stack resolved from central stack dataset via DAL
  const rawSkills = siteSettings.featuredSkills || [];
  const resolvedTechnologies = getTechnologiesByIdsSync(rawSkills);

  const maxVisible = 10;
  const visibleTechnologies = resolvedTechnologies.slice(0, maxVisible);
  const remainingCount = Math.max(resolvedTechnologies.length - maxVisible, 0);

  const resumeHref = siteSettings.resumeUrl || "/resume.pdf";

  return (
    <section ref={heroRef} className="py-8 sm:py-10 md:py-12 border-b border-border/40">
      <Container>
        {/* Top Header Row: Avatar + Easter Egg Hint & Location Badge */}
        <div data-hero-avatar className="flex items-start justify-between gap-4">
          {/* Avatar Container with Green Status Dot */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              onDoubleClick={handleDoubleClick}
              className={cn(
                "relative shrink-0 rounded-2xl overflow-hidden border border-border/50 bg-amber-200 dark:bg-amber-300/90 shadow-sm transition-transform cursor-pointer select-none",
                "w-[68px] h-[68px] sm:w-[76px] sm:h-[76px]",
                isPlaying && "animate-bounce"
              )}
              title="Double click to play"
            >
              {avatarUrl && !imageError ? (
                <Image
                  src={avatarUrl}
                  alt={avatarAlt}
                  width={512}
                  height={512}
                  priority
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-amber-500/20 text-amber-600 dark:text-amber-300 font-mono font-bold text-xl rounded-2xl select-none">
                  {siteSettings.name ? siteSettings.name.charAt(0) : "N"}
                </div>
              )}
              {/* Online Green Status Dot */}
              <span
                aria-label="Online status"
                className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 border-background bg-emerald-500 shadow-sm"
              />
            </div>

            {/* dbl-click hint */}
            <span className="text-[11px] font-mono text-muted-foreground/75 select-none hidden sm:inline-flex items-center gap-1">
              ← dbl-click for more
            </span>
          </div>

          {/* Location Badge */}
          <div className="glass-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono text-muted-foreground shrink-0 mt-1">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span>{siteSettings.location}</span>
          </div>
        </div>

        {/* Title & Roles Subtitle */}
        <div data-hero-content className="mt-5 sm:mt-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
            {siteSettings.name}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm font-mono text-muted-foreground tracking-tight">
            {siteSettings.role}
          </p>
        </div>

        {/* Bio Paragraph */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-[15px] leading-relaxed text-muted-foreground max-w-2xl">
          I build complete web and AI experiences from{" "}
          <strong className="font-semibold text-foreground">zero to one</strong>.
          Focused on the entire lifecycle from{" "}
          <strong className="font-semibold text-foreground">design to deployment</strong>
          , I prioritize{" "}
          <strong className="font-semibold text-foreground">shipping products</strong>{" "}
          that users love over getting lost in technical details.
        </p>

        {/* Tech Stack Chips (Max 10 visible + N counter pill + subtle hover tooltips) */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2">
          {visibleTechnologies.map((tech) => (
            <div key={tech.id} className="group relative inline-flex">
              <span className="glass-pill inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] sm:text-xs font-mono text-muted-foreground hover:text-foreground transition-colors select-none cursor-pointer">
                <TechIcon technology={tech} className="h-3.5 w-3.5 shrink-0" />
                <span>{tech.name}</span>
              </span>

              {/* Subtle Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-20 pointer-events-none whitespace-nowrap">
                <div className="glass-modal rounded px-2 py-0.5 text-[10px] font-mono text-foreground shadow-md">
                  {tech.name}
                </div>
              </div>
            </div>
          ))}

          {/* Remaining Technologies Counter Pill (+N) */}
          {remainingCount > 0 && (
            <div className="group relative inline-flex">
              <span className="glass-pill inline-flex items-center rounded-md px-2.5 py-1 text-[11px] sm:text-xs font-mono font-medium text-muted-foreground/80 hover:text-foreground transition-colors select-none cursor-pointer">
                +{remainingCount}
              </span>

              {/* Tooltip for Counter Pill */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-20 pointer-events-none whitespace-nowrap">
                <div className="glass-modal rounded px-2 py-0.5 text-[10px] font-mono text-foreground shadow-md">
                  +{remainingCount} more technologies
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons & Social Links */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
          {/* Resume Button */}
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            download="Mohammed_Nihal_MERN-Stack_Developer_Resume.pdf"
            className="glass-button inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium text-foreground transition-all shadow-xs select-none"
          >
            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Resume</span>
          </a>

          {/* Get in touch Button */}
          <a
            href={`mailto:${siteSettings.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 transition-opacity shadow-sm"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Get in touch</span>
          </a>

          {/* Vertical Separator Divider */}
          <div className="hidden sm:block h-5 w-[1px] bg-border/60 mx-1" />

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a
              href={siteSettings.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="glass-button inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-all shadow-xs"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href={siteSettings.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="glass-button inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-all shadow-xs"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            {siteSettings.socials.instagram && (
              <a
                href={siteSettings.socials.instagram || "https://instagram.com/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="glass-button inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-all shadow-xs"
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}

            <a
              href={`mailto:${siteSettings.email}`}
              aria-label="Email"
              className="glass-button inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-all shadow-xs"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

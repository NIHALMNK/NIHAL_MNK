"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin, FileText, Send, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SiteSettings } from "@/types/site";
import { cn } from "@/lib/utils/cn";

interface IntroSectionProps {
  siteSettings: SiteSettings;
}

export function IntroSection({ siteSettings }: IntroSectionProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleDoubleClick = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  const skillsList = siteSettings.featuredSkills ?? [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "GitHub",
    "Tailwind CSS",
    "Redux",
  ];

  const resumeHref = siteSettings.resumeUrl || "/resume.pdf";

  return (
    <section className="py-8 sm:py-10 md:py-12 border-b border-border/40">
      <Container>
        {/* Top Header Row: Avatar + Easter Egg Hint & Location Badge */}
        <div className="flex items-start justify-between gap-4">
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
              <Image
                src={siteSettings.avatar.url}
                alt={siteSettings.avatar.alt}
                width={76}
                height={76}
                priority
                className="w-full h-full object-cover rounded-2xl"
              />
              {/* Online Green Status Dot */}
              <span
                aria-label="Online status"
                className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 border-background bg-emerald-500 shadow-sm"
              />
            </div>

            {/* dbl-click to play hint */}
            <span className="text-[11px] font-mono text-muted-foreground/75 select-none hidden sm:inline-flex items-center gap-1">
              ← dbl-click to play
            </span>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-[11px] font-mono text-muted-foreground shrink-0 mt-1">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span>{siteSettings.location}</span>
          </div>
        </div>

        {/* Title & Roles Subtitle */}
        <div className="mt-5 sm:mt-6">
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

        {/* Tech Stack Chips */}
        <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
          {skillsList.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-md border border-border/50 bg-secondary/30 px-2.5 py-1 text-[11px] sm:text-xs font-mono text-muted-foreground hover:border-border/80 hover:text-foreground transition-colors select-none"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Action Buttons & Social Links */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
          {/* Resume Button */}
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            download="Mohammed_Nihal_MERN-Stack_Developer_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-muted/20 px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted/50 hover:border-border transition-colors"
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
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-border transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href={siteSettings.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-border transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            {siteSettings.socials.twitter && (
              <a
                href={siteSettings.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-border transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}

            <a
              href={`mailto:${siteSettings.email}`}
              aria-label="Email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-border transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

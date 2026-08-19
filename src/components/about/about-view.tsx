"use client";

import * as React from "react";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  Instagram,
  FileText,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { AboutData } from "@/types/about";
import { Technology } from "@/types/stack";
import { Container } from "@/components/ui/container";
import { TechIcon } from "@/components/ui/tech-icon";
import { useStaggerReveal } from "@/lib/animation/hooks";
import { onGlassMouseMove } from "@/lib/utils/glass-glow";

interface AboutViewProps {
  data: AboutData;
  allTechnologies: Technology[];
}

export function AboutView({ data, allTechnologies }: AboutViewProps) {
  const pageRef = useStaggerReveal<HTMLElement>({
    itemSelector: "[data-animate-item]",
    y: 24,
    duration: 0.55,
    stagger: 0.07,
  });

  const { profile, summary, education, experience } = data;
  const [imageError, setImageError] = React.useState(false);

  // Derive the four technical skill groups dynamically from authoritative stack data
  const designTools = allTechnologies.filter((tech) =>
    ["figma", "adobe-xd"].includes(tech.slug)
  );
  const editingTools = allTechnologies.filter((tech) =>
    ["vscode", "antigravity", "cursor", "kiro"].includes(tech.slug)
  );
  const languages = allTechnologies.filter((tech) =>
    ["javascript", "typescript", "sql"].includes(tech.slug)
  );
  const aiTools = allTechnologies.filter((tech) =>
    ["chatgpt", "gemini", "claude"].includes(tech.slug)
  );

  const skillCategories = [
    {
      id: "cat-design-tools",
      category: "Design Tools",
      description: "UI/UX wireframing, component design systems, and rapid prototyping.",
      skills: designTools,
    },
    {
      id: "cat-editing-tools",
      category: "Editing / Development Tools",
      description: "Integrated development environments, AI-augmented editors, and coding toolchains.",
      skills: editingTools,
    },
    {
      id: "cat-languages",
      category: "Languages",
      description: "Core programming and database query languages used across production stacks.",
      skills: languages,
    },
    {
      id: "cat-ai-tools",
      category: "AI Tools",
      description: "Generative intelligence platforms and developer assistant workflows.",
      skills: aiTools,
    },
  ].filter((cat) => cat.skills.length > 0);

  return (
    <main ref={pageRef} className="flex-1 py-8 sm:py-12 md:py-16">
      <Container className="space-y-8 sm:space-y-10 max-w-5xl">
        {/* Page Header */}
        <div data-animate-item className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
            <span>Developer Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-sans">
            About Me
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-mono max-w-2xl">
            Full-stack engineering background, systems architecture, core competencies, and professional journey.
          </p>
        </div>

        {/* 2-Column Grid: Profile Card (Left) + Professional Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Profile Card (Left 5 Columns on Desktop) */}
          <div
            data-animate-item
            onMouseMove={onGlassMouseMove}
            className="lg:col-span-5 glass-card glass-highlight rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-sm"
          >
            <span className="glass-glow-effect" />

            <div className="space-y-5">
              {/* Profile Avatar Frame */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden glass-surface border border-border/60 shadow-md">
                {profile.avatarUrl && !imageError ? (
                  <Image
                    src={profile.avatarUrl}
                    alt={profile.name}
                    fill
                    sizes="(max-width: 640px) 112px, 128px"
                    priority
                    onError={() => setImageError(true)}
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted/40 font-mono font-bold text-3xl text-muted-foreground">
                    {profile.name.charAt(0)}
                  </div>
                )}
                {/* Available for Hire Status Indicator */}
                {profile.availableForHire && (
                  <span
                    aria-label="Available for hire"
                    className="absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500 shadow-sm"
                    title="Available for opportunities"
                  />
                )}
              </div>

              {/* Identity & Role */}
              <div className="space-y-1.5">
                <h2 className="text-2xl font-bold text-foreground font-sans tracking-tight">
                  {profile.name}
                </h2>
                <p className="text-xs sm:text-sm font-mono text-muted-foreground leading-relaxed">
                  {profile.role}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground/80 pt-1">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Actions & Social Links */}
            <div className="space-y-4 pt-4 border-t border-border/40">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Mohammed_Nihal_MERN-Stack_Developer_Resume.pdf"
                  className="glass-button flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-xs font-mono font-medium text-foreground transition-all shadow-xs"
                >
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Resume</span>
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-3.5 py-2 text-xs font-mono font-semibold hover:opacity-90 transition-opacity shadow-xs"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Contact</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-2">
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="glass-button inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-all shadow-xs"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="glass-button inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-all shadow-xs"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                {profile.socials.instagram && (
                  <a
                    href={profile.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="glass-button inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-all shadow-xs"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Professional Summary Card (Right 7 Columns on Desktop) */}
          <div
            data-animate-item
            onMouseMove={onGlassMouseMove}
            className="lg:col-span-7 glass-card glass-highlight rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-sm"
          >
            <span className="glass-glow-effect" />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                <h2 className="text-lg sm:text-xl font-bold text-foreground font-sans tracking-tight">
                  {summary.title}
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {summary.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border/40">
              {summary.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="glass-surface rounded-xl p-3 text-left space-y-1 shadow-xs"
                >
                  <p className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-wider">
                    {highlight.label}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-foreground font-sans">
                    {highlight.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div
          data-animate-item
          onMouseMove={onGlassMouseMove}
          className="glass-card glass-highlight rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
        >
          <span className="glass-glow-effect" />

          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground font-sans tracking-tight">
              Education & Background
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {education.map((item) => (
              <div
                key={item.id}
                className="glass-surface rounded-xl p-5 space-y-3 text-left flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-foreground font-sans leading-snug">
                        {item.degree}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-muted-foreground mt-0.5">
                        {item.institution}
                      </p>
                    </div>
                    <span className="glass-pill shrink-0 inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-mono text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{item.period}</span>
                    </span>
                  </div>

                  {item.field && (
                    <p className="text-xs font-mono text-foreground/80 font-medium">
                      Focus: {item.field}
                    </p>
                  )}

                  {item.description && (
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground pt-1">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.location && (
                  <div className="pt-2 text-[11px] font-mono text-muted-foreground/75 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Section (Dynamic, Filtered from authoritative Stack Data) */}
        <div className="space-y-4">
          <div data-animate-item className="space-y-1">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-xl sm:text-2xl font-bold text-foreground font-sans tracking-tight">
                Technical Skills & Tools
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-muted-foreground">
              Design tools, editing environments, programming languages, and AI systems derived from Stack data.
            </p>
          </div>

          {/* Dynamic Category Cards Grid (2-column layout on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skillCategories.map((category) => (
              <div
                key={category.id}
                data-animate-item
                onMouseMove={onGlassMouseMove}
                className="glass-card glass-highlight rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm"
              >
                <span className="glass-glow-effect" />

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-foreground font-sans">
                    {category.category}
                  </h3>
                  {category.description && (
                    <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Skills Badges with Icons directly from Stack */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="glass-pill inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono text-foreground select-none"
                    >
                      <TechIcon technology={skill} className="h-4 w-4 shrink-0" />
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div
          data-animate-item
          onMouseMove={onGlassMouseMove}
          className="glass-card glass-highlight rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
        >
          <span className="glass-glow-effect" />

          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground font-sans tracking-tight">
              Professional Experience
            </h2>
          </div>

          <div className="space-y-6">
            {experience.map((item) => (
              <div key={item.id} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground font-sans">
                      {item.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-muted-foreground">
                      {item.company} • {item.location}
                    </p>
                  </div>
                  <span className="glass-pill self-start sm:self-auto inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-mono text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{item.period}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {item.responsibilities && item.responsibilities.length > 0 && (
                  <ul className="space-y-2 pt-1">
                    {item.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {item.technologies && item.technologies.length > 0 && (
                  <div className="pt-3 border-t border-border/30 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mr-1">
                      Stack:
                    </span>
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="glass-pill inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}

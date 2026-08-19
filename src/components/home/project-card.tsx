"use client";

import * as React from "react";
import { ResolvedProject } from "@/types/project";
import { ProjectVideoPreview } from "@/components/home/project-video-preview";
import { TechIcon } from "@/components/ui/tech-icon";
import { ExternalLink, Github } from "lucide-react";
import { onGlassMouseMove } from "@/lib/utils/glass-glow";

interface ProjectCardProps {
  project: ResolvedProject;
  onSelect: (project: ResolvedProject) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const visibleTechCount = 4;
  const techPills = (project.technologies || []).slice(0, visibleTechCount);
  const extraTechCount = (project.technologies || []).length - visibleTechCount;

  const isLiveValid = Boolean(project.liveUrl && !project.liveUrl.includes("example.com"));
  const isGithubValid = Boolean(project.githubUrl && !project.githubUrl.includes("example.com"));

  return (
    <div
      onClick={() => onSelect(project)}
      onMouseMove={onGlassMouseMove}
      className="glass-card glass-highlight group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.005] hover:shadow-xl cursor-pointer"
    >
      {/* Cursor-Following Glass Glow Layer */}
      <span className="glass-glow-effect" />

      {/* Top Media Area with Continuous Autoplay Video Preview & Status Overlay */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-border/40 bg-black">
        <ProjectVideoPreview
          videoUrl={project.videoUrl}
          posterUrl={project.coverImage?.url}
          altText={project.coverImage?.alt || project.title}
        />

        {/* Operational Status Indicator Overlay (Bottom Left of Card Video) */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <div className="glass-surface inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium text-emerald-400 backdrop-blur-md shadow-sm border-emerald-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{project.status || "Operational"}</span>
          </div>
        </div>
      </div>

      {/* Card Body Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          {/* Title & Short Description */}
          <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Stack Pills Row with Resolved Technology Entities */}
        <div className="pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {techPills.map((tech) => (
              <span
                key={tech.id}
                className="glass-pill inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-mono text-muted-foreground font-medium"
              >
                <TechIcon technology={tech} className="h-3 w-3 shrink-0" />
                <span>{tech.name}</span>
              </span>
            ))}
            {extraTechCount > 0 && (
              <span className="glass-pill inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-mono text-muted-foreground/80 font-medium">
                +{extraTechCount}
              </span>
            )}
          </div>
        </div>

        {/* Two Equal-Width Action Buttons Footer */}
        <div className="pt-3 border-t border-border/30 grid grid-cols-2 gap-2.5" onClick={(e) => e.stopPropagation()}>
          {isLiveValid ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-foreground text-background py-2 text-xs font-semibold hover:bg-foreground/90 transition-colors shadow-sm"
            >
              <span>Live Demo</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="glass-pill inline-flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold cursor-not-allowed opacity-60 text-muted-foreground"
              title="Live Demo link currently unavailable"
            >
              <span>Live Demo</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          )}

          {isGithubValid ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button inline-flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-foreground transition-all shadow-xs"
            >
              <Github className="h-3 w-3" />
              <span>Code</span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="glass-pill inline-flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-muted-foreground cursor-not-allowed opacity-60"
              title="GitHub repository link currently unavailable"
            >
              <Github className="h-3 w-3" />
              <span>Code</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

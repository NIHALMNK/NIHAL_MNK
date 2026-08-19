"use client";

import * as React from "react";
import { ResolvedProject } from "@/types/project";
import { ProjectVideoPreview } from "@/components/home/project-video-preview";
import { TechIcon } from "@/components/ui/tech-icon";
import { X, ExternalLink, Github, CheckCircle2 } from "lucide-react";

interface ProjectOverviewModalProps {
  project: ResolvedProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectOverviewModal({ project, isOpen, onClose }: ProjectOverviewModalProps) {
  const [playbackRate, setPlaybackRate] = React.useState<number>(1);

  // Lock body scroll when modal is open & add Escape key listener
  React.useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset playback speed to 1x whenever a new project opens
  React.useEffect(() => {
    if (isOpen) {
      setPlaybackRate(1);
    }
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const isLiveValid = Boolean(project.liveUrl && !project.liveUrl.includes("example.com"));
  const isGithubValid = Boolean(project.githubUrl && !project.githubUrl.includes("example.com"));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto no-scrollbar animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Modal Dialog Card Frame - Compact Visual Scale (max-w-xl) */}
      <div
        className="glass-modal glass-highlight relative w-full max-w-xl rounded-2xl text-foreground shadow-2xl overflow-hidden my-auto transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="glass-surface absolute top-2.5 right-2.5 z-20 flex h-7 w-7 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted/60"
          aria-label="Close dialog"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Top Media Area with Operational Status Badge & 2X Preview Control Overlays */}
        <div className="relative aspect-video w-full border-b border-border/40 bg-black">
          <ProjectVideoPreview
            videoUrl={project.videoUrl}
            posterUrl={project.coverImage?.url}
            altText={project.coverImage?.alt || project.title}
            playbackRate={playbackRate}
          />

          {/* Operational Status Badge Overlay (Bottom Left of Video) */}
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-black/65 px-2.5 py-0.5 text-[11px] font-mono font-medium text-emerald-400 backdrop-blur-md shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{project.status || "Operational"}</span>
            </div>
          </div>

          {/* 2X PREVIEW Speed Control Overlay (Bottom Right of Video) */}
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <button
              type="button"
              onClick={() => setPlaybackRate((prev) => (prev === 1 ? 2 : 1))}
              className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-black/70 px-2 py-0.5 text-[10px] font-mono font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/90 shadow-sm"
              title="Toggle preview video playback speed (1x / 2x)"
            >
              <span>{playbackRate === 2 ? "⚡ 2X SPEED" : "2X PREVIEW"}</span>
            </button>
          </div>
        </div>

        {/* Modal Main Content Container with Completely Hidden Scrollbar */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[70vh] sm:max-h-[75vh] overflow-y-auto no-scrollbar">
          {/* Title Header & Short Description */}
          <div>
            <h2 id="modal-project-title" className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {project.title}
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Detailed About Section */}
          <div className="space-y-1.5">
            <h3 className="text-[11px] font-mono uppercase tracking-wider font-semibold text-muted-foreground">
              About Project
            </h3>
            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Key Features List (2-column desktop, 1-column mobile) */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-2 pt-1 border-t border-border/30">
              <h3 className="text-[11px] font-mono uppercase tracking-wider font-semibold text-muted-foreground">
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-foreground/90 font-sans">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Chips List with Resolved Technology Entities */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="space-y-1.5 pt-1 border-t border-border/30">
              <h3 className="text-[11px] font-mono uppercase tracking-wider font-semibold text-muted-foreground">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech.id}
                    className="glass-pill inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-mono font-medium text-foreground/90"
                  >
                    <TechIcon technology={tech} className="h-3.5 w-3.5 shrink-0" />
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Modal Bottom Action Buttons Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-3 border-t border-border/40">
            {isLiveValid ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-foreground text-background px-4 py-2 text-xs font-semibold hover:bg-foreground/90 transition-colors shadow-sm"
              >
                <span>Visit Website</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="glass-pill flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold cursor-not-allowed opacity-60 text-muted-foreground"
                title="Live URL currently unavailable"
              >
                <span>Visit Website (Unavailable)</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            )}

            {isGithubValid ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button shrink-0 inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium text-foreground transition-all shadow-xs"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub Repository</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="glass-pill shrink-0 inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium text-muted-foreground cursor-not-allowed opacity-60"
                title="GitHub URL currently unavailable"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub (Unavailable)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ResolvedProject } from "@/types/project";
import { ProjectCard } from "@/components/home/project-card";
import { ProjectOverviewModal } from "@/components/home/project-overview-modal";
import { ArrowRight } from "lucide-react";

interface ProofOfWorkSectionProps {
  projects: ResolvedProject[];
}

export function ProofOfWorkSection({ projects }: ProofOfWorkSectionProps) {
  const [selectedProject, setSelectedProject] = React.useState<ResolvedProject | null>(null);

  return (
    <section className="py-10 sm:py-14 md:py-16 border-b border-border/40 bg-background">
      <Container>
        {/* Section Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Proof of Work
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-mono">
            Selected projects that showcase my technical depth.
          </p>
        </div>

        {/* 2-Column Desktop / 1-Column Mobile Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Bottom CTA to View All Projects */}
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-muted/20 px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/50 hover:border-border transition-colors shadow-sm"
          >
            <span>Show all Projects</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>

      {/* Project Overview Top-Layer Overlay Modal */}
      <ProjectOverviewModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

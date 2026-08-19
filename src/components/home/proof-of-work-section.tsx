"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { ResolvedProject } from "@/types/project";
import { ProjectCard } from "@/components/home/project-card";
import { ProjectOverviewModal } from "@/components/home/project-overview-modal";
import { ArrowRight } from "lucide-react";
import { SectionCtaButton } from "@/components/ui/section-cta-button";
import { useStaggerReveal } from "@/lib/animation/hooks";

interface ProofOfWorkSectionProps {
  projects: ResolvedProject[];
}

export function ProofOfWorkSection({ projects }: ProofOfWorkSectionProps) {
  const sectionRef = useStaggerReveal<HTMLElement>({
    itemSelector: "[data-animate-item]",
    y: 35,
    scale: 0.97,
    duration: 0.65,
    stagger: 0.12,
  });
  const [selectedProject, setSelectedProject] = React.useState<ResolvedProject | null>(null);

  return (
    <section ref={sectionRef} className="py-10 sm:py-14 md:py-16 border-b border-border/40 bg-background">
      <Container>
        {/* Section Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Selected Work
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-mono">
            Selected projects that showcase my technical depth.
          </p>
        </div>

        {/* 2-Column Desktop / 1-Column Mobile Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {projects.map((project) => (
            <div key={project.id} data-animate-item className="h-full">
              <ProjectCard
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA to View All Projects */}
        <div className="mt-10 flex justify-center">
          <SectionCtaButton href="/projects" icon={ArrowRight}>
            Show all Projects
          </SectionCtaButton>
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

"use client";

import * as React from "react";
import { Search, X, Loader2 } from "lucide-react";
import { ResolvedProject } from "@/types/project";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/home/project-card";
import { ProjectOverviewModal } from "@/components/home/project-overview-modal";
import { useStaggerReveal } from "@/lib/animation/hooks";

interface ProjectsArchiveViewProps {
  initialProjects: ResolvedProject[];
}

const PAGE_SIZE = 6;

export function ProjectsArchiveView({ initialProjects }: ProjectsArchiveViewProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<ResolvedProject | null>(null);

  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  const headerRef = useStaggerReveal<HTMLDivElement>({
    itemSelector: "[data-animate-item]",
    y: 20,
    duration: 0.5,
    stagger: 0.08,
  });

  // Client-side technology-aware & title-aware filtering
  const filteredProjects = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return initialProjects;

    return initialProjects.filter((project) => {
      // 1. Match project title
      if (project.title.toLowerCase().includes(q)) return true;

      // 2. Match project description & short description
      if (project.shortDescription?.toLowerCase().includes(q)) return true;
      if (project.description?.toLowerCase().includes(q)) return true;

      // 3. Match referenced technologies from Stack single source of truth
      const hasMatchingTech = project.technologies?.some((tech) => {
        const nameMatch = tech.name.toLowerCase().includes(q);
        const slugMatch = tech.slug.toLowerCase().includes(q);
        const categoryMatch = tech.category?.toLowerCase().includes(q);
        return nameMatch || slugMatch || categoryMatch;
      });
      if (hasMatchingTech) return true;

      // 4. Match features if any
      const hasMatchingFeature = project.features?.some((f) =>
        f.toLowerCase().includes(q)
      );
      if (hasMatchingFeature) return true;

      return false;
    });
  }, [initialProjects, searchQuery]);

  // Reset pagination count when query changes
  React.useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery]);

  // Progressive loading with IntersectionObserver
  React.useEffect(() => {
    const hasMore = visibleCount < filteredProjects.length;
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first && first.isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          // Subtle delay to provide visual feedback and prevent layout thrashing
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredProjects.length));
            setIsLoadingMore(false);
          }, 250);
        }
      },
      { threshold: 0.1, rootMargin: "150px" }
    );

    const target = sentinelRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [filteredProjects.length, visibleCount, isLoadingMore]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < filteredProjects.length;

  return (
    <main className="flex-1 py-8 sm:py-12 md:py-16">
      <Container className="space-y-8 sm:space-y-10 max-w-5xl">
        {/* Page Header */}
        <div ref={headerRef} className="space-y-3">
          <h1 data-animate-item className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-sans">
            Projects
          </h1>
          <p data-animate-item className="text-sm sm:text-base text-muted-foreground font-mono max-w-2xl leading-relaxed">
            A selection of things I&apos;ve built, ranging from AI tools and full-stack apps to UI experiments.
          </p>

          {/* Search / Technology Filter Input */}
          <div data-animate-item className="pt-3 max-w-md">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by project or tech..."
                aria-label="Search projects by title or technology"
                className="w-full h-11 pl-10 pr-10 rounded-xl glass-card text-xs sm:text-sm font-mono text-foreground placeholder:text-muted-foreground/60 border border-border/60 focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search input"
                  className="absolute right-3 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Projects 2-Column Responsive Grid */}
        {displayedProjects.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {displayedProjects.map((project) => (
                <div key={project.id} className="animate-in fade-in-50 duration-300">
                  <ProjectCard project={project} onSelect={setSelectedProject} />
                </div>
              ))}
            </div>

            {/* Infinite Scroll Sentinel */}
            {hasMoreProjects && (
              <div ref={sentinelRef} className="py-6 flex items-center justify-center">
                {isLoadingMore && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-surface border border-border/40 text-xs font-mono text-muted-foreground animate-in fade-in">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Loading more projects...</span>
                  </div>
                )}
              </div>
            )}

            {/* Subtle End of Collection Note */}
            {!hasMoreProjects && filteredProjects.length > PAGE_SIZE && (
              <div className="py-6 text-center">
                <p className="text-xs font-mono text-muted-foreground/60">
                  You&apos;ve reached the end of the archive ({filteredProjects.length} projects).
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-16 text-center space-y-3 glass-card rounded-2xl p-8 border border-border/40 max-w-lg mx-auto">
            <p className="text-base font-bold text-foreground font-sans">
              No projects found
            </p>
            <p className="text-xs font-mono text-muted-foreground">
              No projects matching &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;React&rdquo;, &ldquo;Node.js&rdquo;, or &ldquo;WebRTC&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="glass-button inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-mono font-medium text-foreground transition-all shadow-xs mt-2"
            >
              Clear search query
            </button>
          </div>
        )}

        {/* Global Interactive Project Overview Modal */}
        <ProjectOverviewModal
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      </Container>
    </main>
  );
}

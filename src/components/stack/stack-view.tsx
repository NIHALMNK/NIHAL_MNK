"use client";

import * as React from "react";
import { Technology } from "@/types/stack";
import { TechIcon } from "@/components/ui/tech-icon";
import { Container } from "@/components/ui/container";
import { useStaggerReveal } from "@/lib/animation/hooks";
import { onGlassMouseMove } from "@/lib/utils/glass-glow";
import { Search, X, ExternalLink, Sparkles } from "lucide-react";

interface StackViewProps {
  technologies: Technology[];
}

export function StackView({ technologies }: StackViewProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [activeTooltipId, setActiveTooltipId] = React.useState<string | null>(null);

  const containerRef = useStaggerReveal<HTMLDivElement>({
    itemSelector: "[data-animate-item]",
    y: 20,
    duration: 0.5,
    stagger: 0.05,
  });

  // Extract unique categories dynamically from the data
  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    technologies.forEach((tech) => {
      if (tech.category) {
        cats.add(tech.category);
      }
    });
    return ["All", ...Array.from(cats)];
  }, [technologies]);

  // Filter technologies based on search query and selected category
  const filteredTechnologies = React.useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return technologies.filter((tech) => {
      // Category filter match
      if (selectedCategory !== "All" && tech.category !== selectedCategory) {
        return false;
      }

      // Search query match across name, category, slug, tagline, description
      if (!query) return true;

      const nameMatch = tech.name.toLowerCase().includes(query);
      const catMatch = tech.category.toLowerCase().includes(query);
      const slugMatch = tech.slug.toLowerCase().includes(query);
      const taglineMatch = tech.tagline?.toLowerCase().includes(query);
      const descMatch = tech.description?.toLowerCase().includes(query);

      return nameMatch || catMatch || slugMatch || taglineMatch || descMatch;
    });
  }, [technologies, searchQuery, selectedCategory]);

  // Group filtered technologies by category dynamically
  const groupedByCategory = React.useMemo(() => {
    const groups: { [cat: string]: Technology[] } = {};

    filteredTechnologies.forEach((tech) => {
      const cat = tech.category || "General";
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(tech);
    });

    // Sort items within each category by order field or name
    Object.keys(groups).forEach((cat) => {
      groups[cat].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    });

    return groups;
  }, [filteredTechnologies]);

  const activeCategoryKeys = Object.keys(groupedByCategory);

  return (
    <main className="flex-1 py-8 sm:py-12 md:py-16">
      <Container className="space-y-8 sm:space-y-10 max-w-5xl">
        {/* Page Header */}
        <div ref={containerRef} className="space-y-3">
          <h1
            data-animate-item
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-sans"
          >
            Stack
          </h1>
          <p
            data-animate-item
            className="text-sm sm:text-base text-muted-foreground font-mono max-w-2xl leading-relaxed"
          >
            The technologies, tools, and systems I use to build and ship products.
          </p>

          {/* Search & Category Filter Controls */}
          <div data-animate-item className="pt-3 space-y-4">
            {/* Search Input */}
            <div className="relative flex items-center max-w-md">
              <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technologies..."
                aria-label="Search technologies"
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

            {/* Dynamic Category Pill Filters */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 ${
                      isSelected
                        ? "bg-foreground text-background font-semibold shadow-sm"
                        : "glass-surface text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-border/40"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Category Sections */}
        {activeCategoryKeys.length === 0 ? (
          <div className="py-16 text-center rounded-2xl glass-card border border-border/40 space-y-3">
            <p className="text-sm font-mono text-muted-foreground">
              No technologies found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs font-mono text-foreground underline hover:opacity-80"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-14">
            {activeCategoryKeys.map((categoryName) => {
              const items = groupedByCategory[categoryName];

              return (
                <section key={categoryName} className="space-y-4">
                  {/* Category Title Header */}
                  <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                    <h2 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                      {categoryName}
                    </h2>
                    <span className="text-[11px] font-mono text-muted-foreground/70 bg-muted/30 px-2 py-0.5 rounded-full border border-border/30">
                      {items.length} {items.length === 1 ? "skill" : "skills"}
                    </span>
                  </div>

                  {/* 2-Column Responsive Card Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {items.map((tech) => {
                      const isTooltipOpen = activeTooltipId === tech.id;

                      return (
                        <div
                          key={tech.id}
                          onMouseMove={onGlassMouseMove}
                          onMouseEnter={() => setActiveTooltipId(tech.id)}
                          onMouseLeave={() => setActiveTooltipId(null)}
                          className="glass-card glass-highlight group relative flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl border border-border/60 hover:border-border transition-all duration-200 cursor-default"
                        >
                          <div className="glass-glow-effect rounded-xl" />

                          {/* Technology Icon Frame */}
                          <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl glass-surface border border-border/50 p-2 shadow-xs group-hover:scale-105 transition-transform duration-200 bg-background/60">
                            <TechIcon
                              technology={tech}
                              className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
                            />
                          </div>

                          {/* Technology Info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1.5">
                              <h3 className="text-sm sm:text-[15px] font-semibold text-foreground font-sans truncate group-hover:text-foreground">
                                {tech.name}
                              </h3>
                              {tech.proficiencyLevel === "expert" && (
                                <span className="shrink-0 inline-flex items-center text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                                  Expert
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-mono text-muted-foreground truncate mt-0.5 leading-snug">
                              {tech.tagline || tech.description || tech.category}
                            </p>
                          </div>

                          {/* Interactive Hover Popover Tooltip */}
                          {isTooltipOpen && tech.description && (
                            <div className="absolute left-3 right-3 bottom-full mb-2 z-30 p-3 rounded-xl glass-modal border border-border/80 text-foreground text-xs shadow-xl animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
                              <div className="font-semibold font-sans text-sm flex items-center justify-between">
                                <span>{tech.name}</span>
                                {tech.documentationUrl && (
                                  <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-0.5">
                                    docs <ExternalLink className="h-2.5 w-2.5" />
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 font-mono text-[11px] text-muted-foreground leading-relaxed">
                                {tech.description}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </Container>
    </main>
  );
}

import Link from "next/link";
import { BookOpen, Film, Camera, ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Snap } from "@/types/snap";

interface PersonalLifeSectionProps {
  recentSnaps: Snap[];
}

export function PersonalLifeSection({ recentSnaps }: PersonalLifeSectionProps) {
  const displayedSnaps = recentSnaps.slice(0, 4);

  return (
    <section className="py-10 sm:py-14 md:py-16 border-b border-border/40 bg-background">
      <Container>
        {/* Section Header */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
          Personal <span className="font-light text-muted-foreground">|</span> Life
        </h2>

        {/* Books + Movies Nav Cards — 2-col desktop, stacked mobile */}
        <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Books Card */}
          <Link
            href="/books"
            className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card px-5 py-4 hover:border-border/80 hover:bg-card/80 transition-all duration-200 shadow-sm"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-lg border border-border/50 bg-secondary/30 group-hover:border-border/80 transition-colors">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground font-sans">Books</p>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono leading-relaxed">
                Books that have influenced my thinking and growth.
              </p>
            </div>
          </Link>

          {/* Movies Card */}
          <Link
            href="/movies"
            className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card px-5 py-4 hover:border-border/80 hover:bg-card/80 transition-all duration-200 shadow-sm"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-lg border border-border/50 bg-secondary/30 group-hover:border-border/80 transition-colors">
              <Film className="h-5 w-5 text-muted-foreground" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground font-sans">Movies</p>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono leading-relaxed">
                Films that shaped my perspective on storytelling.
              </p>
            </div>
          </Link>
        </div>

        {/* Recent Snaps */}
        <div className="mt-8 sm:mt-10">
          {/* Snaps Label */}
          <div className="flex items-center gap-2 mb-4">
            <Camera className="h-3.5 w-3.5 text-muted-foreground/70" />
            <span className="text-[10px] font-mono font-semibold text-muted-foreground/80 uppercase tracking-[0.12em]">
              Recent Snaps
            </span>
          </div>

          {/* 4-column snap grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {displayedSnaps.map((snap) => (
              <div
                key={snap.id}
                className="group relative aspect-square rounded-xl overflow-hidden border border-border/40 bg-muted/20"
              >
                {/* Snap Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={snap.media.url}
                  alt={snap.media.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Bottom Overlay — caption + location */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <p className="text-[11px] font-semibold text-white leading-tight truncate">
                    {snap.caption}
                  </p>
                  {snap.location && (
                    <p className="text-[10px] font-mono text-white/70 truncate mt-0.5 inline-flex items-center gap-1">
                      <MapPin className="h-2.5 w-2.5 shrink-0" />
                      {snap.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Show More + View Gallery CTAs */}
          <div className="mt-5 flex flex-col items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              Show More Snaps
              <span className="text-[10px]">▾</span>
            </button>

            <Link
              href="/craft"
              className="group inline-flex items-center rounded-lg border border-border/70 bg-foreground text-background shadow-sm overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 select-none"
            >
              <span className="px-4 sm:px-5 py-2.5 text-sm font-mono font-semibold tracking-wide">
                View Gallery Page
              </span>
              <span className="self-stretch w-[1px] bg-background/20" />
              <span className="flex items-center justify-center px-3 py-2.5 bg-black/15 dark:bg-white/10 group-hover:bg-black/25 dark:group-hover:bg-white/20 transition-colors duration-200">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

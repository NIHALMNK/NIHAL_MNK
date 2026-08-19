"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin, Camera } from "lucide-react";
import { Snap } from "@/types/snap";
import { Container } from "@/components/ui/container";
import { useStaggerReveal } from "@/lib/animation/hooks";
import { onGlassMouseMove } from "@/lib/utils/glass-glow";

interface SnapsGalleryViewProps {
  snaps: Snap[];
}

export function SnapsGalleryView({ snaps }: SnapsGalleryViewProps) {
  const headerRef = useStaggerReveal<HTMLDivElement>({
    itemSelector: "[data-animate-item]",
    y: 20,
    duration: 0.5,
    stagger: 0.08,
  });

  return (
    <main className="flex-1 py-8 sm:py-12 md:py-16">
      <Container className="space-y-8 sm:space-y-10 max-w-5xl">
        {/* Page Header — follows Projects page hierarchy & spacing */}
        <div ref={headerRef} className="space-y-3">
          <div data-animate-item className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-border/40 text-xs font-mono text-muted-foreground">
            <Camera className="h-3.5 w-3.5" />
            <span>Visual Journal</span>
          </div>

          <h1 data-animate-item className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-sans">
            Recent Snaps
          </h1>
          <p data-animate-item className="text-sm sm:text-base text-muted-foreground font-mono max-w-2xl leading-relaxed">
            A visual journal of moments, conferences, hackathons, and life beyond the screen.
          </p>
        </div>

        {/* Snaps 2-Column Responsive Showcase Grid */}
        {snaps && snaps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {snaps.map((snap, index) => {
              const hasLocation = Boolean(snap.location && snap.location.trim() !== "");

              return (
                <div
                  key={snap.id || `snap-${index}`}
                  data-animate-item
                  onMouseMove={onGlassMouseMove}
                  className="group relative flex flex-col rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-border/80 hover:shadow-lg shadow-sm"
                >
                  {/* Cursor Glow effect if present in global design system */}
                  <span className="glass-glow-effect" />

                  {/* Image Container with smooth hover scale */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/30">
                    <Image
                      src={snap.media.url}
                      alt={snap.media.alt || snap.caption || "Photograph"}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

                    {/* Subtle Location badge overlay on image bottom */}
                    {hasLocation && (
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md glass-modal text-[11px] font-mono text-white/90 shadow-sm backdrop-blur-md border border-white/15">
                          <MapPin className="h-3 w-3 text-white/75 shrink-0" />
                          <span>{snap.location}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center space-y-3 glass-card rounded-2xl p-8 border border-border/40 max-w-lg mx-auto">
            <p className="text-base font-bold text-foreground font-sans">
              No snaps published yet
            </p>
            <p className="text-xs font-mono text-muted-foreground">
              Recent photographs and event snapshots will appear here soon.
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}

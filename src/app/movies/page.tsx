import { Metadata } from "next";
import { ExternalLink, Star } from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { getMovies } from "@/lib/data/movies";

export const metadata: Metadata = {
  title: "Movies — Mohammed Nihal K",
  description: "Cinema that left a mark. A collection of visual storytelling I admire.",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground">
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      {rating}/5
    </span>
  );
}

export default async function MoviesPage() {
  const movies = await getMovies();

  return (
    <SectionShell
      title="Movies"
      description="Cinema that left a mark. A collection of visual storytelling I admire."
    >
      <div className="space-y-3 max-w-2xl">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 sm:p-5 hover:border-border/80 transition-colors"
          >
            {/* Movie Poster */}
            <div className="shrink-0 w-[72px] sm:w-20 h-[108px] sm:h-[120px] rounded-md overflow-hidden border border-border/40 bg-muted/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Movie Details */}
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-foreground leading-snug font-sans">
                    {movie.title}
                  </h2>
                  <p className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-wider mt-0.5">
                    {movie.director} • {movie.year}
                  </p>
                </div>
                {movie.imdbUrl && (
                  <a
                    href={movie.imdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${movie.title} on IMDb`}
                    className="shrink-0 text-muted-foreground/50 hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {movie.review}
              </p>

              <div className="mt-1">
                <StarRating rating={movie.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

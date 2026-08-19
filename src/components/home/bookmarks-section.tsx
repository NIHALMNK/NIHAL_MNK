import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BookmarkSourceIcon } from "@/components/ui/bookmark-source-icon";
import { Bookmark } from "@/types/bookmark";

interface BookmarksSectionProps {
  bookmarks: Bookmark[];
}

export function BookmarksSection({ bookmarks }: BookmarksSectionProps) {
  return (
    <section className="py-10 sm:py-14 md:py-16 border-b border-border/40 bg-background">
      <Container>
        {/* Section Header */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans mb-6 sm:mb-8">
          Curated Resources
        </h2>

        {/* Bookmarks List */}
        <div className="flex flex-col gap-3 max-w-3xl">
          {bookmarks.map((bookmark) => (
            <a
              key={bookmark.id}
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 p-4 sm:p-5 rounded-xl border border-border/40 bg-card hover:bg-card/80 hover:border-border/80 transition-all duration-200 shadow-sm"
            >
              <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                <div className="shrink-0 mt-0.5 w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-secondary/30 border border-border/50 flex items-center justify-center group-hover:border-border/80 transition-colors">
                  <BookmarkSourceIcon domain={bookmark.domain} iconUrl={bookmark.iconUrl} />
                </div>
                
                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {bookmark.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                    <span className="truncate">{bookmark.domain}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30 shrink-0" />
                    <span className="truncate">{bookmark.category}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground/80 mt-1 truncate font-serif italic">
                    &ldquo;{bookmark.description}&rdquo;
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-muted-foreground/40 group-hover:text-foreground/80 transition-colors pl-2">
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

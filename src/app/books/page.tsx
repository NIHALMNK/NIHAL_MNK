import { Metadata } from "next";
import { ExternalLink, Star, CheckCircle2 } from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
// Note: server component — no onError handlers on img
import { getBooks } from "@/lib/data/books";
import { Book } from "@/types/personal";

export const metadata: Metadata = {
  title: "Books",
  description: "A collection of the books that have shaped my engineering, design, and philosophy.",
};

function StatusBadge({ status }: { status: Book["status"] }) {
  if (status === "finished") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-500 uppercase tracking-wide">
        <CheckCircle2 className="h-3 w-3" />
        Finished
      </span>
    );
  }
  if (status === "reading") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-amber-500 uppercase tracking-wide">
        Reading
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
      Want to Read
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground">
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      {rating}/5
    </span>
  );
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <SectionShell
      title="Books"
      description="A collection of the books that have shaped my engineering, design, and philosophy."
    >
      <div className="space-y-3 max-w-2xl">
        {books.map((book) => (
          <div
            key={book.id}
            className="group flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 sm:p-5 hover:border-border/80 transition-colors"
          >
            {/* Book Cover */}
            <div className="shrink-0 w-[72px] sm:w-20 h-[108px] sm:h-[120px] rounded-md overflow-hidden border border-border/40 bg-muted/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Book Details */}
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-foreground leading-snug font-sans">
                    {book.title}
                  </h2>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    by {book.author}
                  </p>
                </div>
                {book.goodreadsUrl && (
                  <a
                    href={book.goodreadsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${book.title} on Goodreads`}
                    className="shrink-0 text-muted-foreground/50 hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {book.review}
              </p>

              <div className="flex items-center gap-3 mt-1">
                <StarRating rating={book.rating} />
                <StatusBadge status={book.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

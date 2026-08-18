import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export function ContactCtaSection() {
  return (
    <section className="py-14 sm:py-16 md:py-20">
      <Container>
        <div className="flex flex-col items-center gap-7 sm:gap-8 text-center">
          {/* Italic Quote */}
          <p className="max-w-lg text-base sm:text-lg md:text-xl font-serif italic text-muted-foreground/90 leading-relaxed px-4 sm:px-0">
            &ldquo;If you&apos;ve read this far, you might be interested in what I do.&rdquo;
          </p>

          {/* Get in Touch Button — light body + right arrow compartment */}
          <Link
            href="/contact"
            className="group inline-flex items-center rounded-lg border border-border/70 bg-foreground text-background shadow-sm overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 select-none"
          >
            {/* Main label area */}
            <span className="px-4 sm:px-5 py-2.5 text-sm font-mono font-semibold tracking-wide">
              Get in Touch
            </span>

            {/* Divider */}
            <span className="self-stretch w-[1px] bg-background/20" />

            {/* Arrow compartment — slightly darker/tinted */}
            <span className="flex items-center justify-center px-3 py-2.5 bg-black/15 dark:bg-white/10 group-hover:bg-black/25 dark:group-hover:bg-white/20 transition-colors duration-200">
              <ChevronRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

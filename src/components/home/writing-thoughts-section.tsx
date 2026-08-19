"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BlogPost } from "@/types/blog";
import { SectionCtaButton } from "@/components/ui/section-cta-button";
import { useStaggerReveal } from "@/lib/animation/hooks";

interface WritingThoughtsSectionProps {
  posts: BlogPost[];
}

export function WritingThoughtsSection({ posts }: WritingThoughtsSectionProps) {
  const sectionRef = useStaggerReveal<HTMLElement>({
    itemSelector: "[data-animate-item]",
    y: 30,
    duration: 0.6,
    stagger: 0.1,
  });

  // Ensure exactly maximum 2 posts are displayed on the homepage
  const displayedPosts = posts.slice(0, 2);

  return (
    <section ref={sectionRef} className="py-8 sm:py-10 md:py-12 border-b border-border/40">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
              Engineering Notes
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm font-mono text-muted-foreground">
              Insights on engineering, design, and building products.
            </p>
          </div>
        </div>

        {/* 2-Card Blog Grid */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {displayedPosts.map((post) => (
            <Link
              key={post.id}
              data-animate-item
              href={`/blogs/${post.slug}`}
              className="glass-card glass-highlight group relative flex flex-col justify-between rounded-xl p-5 sm:p-6 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
            >
              <div>
                {/* Meta Row: Date & Reading Time */}
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span>{post.publishedAt}</span>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>

                {/* Title with Arrow Icon */}
                <div className="mt-2.5 flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-foreground/90 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/70 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
                </div>

                {/* Excerpt */}
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Tags Row */}
              <div className="mt-5 flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md border border-border/40 bg-secondary/30 px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Button: Read all Articles -> /blogs */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <SectionCtaButton href="/blogs" icon={ArrowRight}>
            Read all Articles
          </SectionCtaButton>
        </div>
      </Container>
    </section>
  );
}

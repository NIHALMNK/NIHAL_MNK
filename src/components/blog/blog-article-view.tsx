"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { BlogPost, BlogHeading } from "@/types/blog";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { ReadingIndicator } from "@/components/blog/reading-indicator";

interface BlogArticleViewProps {
  post: BlogPost;
}

export function BlogArticleView({ post }: BlogArticleViewProps) {
  const [headings, setHeadings] = React.useState<BlogHeading[]>([]);

  const handleHeadingsExtracted = React.useCallback((extracted: BlogHeading[]) => {
    setHeadings(extracted);
  }, []);

  return (
    <article id="article-body" className="relative space-y-6 max-w-3xl mx-auto py-2">
      {/* Back Link */}
      <div>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Writing</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-3 border-b border-border/40 pb-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-md border border-border/50 bg-secondary/30 px-2.5 py-0.5 text-xs font-mono text-muted-foreground"
            >
              <Tag className="h-3 w-3 text-muted-foreground/70" />
              <span>{tag}</span>
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground font-sans leading-tight">
          {post.title}
        </h1>

        {/* Date & Reading Time Meta Row */}
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{post.publishedAt}</span>
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readingTime}</span>
          </span>

          {post.author && (
            <span>• By {post.author.name}</span>
          )}
        </div>
      </div>

      {/* Highlighted Intro Callout Box */}
      {post.introCallout && (
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 sm:p-5 text-sm sm:text-base italic leading-relaxed text-muted-foreground/90 shadow-xs">
          &ldquo;{post.introCallout}&rdquo;
        </div>
      )}

      {/* Main Markdown Article Content */}
      <div className="pt-2 pb-12">
        <MarkdownRenderer
          content={post.content}
          onHeadingsExtracted={handleHeadingsExtracted}
        />
      </div>

      {/* Floating Reading Status HUD Indicator */}
      <ReadingIndicator headings={headings} articleId="article-body" />
    </article>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { getAllPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Writing | Thoughts — Mohammed Nihal K",
  description: "Articles, technical essays, and reflections on engineering, web architecture, and product design.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <SectionShell
      title="Writing | Thoughts"
      description="Insights on engineering, design, and building products."
      badge="Articles"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.slug}`}
            className="group relative flex flex-col justify-between rounded-xl border border-border/50 bg-card p-5 sm:p-6 hover:border-border/80 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
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
                <h2 className="text-base sm:text-lg font-bold text-foreground group-hover:text-foreground/90 transition-colors leading-snug line-clamp-2 font-sans">
                  {post.title}
                </h2>
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
    </SectionShell>
  );
}

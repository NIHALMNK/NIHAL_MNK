import { SectionShell } from "@/components/ui/section-shell";
import { getAllPosts } from "@/lib/data/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog — Nihal Portfolio",
  description: "Articles, technical essays, and reflections on web architecture, React, and software engineering.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <SectionShell
      title="Writings & Thoughts"
      description="Articles, architectural notes, and deep dives on modern web systems."
      badge="Blog Collection"
    >
      <div className="space-y-6 max-w-3xl">
        {posts.map((post) => (
          <article key={post.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <time>{post.publishedAt}</time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-foreground">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

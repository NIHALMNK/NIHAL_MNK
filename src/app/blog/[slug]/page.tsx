import { notFound } from "next/navigation";
import { SectionShell } from "@/components/ui/section-shell";
import { getPostBySlug, getAllPosts } from "@/lib/data/blog";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <SectionShell title={post.title} description={post.excerpt} badge="Article">
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground border-b border-border pb-4">
          <span>Published on {post.publishedAt}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
          {post.author && (
            <>
              <span>•</span>
              <span>By {post.author.name}</span>
            </>
          )}
        </div>
        <div className="prose dark:prose-invert max-w-none text-foreground whitespace-pre-line leading-relaxed">
          {post.content}
        </div>
        <div className="pt-6 border-t border-border">
          <Link href="/blog" className="text-sm font-semibold text-foreground hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

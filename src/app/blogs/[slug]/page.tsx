import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionShell } from "@/components/ui/section-shell";
import { getPostBySlug, getAllPosts } from "@/lib/data/blog";
import { BlogArticleView } from "@/components/blog/blog-article-view";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Mohammed Nihal K`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <SectionShell badge="Article">
      <BlogArticleView post={post} />
    </SectionShell>
  );
}

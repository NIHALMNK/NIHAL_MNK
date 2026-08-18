import { redirect } from "next/navigation";

interface LegacyBlogPostRedirectProps {
  params: {
    slug: string;
  };
}

export default function LegacyBlogPostRedirect({ params }: LegacyBlogPostRedirectProps) {
  redirect(`/blogs/${params.slug}`);
}

import { notFound } from "next/navigation";
import { SectionShell } from "@/components/ui/section-shell";
import { getProjectBySlug, getAllProjects } from "@/lib/data/projects";
import Link from "next/link";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <SectionShell
      title={project.title}
      description={project.description}
      badge="Project Case Study"
    >
      <div className="space-y-6 max-w-3xl">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
        <div className="pt-4 border-t border-border flex gap-4 text-sm">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="font-medium underline">
              Visit Live Site ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="font-medium underline">
              View Repository ↗
            </a>
          )}
          <Link href="/projects" className="ml-auto text-muted-foreground hover:text-foreground">
            ← Back to Projects
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

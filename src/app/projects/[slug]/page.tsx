import { notFound } from "next/navigation";
import { SectionShell } from "@/components/ui/section-shell";
import { getProjectBySlug, getAllProjects } from "@/lib/data/projects";
import { TechIcon } from "@/components/ui/tech-icon";
import Link from "next/link";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

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
            <span key={tech.id} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              <TechIcon technology={tech} className="h-3.5 w-3.5 shrink-0" />
              <span>{tech.name}</span>
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

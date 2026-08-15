import { SectionShell } from "@/components/ui/section-shell";
import { getAllProjects } from "@/lib/data/projects";
import Link from "next/link";

export const metadata = {
  title: "Projects — Nihal Portfolio",
  description: "Complete showcase of software projects, applications, and engineering case studies.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <SectionShell
      title="Projects"
      description="All published software projects, system architectures, and technical case studies."
      badge="Portfolio Collection"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="rounded-lg border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
            <div>
              {project.priority && (
                <span className="inline-block mb-2 rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Featured Priority {project.priority}
                </span>
              )}
              <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.shortDescription}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-xs">
              <span className="text-muted-foreground">{project.publishedAt}</span>
              <Link href={`/projects/${project.slug}`} className="font-semibold text-foreground hover:underline">
                View Project →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

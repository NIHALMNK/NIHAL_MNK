import { Metadata } from "next";
import { getAllProjects } from "@/lib/data/projects";
import { ProjectsArchiveView } from "@/components/projects/projects-archive-view";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of things I've built, ranging from AI tools and full-stack apps to UI experiments.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectsArchiveView initialProjects={projects} />;
}

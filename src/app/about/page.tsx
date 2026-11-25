import { Metadata } from "next";
import { getAboutData } from "@/lib/data/about";
import { getAllTechnologies } from "@/lib/data/stack";
import { getConnectLinks } from "@/lib/data/connect";
import { AboutView } from "@/components/about/about-view";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack MERN developer background, engineering philosophy, education, technical skills, and professional experience.",
};

export default async function AboutPage() {
  const [data, allTechnologies, connectLinks] = await Promise.all([
    getAboutData(),
    getAllTechnologies(),
    getConnectLinks(),
  ]);

  if (!data) {
    return (
      <Container className="py-16">
        <EmptyState
          title="About page coming soon"
          description="This content is managed in Sanity Studio (Home Domain → About Me Page)."
        />
      </Container>
    );
  }

  return <AboutView data={data} allTechnologies={allTechnologies} connectLinks={connectLinks} />;
}

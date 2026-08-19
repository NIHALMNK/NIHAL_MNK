import { Metadata } from "next";
import { getAboutData } from "@/lib/data/about";
import { getAllTechnologies } from "@/lib/data/stack";
import { getConnectLinks } from "@/lib/data/connect";
import { AboutView } from "@/components/about/about-view";

export const metadata: Metadata = {
  title: "About — Mohammed Nihal K",
  description:
    "Full-stack MERN developer background, engineering philosophy, education, technical skills, and professional experience.",
};

export default async function AboutPage() {
  const [data, allTechnologies, connectLinks] = await Promise.all([
    getAboutData(),
    getAllTechnologies(),
    getConnectLinks(),
  ]);

  return <AboutView data={data} allTechnologies={allTechnologies} connectLinks={connectLinks} />;
}

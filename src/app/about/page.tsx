import { Metadata } from "next";
import { getAboutData } from "@/lib/data/about";
import { AboutView } from "@/components/about/about-view";

export const metadata: Metadata = {
  title: "About — Mohammed Nihal K",
  description:
    "Full-stack MERN developer background, engineering philosophy, education, technical skills, and professional experience.",
};

export default async function AboutPage() {
  const data = await getAboutData();

  return <AboutView data={data} />;
}

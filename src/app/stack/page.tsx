import { Metadata } from "next";
import { getAllTechnologies } from "@/lib/data/stack";
import { StackView } from "@/components/stack/stack-view";

export const metadata: Metadata = {
  title: "Stack",
  description: "The complete technical skill inventory, programming languages, frameworks, databases, and engineering systems I use to build and ship products.",
  openGraph: {
    title: "Stack",
    description: "The complete technical skill inventory, programming languages, frameworks, databases, and engineering systems I use to build and ship products.",
  },
};

export default async function StackPage() {
  const technologies = await getAllTechnologies();

  return <StackView technologies={technologies} />;
}

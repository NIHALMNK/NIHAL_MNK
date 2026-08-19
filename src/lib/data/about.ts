import { AboutData } from "@/types/about";
import { aboutData } from "@/data/home/about-me";

export async function getAboutData(): Promise<AboutData> {
  return aboutData;
}

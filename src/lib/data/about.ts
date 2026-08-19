import { AboutData } from "@/types/about";
import { aboutData } from "@/data/about";

export async function getAboutData(): Promise<AboutData> {
  return aboutData;
}

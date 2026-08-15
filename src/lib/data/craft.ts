import { CraftItem } from "@/types/craft";
import { craftData } from "@/data/craft";

export async function getCraftItems(): Promise<CraftItem[]> {
  return craftData;
}

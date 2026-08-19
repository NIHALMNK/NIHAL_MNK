import { Achievement } from "@/types/achievement";
import { achievementsData } from "@/data/home/achievements";

export async function getAchievements(): Promise<Achievement[]> {
  return achievementsData;
}

import { Achievement } from "@/types/achievement";
import { achievementsData } from "@/data/achievements";

export async function getAchievements(): Promise<Achievement[]> {
  return achievementsData;
}

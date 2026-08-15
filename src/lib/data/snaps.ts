import { Snap } from "@/types/snap";
import { snapsData } from "@/data/snaps";

export async function getRecentSnaps(): Promise<Snap[]> {
  return snapsData;
}

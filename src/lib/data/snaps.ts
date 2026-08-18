import { Snap } from "@/types/snap";
import { snapsData } from "@/data/snaps";

export async function getRecentSnaps(limit?: number): Promise<Snap[]> {
  const sorted = [...snapsData].sort(
    (a, b) => new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

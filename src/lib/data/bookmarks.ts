import { Bookmark } from "@/types/bookmark";
import { bookmarksData } from "@/data/home/current-resources";

export async function getBookmarks(): Promise<Bookmark[]> {
  return bookmarksData;
}

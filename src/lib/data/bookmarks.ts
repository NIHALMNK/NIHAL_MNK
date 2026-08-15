import { Bookmark } from "@/types/bookmark";
import { bookmarksData } from "@/data/bookmarks";

export async function getBookmarks(): Promise<Bookmark[]> {
  return bookmarksData;
}

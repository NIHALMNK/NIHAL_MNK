import { Book } from "@/types/personal";
import { booksData } from "@/data/books";

export async function getBooks(): Promise<Book[]> {
  return booksData;
}

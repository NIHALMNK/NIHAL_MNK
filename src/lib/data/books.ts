import { Book } from "@/types/personal";
import { booksData } from "@/data/home/books";

export async function getBooks(): Promise<Book[]> {
  return booksData;
}

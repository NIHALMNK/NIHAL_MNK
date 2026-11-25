import { Book } from "@/types/personal";
import { sanityFetch, isSanityConfigured } from "@/sanity/client";
import { allBooksQuery } from "@/sanity/queries";

interface SanityBookDoc {
  _id: string;
  id?: string;
  title: string;
  author: string;
  coverUrl?: string;
  review?: string;
  rating?: number;
  status?: Book["status"];
  goodreadsUrl?: string;
}

export async function getBooks(): Promise<Book[]> {
  if (isSanityConfigured()) {
    const sanityBooks = await sanityFetch<SanityBookDoc[]>({
      query: allBooksQuery,
      tags: ["book"],
    });

    if (sanityBooks && sanityBooks.length > 0) {
      return sanityBooks.map((b) => ({
        id: b.id || b._id,
        title: b.title,
        author: b.author,
        coverUrl: b.coverUrl || "https://res.cloudinary.com/doyxte1wf/image/upload/v1787070000/books/pragmatic-programmer.jpg",
        review: b.review || "",
        rating: (b.rating as Book["rating"]) || 5,
        status: b.status || "finished",
        goodreadsUrl: b.goodreadsUrl,
      }));
    }
  }

  return [];
}

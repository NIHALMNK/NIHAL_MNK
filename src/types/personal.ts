export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  review: string;
  rating: 1 | 2 | 3 | 4 | 5;
  status: "finished" | "reading" | "want-to-read";
  goodreadsUrl?: string;
}

export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  posterUrl: string;
  review: string;
  rating: 1 | 2 | 3 | 4 | 5;
  imdbUrl?: string;
}

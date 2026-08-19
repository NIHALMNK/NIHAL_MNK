import { Movie } from "@/types/personal";
import { moviesData as localMoviesData } from "@/data/home/movies";
import { sanityFetch, isSanityConfigured } from "@/sanity/client";
import { allMoviesQuery } from "@/sanity/queries";

interface SanityMovieDoc {
  _id: string;
  id?: string;
  title: string;
  director: string;
  year: number;
  posterUrl?: string;
  review?: string;
  rating?: number;
  imdbUrl?: string;
}

export async function getMovies(): Promise<Movie[]> {
  if (isSanityConfigured()) {
    const sanityMovies = await sanityFetch<SanityMovieDoc[]>({
      query: allMoviesQuery,
      tags: ["movie"],
    });

    if (sanityMovies && sanityMovies.length > 0) {
      return sanityMovies.map((m) => ({
        id: m.id || m._id,
        title: m.title,
        director: m.director,
        year: m.year,
        posterUrl: m.posterUrl || "https://res.cloudinary.com/doyxte1wf/image/upload/v1787070000/movies/interstellar.jpg",
        review: m.review || "",
        rating: (m.rating as Movie["rating"]) || 5,
        imdbUrl: m.imdbUrl,
      }));
    }
  }

  return localMoviesData;
}

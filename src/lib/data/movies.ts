import { Movie } from "@/types/personal";
import { moviesData } from "@/data/movies";

export async function getMovies(): Promise<Movie[]> {
  return moviesData;
}

import { Movie } from "@/types/personal";
import { moviesData } from "@/data/home/movies";

export async function getMovies(): Promise<Movie[]> {
  return moviesData;
}

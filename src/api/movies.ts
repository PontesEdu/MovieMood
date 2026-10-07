import type { MovieListResponse } from '../types/movie'
import { tmdbFetch } from './tmdb'

export async function getTrendingMovies() {
  const data = await tmdbFetch<MovieListResponse>('/trending/movie/week')

  return data.results
}

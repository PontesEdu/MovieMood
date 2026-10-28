import type { MovieDetails, MovieListResponse } from '../types/movie'
import { tmdbFetch } from './tmdb'

export async function getTrendingMovies() {
  const data = await tmdbFetch<MovieListResponse>('/trending/movie/week')

  return data.results
}

export async function getMovieDetails(movieId: string) {
  return await tmdbFetch<MovieDetails>(`/movie/${movieId}`)
}

export async function searchMovies(query: string) {
  const data = await tmdbFetch<MovieListResponse>('/search/movie', { query })

  return data.results
}

import type {
  Genre,
  MovieDetails,
  MovieFilters,
  MovieListResponse,
  MovieSort,
} from '../types/movie'
import { tmdbFetch } from './tmdb'

export async function getTrendingMovies() {
  const data = await tmdbFetch<MovieListResponse>('/trending/movie/week')

  return data.results
}

export async function getMovieDetails(movieId: string) {
  return await tmdbFetch<MovieDetails>(`/movie/${movieId}`)
}

export async function getGenres() {
  const data = await tmdbFetch<{ genres: Genre[] }>('/genre/movie/list')

  return data.genres
}

export async function searchMovies(query: string) {
  const data = await tmdbFetch<MovieListResponse>('/search/movie', { query })

  return data.results
}

const SORT_PARAMS: Record<MovieSort, Record<string, string>> = {
  popular: { sort_by: 'popularity.desc' },
  rating: { sort_by: 'vote_average.desc', 'vote_count.gte': '200' },
  recent: {
    sort_by: 'primary_release_date.desc',
    'primary_release_date.lte': new Date().toISOString().slice(0, 10),
  },
}

export async function discoverMovies({
  genre,
  year,
  sort = 'popular',
}: MovieFilters) {
  const params: Record<string, string> = { ...SORT_PARAMS[sort] }

  if (genre) params.with_genres = genre
  if (year) params.primary_release_year = year

  const data = await tmdbFetch<MovieListResponse>('/discover/movie', params)

  return data.results
}

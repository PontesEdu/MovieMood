import { useQuery } from '@tanstack/react-query'
import type { MovieFilters } from '../types/movie'
import { discoverMovies } from '../api/movies'

export function useMovieFilters(filters: MovieFilters) {
  return useQuery({
    queryKey: ['movies', 'discover', filters],
    queryFn: () => discoverMovies(filters),
    enabled: Boolean,
  })
}

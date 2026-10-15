import { useQuery } from '@tanstack/react-query'
import { getTrendingMovies } from '../api/movies'

export function useTrendingMovies() {
  return useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: getTrendingMovies,
  })
}

import { useQuery } from '@tanstack/react-query'
import { getMovieDetails } from '../api/movies'

export function useMovieDetails(movieId: string) {
  return useQuery({
    queryKey: ['movies', 'details', movieId],
    queryFn: () => getMovieDetails(movieId),
  })
}

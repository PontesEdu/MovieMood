import { useQuery } from '@tanstack/react-query'
import { getGenres } from '../api/movies'

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
    staleTime: Infinity,
  })
}

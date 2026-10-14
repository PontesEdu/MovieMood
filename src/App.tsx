import { getTrendingMovies } from './api/movies'
import { useQuery } from '@tanstack/react-query'

export function App() {
  const {
    data: movies,
    isPending,
    error,
  } = useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: getTrendingMovies,
  })

  if (isPending) return <p>Carregando…</p>
  if (error) return <p>Não foi possível carregar os filmes.</p>
  if (movies.length === 0) return <p>Nenhum filme encontrado.</p>

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  )
}

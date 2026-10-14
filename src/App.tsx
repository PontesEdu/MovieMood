import { useEffect, useState } from 'react'
import type { Movie } from './types/movie'
import { getTrendingMovies } from './api/movies'

export function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const carregarFilmes = async () => {
      try {
        const data = await getTrendingMovies()
        setMovies(data)
      } catch {
        setError('não foi possivel carregar filmes')
      } finally {
        setIsLoading(false)
      }
    }

    carregarFilmes()
  }, [])

  if (isLoading) return <p>Carregando…</p>
  if (error) return <p>{error}</p>
  if (movies.length === 0) return <p>Nenhum filme encontrado.</p>

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}> {movie.title}</li>
        ))}
      </ul>
    </div>
  )
}

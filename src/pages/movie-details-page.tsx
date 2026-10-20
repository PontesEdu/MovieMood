import { Link, useParams } from 'react-router'
import { useMovieDetails } from '../hooks/use-movie-details'
import { TmdbError } from '../api/tmdb'

export function MovieDetailsPage() {
  const { movieId } = useParams()

  const { data: movie, isPending, error } = useMovieDetails(movieId!)

  if (isPending) return <p>Carregando…</p>

  if (error instanceof TmdbError && error.status === 404) {
    return (
      <div>
        <p>Filme não encontrado.</p>
        <Link to="/">Voltar para o início</Link>
      </div>
    )
  }

  if (error) return <p>Não foi possível carregar o filme.</p>

  return <h2>{movie.title}</h2>
}

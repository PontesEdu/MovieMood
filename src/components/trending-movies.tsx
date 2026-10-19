import { useTrendingMovies } from '../hooks/use-trending-movies'
import { MovieCard } from './movie-card'

export function TrendingMovies() {
  const { data: movies, isPending, error } = useTrendingMovies()

  if (isPending) return <p>Carregando…</p>
  if (error) return <p>Não foi possível carregar os filmes.</p>
  if (movies.length === 0) return <p>Nenhum filme encontrado.</p>

  let content

  if (isPending) {
    content = <p>Carregando…</p>
  } else if (error) {
    content = <p>Não foi possível carregar os filmes.</p>
  } else if (movies.length === 0) {
    content = <p>Nenhum filme encontrado.</p>
  } else {
    content = (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-x-5 gap-y-7">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-display text-3xl font-bold tracking-tight">
        Em alta esta semana
      </h2>
      {content}
    </section>
  )
}

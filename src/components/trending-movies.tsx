import { useTrendingMovies } from '../hooks/use-trending-movies'
import { MovieCard } from './movie-card'
import { MovieCardSkeleton } from './movie-card-skeleton'
import { MovieGrid } from './movie-grid'

export function TrendingMovies() {
  const { data: movies, isPending, error } = useTrendingMovies()

  let content

  if (isPending) {
    content = (
      <>
        <p className="sr-only">Carregando filmes…</p>
        <div aria-hidden="true">
          <MovieGrid>
            {Array.from({ length: 10 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </MovieGrid>
        </div>
      </>
    )
  } else if (error) {
    content = <p>Não foi possível carregar os filmes.</p>
  } else if (movies.length === 0) {
    content = <p>Nenhum filme encontrado.</p>
  } else {
    content = (
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </MovieGrid>
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

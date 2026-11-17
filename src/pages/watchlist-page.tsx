import { Link } from 'react-router'
import { useWatchlist } from '../hooks/use-watchlist'
import { MovieGrid } from '../components/movie-grid'
import { MovieCard } from '../components/movie-card'

export function WatchlistPage() {
  const { movies } = useWatchlist()

  let content

  if (movies.length === 0) {
    content = (
      <div className="bg-card flex flex-col items-center gap-4 rounded-2xl px-6 py-16 text-center">
        <p className="text-muted-foreground">
          Você ainda não salvou nenhum filme.
        </p>
        <Link
          to="/descobrir"
          className="bg-primary text-primary-foreground rounded-xl px-5 py-2.5 font-semibold"
        >
          Descobrir filmes
        </Link>
      </div>
    )
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
      <title>Minha lista | MovieMood</title>
      <h2 className="font-display text-3xl font-bold tracking-tight">
        Minha lista
      </h2>
      {content}
    </section>
  )
}

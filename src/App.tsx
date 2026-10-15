import { useTrendingMovies } from './hooks/use-trending-movies'
import { MovieCard } from './components/movie-card'

export function App() {
  const { data: movies, isPending, error } = useTrendingMovies()

  if (isPending) return <p>Carregando…</p>
  if (error) return <p>Não foi possível carregar os filmes.</p>
  if (movies.length === 0) return <p>Nenhum filme encontrado.</p>

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-x-5 gap-y-7">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </main>
  )
}

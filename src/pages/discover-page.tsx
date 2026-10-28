import { Form, useSearchParams } from 'react-router'
import { useSearchMovies } from '../hooks/use-search-movies'
import { MovieGrid } from '../components/movie-grid'
import { MovieCard } from '../components/movie-card'
import { MovieGridSkeleton } from '../components/movie-grid-skeleton'

export function DiscoverPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''

  const { data: movies, isPending, error } = useSearchMovies(query)

  let content

  if (!query) {
    content = <p>Digite o nome de um filme para começar.</p>
  } else if (isPending) {
    content = <MovieGridSkeleton />
  } else if (error) {
    content = <p>Não foi possível buscar os filmes.</p>
  } else if (movies.length === 0) {
    content = <p>Nenhum filme encontrado para "{query}"</p>
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
        Descobrir filmes
      </h2>
      <Form role="search" className="flex gap-3">
        <label htmlFor="search" className="sr-only">
          Buscar filme por título
        </label>
        <input
          key={query}
          id="search"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Buscar por título…"
          className="bg-card focus-visible:outline-primary placeholder:text-muted-foreground h-12 flex-1 rounded-xl border border-white/15 px-4 focus-visible:outline-2"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground h-12 rounded-xl px-6 font-semibold"
        >
          Buscar
        </button>
      </Form>
      {content}
    </section>
  )
}

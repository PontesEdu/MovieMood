import { Form, useSearchParams } from 'react-router'
import { useSearchMovies } from '../hooks/use-search-movies'
import { MovieGrid } from '../components/movie-grid'
import { MovieCard } from '../components/movie-card'
import { MovieGridSkeleton } from '../components/movie-grid-skeleton'
import type { MovieFilters, MovieSort } from '../types/movie'
import { useGenres } from '../hooks/use-genres'
import { useDiscoverMovies } from '../hooks/use-discover-movies'

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 30 }, (_, index) => currentYear - index)

const SELECT_CLASS =
  'bg-card focus-visible:outline-primary h-11 rounded-xl border border-white/15 px-3 scheme-dark focus-visible:outline-2 disabled:opacity-50'

function parseSort(value: string | null): MovieSort {
  return value === 'rating' || value === 'recent' ? value : 'popular'
}

export function DiscoverPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''

  const filters: MovieFilters = {
    genre: searchParams.get('genre') || undefined,
    year: searchParams.get('year') || undefined,
    sort: parseSort(searchParams.get('sort')),
  }

  const isSearching = query.length > 0

  const { data: genres } = useGenres()
  const searchResult = useSearchMovies(query)
  const discoverResult = useDiscoverMovies(filters, !isSearching)

  const {
    data: movies,
    isPending,
    error,
  } = isSearching ? searchResult : discoverResult

  let content

  if (isPending) {
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
      <Form
        key={searchParams.toString()}
        role="search"
        className="flex flex-col gap-3"
      >
        <div className="flex gap-3">
          <label htmlFor="search" className="sr-only">
            Buscar filme por título
          </label>
          <input
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
        </div>

        <div className="flex flex-wrap gap-3">
          <label htmlFor="genre" className="sr-only">
            Gênero
          </label>
          <select
            id="genre"
            name="genre"
            defaultValue={filters.genre ?? ''}
            disabled={isSearching}
            className={SELECT_CLASS}
          >
            <option value="">Todos os gêneros</option>
            {genres?.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <label htmlFor="year" className="sr-only">
            Ano
          </label>
          <select
            id="year"
            name="year"
            defaultValue={filters.year ?? ''}
            disabled={isSearching}
            className={SELECT_CLASS}
          >
            <option value="">Todos os anos</option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <label htmlFor="sort" className="sr-only">
            Ordenar por
          </label>
          <select
            id="sort"
            name="sort"
            defaultValue={filters.sort}
            disabled={isSearching}
            className={SELECT_CLASS}
          >
            <option value="popular">Mais populares</option>
            <option value="rating">Melhor avaliados</option>
            <option value="recent">Mais recentes</option>
          </select>
        </div>

        {isSearching && (
          <p className="text-muted-foreground text-sm">
            Os filtros não valem para a busca por título. Limpe o campo para
            usá-los.
          </p>
        )}
      </Form>
      {content}
    </section>
  )
}

import { Link } from 'react-router'
import { getImageUrl } from '../api/tmdb'
import { useTrendingMovies } from '../hooks/use-trending-movies'
import { useGenres } from '../hooks/use-genres'
import { useWatchlist } from '../hooks/use-watchlist'
import { formatRating, formatYear } from '../utils/format'

export function HomeHero() {
  const { data: movies, isPending, error } = useTrendingMovies()
  const { data: genres } = useGenres()
  const { isSaved, toggle } = useWatchlist()

  if (isPending) {
    return <div className="bg-card h-112 animate-pulse" aria-hidden="true" />
  }

  if (error) return null

  const movie = movies.find((item) => item.backdrop_path)

  if (!movie) return null

  const hasRating = movie.vote_average > 0
  const saved = isSaved(movie.id)

  const genreNames = movie.genre_ids
    .map((id) => genres?.find((genre) => genre.id === id)?.name)
    .filter(Boolean)
    .slice(0, 3)
    .join(' · ')

  return (
    <section className="relative overflow-hidden">
      {movie.backdrop_path && (
        <img
          src={getImageUrl(movie.backdrop_path, 'w1280')}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
        />
      )}
      <div className="from-background via-background/85 to-background/30 absolute inset-0 bg-linear-to-t md:bg-linear-to-r" />
      <div className="from-background absolute inset-0 bg-linear-to-t to-transparent to-40%" />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-24">
        <div className="flex max-w-xl flex-col gap-4">
          <p className="text-primary flex items-center gap-2.5 text-sm font-semibold tracking-widest uppercase">
            <span className="bg-primary h-0.5 w-6" aria-hidden="true" />
            Em alta esta semana
          </p>

          <h2 className="font-display text-4xl leading-none font-bold tracking-tight md:text-6xl">
            {movie.title}
          </h2>

          <p className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            {hasRating && (
              <span className="text-foreground font-semibold">
                <span className="text-primary" aria-hidden="true">
                  ★{' '}
                </span>
                <span className="sr-only">Nota </span>
                {formatRating(movie.vote_average)}
              </span>
            )}
            <span>{formatYear(movie.release_date)}</span>
            {genreNames && <span>{genreNames}</span>}
          </p>

          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
            {movie.overview}
          </p>

          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              to={`/movie/${movie.id}`}
              className="bg-primary text-primary-foreground focus-visible:outline-primary inline-flex h-12 items-center gap-2 rounded-xl px-6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Ver detalhes
              <span aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              onClick={() => toggle(movie)}
              aria-pressed={saved}
              className="aria-pressed:bg-primary aria-pressed:text-primary-foreground focus-visible:outline-primary inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 font-semibold transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 aria-pressed:border-transparent"
            >
              <span aria-hidden="true">{saved ? '✓' : '+'}</span>
              Minha lista
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

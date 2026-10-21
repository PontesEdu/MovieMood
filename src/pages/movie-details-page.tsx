import { Link, useParams } from 'react-router'
import { useMovieDetails } from '../hooks/use-movie-details'
import { getImageUrl, TmdbError } from '../api/tmdb'
import { formatRating, formatRuntime, formatYear } from '../utils/format'

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

  const rating = formatRating(movie.vote_average)

  const details = [formatYear(movie.release_date), formatRuntime(movie.runtime)]
    .filter(Boolean)
    .join(' · ')

  return (
    <>
      <title>{`${movie.title} | MovieMood`}</title>

      <article className="bg-card relative overflow-hidden rounded-2xl">
        {movie.backdrop_path && (
          <img
            src={getImageUrl(movie.backdrop_path, 'w1280')}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="from-background via-background/85 to-background/40 absolute inset-0 bg-linear-to-t md:bg-linear-to-r" />

        <div className="relative flex flex-col gap-8 p-6 md:flex-row md:p-10">
          <div className="bg-card aspect-2/3 w-48 shrink-0 overflow-hidden rounded-xl md:w-56">
            {movie.poster_path ? (
              <img
                src={getImageUrl(movie.poster_path, 'w342')}
                alt={`Pôster de ${movie.title}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
                Sem imagem
              </div>
            )}
          </div>

          <div className="flex max-w-2xl flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-4xl font-bold tracking-tight">
                {movie.title}
              </h2>
              {movie.tagline && (
                <p className="text-muted-foreground italic">{movie.tagline}</p>
              )}
            </div>

            <p className="flex items-center gap-2 text-sm">
              <span className="text-primary font-semibold">
                <span aria-hidden="true">★ </span>
                <span className="sr-only">Nota </span>
                {rating}
              </span>
              {details && (
                <span className="text-muted-foreground">· {details}</span>
              )}
            </p>

            {movie.genres.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="rounded-full border border-white/15 px-3 py-1 text-sm"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}

            {movie.overview && (
              <p className="text-foreground/90 leading-relaxed">
                {movie.overview}
              </p>
            )}
          </div>
        </div>
      </article>
    </>
  )
}

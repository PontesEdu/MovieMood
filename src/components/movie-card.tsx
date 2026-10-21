import { Link } from 'react-router'
import { getImageUrl } from '../api/tmdb'
import type { Movie } from '../types/movie'
import { formatRating, formatYear } from '../utils/format'

type MovieCardProps = {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const rating = formatRating(movie.vote_average)

  const year = formatYear(movie.release_date)

  return (
    <article>
      <Link to={`/movie/${movie.id}`} className="flex flex-col gap-2 group rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        <div className="bg-card relative aspect-2/3 overflow-hidden rounded-xl">
          {movie.poster_path ? (
            <img
              src={getImageUrl(movie.poster_path, 'w342')}
              alt={`Pôster de ${movie.title}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
              Sem imagem
            </div>
          )}
          <div className="bg-background/85 absolute top-2 left-2 rounded-md px-2 py-1 text-sm font-semibold">
            {rating}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">{movie.title}</h3>
          <p className="text-muted-foreground text-sm">{year}</p>
        </div>
      </Link>
    </article>
  )
}

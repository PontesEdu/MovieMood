import { getImageUrl } from '../api/tmdb'
import type { Movie } from '../types/movie'

type MovieCardProps = {
  movie: Movie
}

const ratingFormatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 1,
})

export function MovieCard({ movie }: MovieCardProps) {
  const rating = ratingFormatter.format(movie.vote_average)

  const year = movie.release_date.slice(0, 4)

  return (
    <article className="flex flex-col gap-2">
      <div className="bg-card relative aspect-2/3 overflow-hidden rounded-xl">
        {movie.poster_path ? (
          <img
            src={getImageUrl(movie.poster_path, 'w342')}
            alt={`Pôster de ${movie.title}`}
            className="h-full w-full object-cover"
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
    </article>
  )
}

import { MovieCardSkeleton } from './movie-card-skeleton'
import { MovieGrid } from './movie-grid'

export function MovieGridSkeleton() {
  return (
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
}

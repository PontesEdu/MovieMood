import { MoodChips } from '../components/mood-chips'
import { TrendingMovies } from '../components/trending-movies'

export function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-10">
      <section className="flex flex-col gap-4">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Qual é o seu humor hoje?
        </h2>
        <MoodChips />
      </section>
      <TrendingMovies />
    </div>
  )
}

import { Link, useSearchParams } from 'react-router'

type Mood = {
  label: string
  genreId: string
}

const MOODS: Mood[] = [
  { label: 'Quero rir', genreId: '35' },
  { label: 'Quero tensão', genreId: '53' },
  { label: 'Quero adrenalina', genreId: '28' },
  { label: 'Quero me emocionar', genreId: '18' },
  { label: 'Quero pensar', genreId: '9648' },
  { label: 'Quero me apaixonar', genreId: '10749' },
]

export function MoodChips() {
  const [searchParams] = useSearchParams()

  return (
    <nav aria-label="Humores">
      <ul className="flex flex-wrap gap-2">
        {MOODS.map((mood) => {
          const isActive = searchParams.get('genre') === mood.genreId

          return (
            <li key={mood.genreId}>
              <Link
                to={`/descobrir?genre=${mood.genreId}`}
                aria-current={isActive ? 'page' : undefined}
                className="bg-card hover:border-primary/60 focus-visible:outline-primary aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground inline-flex h-10 items-center rounded-full border border-white/15 px-4 text-sm font-medium transition-colors focus-visible:outline-2 aria-[current=page]:border-transparent"
              >
                {mood.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

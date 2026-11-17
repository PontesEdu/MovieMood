import { useEffect, useState, type ReactNode } from 'react'
import type { SavedMovie } from '../types/movie'
import { WatchlistContext } from './watchlist-context'

const STORAGE_KEY = 'moviemood:watchlist'

function loadMovies(): SavedMovie[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

type WatchlistProviderProps = {
  children: ReactNode
}

export function WatchlistProvider({ children }: WatchlistProviderProps) {
  const [movies, setMovies] = useState(loadMovies)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies))
  }, [movies])

  function isSaved(id: number) {
    return movies.some((movie) => movie.id === id)
  }

  function toggle(movie: SavedMovie) {
    setMovies((current) =>
      current.some((saved) => saved.id === movie.id)
        ? current.filter((saved) => saved.id !== movie.id)
        : [
            {
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
            },
            ...current,
          ],
    )
  }

  return (
    <WatchlistContext value={{ movies, isSaved, toggle }}>
      {children}
    </WatchlistContext>
  )
}

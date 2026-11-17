import { createContext } from 'react'
import type { SavedMovie } from '../types/movie'

type WatchlistContextValue = {
  movies: SavedMovie[]
  isSaved: (id: number) => boolean
  toggle: (movie: SavedMovie) => void
}

export const WatchlistContext = createContext<WatchlistContextValue | null>(
  null,
)

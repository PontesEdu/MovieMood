import { use } from 'react'
import { WatchlistContext } from '../context/watchlist-context'

export function useWatchlist() {
  const context = use(WatchlistContext)

  if (!context) {
    throw new Error('useWatchlist precisa estar dentro do WatchlistProvider')
  }

  return context
}

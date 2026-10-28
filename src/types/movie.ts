export type Movie = {
  id: number
  title: string
  overview: string
  backdrop_path: string | null
  poster_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export type MovieListResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type Genre = {
  id: number
  name: string
}

export type MovieDetails = Omit<Movie, 'genre_ids'> & {
  genres: Genre[]
  runtime: number | null
  tagline: string
}

export type MovieSort = 'popular' | 'rating' | 'recent'

export type MovieFilters = {
  genre?: string
  year?: string
  sort?: MovieSort
}

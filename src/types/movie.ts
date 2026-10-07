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

const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

export async function tmdbFetch<T>(path: string): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('language', 'pt-BR')

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })

  if (!response.ok) {
    throw new TmdbError(response.status)
  }

  return response.json()
}

type ImageSize = 'w342' | 'w780' | 'w1280'

export function getImageUrl(path: string, size: ImageSize) {
  return `${IMAGE_BASE_URL}${size}${path}`
}

export class TmdbError extends Error {
  status: number

  constructor(status: number) {
    super(`TMDB respondeu com status ${status}`)
    this.status = status
  }
}

const BASE_URL = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

export async function tmdbFetch<T>(path: string): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('language', 'pt-BR')

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })

  if (!response.ok) {
    throw new Error(`Falhou com status ${response.status}`)
  }

  return response.json()
}

const BASE_URL = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

export async function tmdbFetch(path: string) {
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('language', 'pt-BR')

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })

  if (!response.ok) {
    throw new Error(`Falhou com status ${response.status}`)
  }

  const data = await response.json()
  console.log(data)
  return data
}

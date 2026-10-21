const ratingFormatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 1,
})
export function formatRating(vote: number) {
  return ratingFormatter.format(vote)
}

export function formatYear(date: string) {
  return date.slice(0, 4)
}

export function formatRuntime(runtime: number | null) {
  if (!runtime) return null

  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60

  if (hours === 0) return `${minutes}min`
  if (minutes === 0) return `${hours}h`

  return `${hours}h ${minutes}min`
}

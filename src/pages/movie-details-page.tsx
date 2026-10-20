import { useParams } from 'react-router'

export function MovieDetailsPage() {
  const { movieId } = useParams()

  return <p>{movieId}</p>
}

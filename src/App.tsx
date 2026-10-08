import { useEffect, useState } from "react"
import type { Movie } from "./types/movie"
import { getTrendingMovies } from "./api/movies"

export function App() {

  const [movie, setMovies] = useState<Movie[]>([])

  useEffect( () => {

    const carregarFilmes = async () => {
      const movies = await getTrendingMovies()
      setMovies(movies)
    } 

    carregarFilmes()
    
  }, [])

  return (
    <div>
      {movie.map((item: Movie) => (
        
        <h1 key={item.id}>{item.title}</h1>
      ))}
    </div>
  )
}

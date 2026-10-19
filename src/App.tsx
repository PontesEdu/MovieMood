import { Header } from './components/header'
import { TrendingMovies } from './components/trending-movies'

export function App() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <TrendingMovies />
      </main>
    </>
  )
}

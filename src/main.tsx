import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RootLayout } from './root-layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { HomePage } from './pages/home-page'
import { MovieDetailsPage } from './pages/movie-details-page'
import { NotFoundPage } from './pages/not-found-page'

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'movie/:movieId', Component: MovieDetailsPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
)

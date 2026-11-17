import { Outlet, ScrollRestoration } from 'react-router'
import { Header } from './components/header'
import { Footer } from './components/footer'

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

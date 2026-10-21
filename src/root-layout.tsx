import { Outlet, ScrollRestoration } from 'react-router'
import { Header } from './components/header'

export function RootLayout() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  )
}

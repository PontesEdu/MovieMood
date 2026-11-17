import { Outlet, ScrollRestoration } from 'react-router'
import { Header } from './components/header'

export function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  )
}

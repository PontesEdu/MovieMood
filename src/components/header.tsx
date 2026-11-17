import { NavLink } from 'react-router'
import { useWatchlist } from '../hooks/use-watchlist'

const NAV_LINK_CLASS =
  'text-muted-foreground hover:text-foreground aria-[current=page]:text-primary font-medium transition-colors'

export function Header() {
  const { movies } = useWatchlist()
  const count = movies.length

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-primary"
          >
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="M8 3v18M16 3v18M3 9h5M3 15h5M16 9h5M16 15h5" />
          </svg>
          <h1 className="font-display text-2xl font-bold">
            Movie<span className="text-primary">Mood</span>
          </h1>
        </div>

        <nav aria-label="Principal">
          <ul className="flex items-center gap-6">
            <li>
              <NavLink to="/" end className={NAV_LINK_CLASS}>
                Início
              </NavLink>
            </li>
            <li>
              <NavLink to="/descobrir" className={NAV_LINK_CLASS}>
                Descobrir
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/minha-lista"
                className={`${NAV_LINK_CLASS} flex items-center gap-2`}
              >
                Minha lista
                {count > 0 && (
                  <>
                    <span
                      aria-hidden="true"
                      className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-semibold"
                    >
                      {count}
                    </span>
                    <span className="sr-only">
                      , {count} {count === 1 ? 'filme salvo' : 'filmes salvos'}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

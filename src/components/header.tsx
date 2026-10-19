export function Header() {
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

        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <a href="/inicio">Início</a>
            </li>
            <li>
              <a href="/descobrir">Descobrir</a>
            </li>
            <li>
              <a href="/minha-lista">Minha lista</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

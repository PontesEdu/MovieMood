import type { ReactNode } from 'react'

type MovieGridProps = {
  children: ReactNode
}

export function MovieGrid({ children }: MovieGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-x-5 gap-y-7">
      {children}
    </div>
  )
}

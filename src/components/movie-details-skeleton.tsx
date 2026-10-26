export function MovieDetailsSkeleton() {
  return (
    <>
      <p className="sr-only">Carregando filme…</p>

      <div
        aria-hidden="true"
        className="bg-card animate-pulse overflow-hidden rounded-2xl"
      >
        <div className="flex flex-col gap-8 p-6 md:flex-row md:p-10">
          <div className="bg-background/60 aspect-2/3 w-48 shrink-0 rounded-xl md:w-56" />

          <div className="flex w-full max-w-2xl flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="bg-background/60 h-10 w-2/3 rounded-lg" />
              <div className="bg-background/60 h-4 w-1/2 rounded" />
            </div>

            <div className="bg-background/60 h-4 w-1/3 rounded" />

            <div className="flex gap-2">
              <div className="bg-background/60 h-7 w-24 rounded-full" />
              <div className="bg-background/60 h-7 w-20 rounded-full" />
              <div className="bg-background/60 h-7 w-28 rounded-full" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="bg-background/60 h-4 w-full rounded" />
              <div className="bg-background/60 h-4 w-full rounded" />
              <div className="bg-background/60 h-4 w-full rounded" />
              <div className="bg-background/60 h-4 w-3/4 rounded" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

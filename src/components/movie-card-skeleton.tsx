export function MovieCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-2">
      <div className="bg-card aspect-2/3 rounded-xl">
        <div></div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="bg-card h-4 w-3/4 rounded"></div>
        <div className="bg-card h-3 w-2/4 rounded"></div>
      </div>
    </div>
  )
}

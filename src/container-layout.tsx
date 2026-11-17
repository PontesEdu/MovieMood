import { Outlet } from 'react-router'

export function ContainerLayout() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Outlet />
    </div>
  )
}

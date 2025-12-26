import { Outlet } from "react-router-dom"
import { AppHeader } from "@/features/header"

export const App = () => {
  return (
    <div className="dark min-h-screen flex flex-col px-2 bg-background font-mono tracking-wide">
      <AppHeader />
      <Outlet />
    </div>
  )
}

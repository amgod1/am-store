import { AppHeader } from "@/features/header"
import { Outlet } from "react-router-dom"

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col px-2 bg-foreground font-mono tracking-wide">
      <AppHeader />
      <Outlet />
    </div>
  )
}

import { Outlet } from "react-router-dom"
import { AppHeader } from "@/features/header"
import { Player } from "@/features/player"

export const App = () => {
  return (
    <div className="dark min-h-screen flex flex-col px-2 bg-background font-mono tracking-wide">
      <AppHeader />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Player />
    </div>
  )
}

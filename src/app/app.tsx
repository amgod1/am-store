import { AppHeader } from "@/features/header"
import { Outlet } from "react-router-dom"

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col p-2">
      <AppHeader />
      <Outlet />
    </div>
  )
}

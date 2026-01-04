import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/shared/model/routes"
import { Button } from "@/shared/ui/kit/button"
import { Icon } from "@/shared/ui/kit/icon"
import { HeaderButtons } from "./ui/header-buttons"

export const AppHeader = () => {
  const navigate = useNavigate()

  const handleNavigate = (route: string) => () => navigate(route)

  return (
    <header className="py-3 sticky top-0 flex w-full items-center justify-between backdrop-blur-[8px] bg-background/60">
      <Button variant="icon" onClick={handleNavigate(ROUTES.BEATS)}>
        <Icon.Catalog size="2rem" />
      </Button>
      <HeaderButtons />
    </header>
  )
}

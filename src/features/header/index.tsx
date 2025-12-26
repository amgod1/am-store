import { PiSpeakerHifiFill } from "react-icons/pi"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/shared/model/routes"
import { Button } from "@/shared/ui/kit/button"

export const AppHeader = () => {
  const navigate = useNavigate()

  const handleNavigate = (route: string) => () => navigate(route)

  return (
    <header className="py-3 sticky top-0 flex w-full items-center justify-between backdrop-blur-[8px] bg-background/60">
      <Button variant="icon" onClick={handleNavigate(ROUTES.BEATS)}>
        <PiSpeakerHifiFill size="2rem" />
      </Button>
      <Button
        variant="default"
        onClick={handleNavigate(ROUTES.LOGIN)}
        className="cursor-pointer"
      >
        Login
      </Button>
    </header>
  )
}

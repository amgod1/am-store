import { PiSpeakerHifiFill } from "react-icons/pi"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/shared/model/routes"
import { Button } from "@/shared/ui/kit/button"

export const AppHeader = () => {
  const navigate = useNavigate()

  const handleNavigate = (route: string) => () => navigate(route)

  return (
    <header className="flex justify-between py-2 border-b-2 border-foreground">
      <Button
        variant="outline"
        size="icon"
        onClick={handleNavigate(ROUTES.BEATS)}
        className="cursor-pointer"
      >
        <PiSpeakerHifiFill width={"2rem"} />
      </Button>
      <Button onClick={handleNavigate(ROUTES.LOGIN)} className="cursor-pointer">
        Login
      </Button>
    </header>
  )
}

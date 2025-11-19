import { ROUTES } from "@/shared/model/routes"
import { Button } from "@/shared/ui/kit/button"
import { useNavigate } from "react-router-dom"
import { PiSpeakerHifiFill } from "react-icons/pi"

export const AppHeader = () => {
  const navigate = useNavigate()

  const handleNavigate = (route: string) => () => navigate(route)

  return (
    <header className="flex justify-between">
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

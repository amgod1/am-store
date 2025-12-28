import { useNavigate } from "react-router-dom"
import { useSession } from "@/shared/hooks/session"
import { ROUTES } from "@/shared/model/routes"
import { Button } from "@/shared/ui/kit/button"
import { Icon } from "@/shared/ui/kit/icon"

const HeaderButtons = () => {
  const navigate = useNavigate()
  const { session, logout } = useSession()

  const handleNavigate = (route: string) => () => navigate(route)

  return session ? (
    <div className="flex flex-row gap-2">
      <Button variant="icon" onClick={handleNavigate(ROUTES.PROFILE)}>
        <Icon.Profile size="2rem" />
      </Button>
      <Button variant="default" onClick={logout} className="cursor-pointer">
        Logout
      </Button>
    </div>
  ) : (
    <Button
      variant="default"
      onClick={handleNavigate(ROUTES.LOGIN)}
      className="cursor-pointer"
    >
      Login
    </Button>
  )
}

export default HeaderButtons

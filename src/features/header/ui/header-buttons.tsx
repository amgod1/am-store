import { IoMdCart as CartIcon } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/shared/model/routes"
import { useSession } from "@/shared/model/session"
import { Button } from "@/shared/ui/kit/button"

const HeaderButtons = () => {
  const navigate = useNavigate()
  const { session, logout } = useSession()

  const handleNavigate = (route: string) => () => navigate(route)

  return session ? (
    <div className="flex flex-row gap-2">
      <Button variant="icon" onClick={handleNavigate(ROUTES.PROFILE)}>
        <CartIcon size="2rem" />
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

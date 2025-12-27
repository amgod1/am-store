import { Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "@/shared/model/routes"
import { useSession } from "@/shared/model/session"

interface RouteGuardProps {
  children?: React.ReactNode
}

export const RouteGuard = ({ children }: RouteGuardProps) => {
  return <>{children}</>
}

RouteGuard.Private = () => {
  const { session } = useSession()

  return session ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />
}

RouteGuard.Public = () => {
  const { session } = useSession()

  return !session ? <Outlet /> : <Navigate to={ROUTES.BEATS} replace />
}

import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/model/routes"
import { AuthLayout } from "./auth-layout"
import { LoginForm } from "./login-form"

const LoginPage = () => {
  return (
    <AuthLayout
      title="Login"
      form={<LoginForm />}
      footerText={<Link to={ROUTES.REGISTER}>Don't have an account?</Link>}
    />
  )
}

export const Component = LoginPage

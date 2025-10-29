import { Link } from "react-router-dom"
import { AuthLayout } from "./auth-layout"
import { LoginForm } from "./login-form"
import { ROUTES } from "@/shared/model/routes"

const LoginPage = () => {
  return (
    <AuthLayout
      title="Login"
      description="Input email and password to login"
      form={<LoginForm />}
      footerText={
        <>
          Don't have an account? <Link to={ROUTES.REGISTER}>Register</Link>
        </>
      }
    />
  )
}

export const Component = LoginPage

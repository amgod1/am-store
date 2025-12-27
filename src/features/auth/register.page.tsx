import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/model/routes"
import { AuthLayout } from "./ui/auth-layout"
import { RegisterForm } from "./ui/register-form"

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Register"
      form={<RegisterForm />}
      footerText={<Link to={ROUTES.LOGIN}>Already have an account?</Link>}
    />
  )
}

export const Component = RegisterPage

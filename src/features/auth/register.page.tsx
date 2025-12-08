import { Link } from "react-router-dom"
import { AuthLayout } from "./auth-layout"
import { RegisterForm } from "./register-form"
import { ROUTES } from "@/shared/model/routes"

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Register"
      form={<RegisterForm />}
      footerText={
        <Link to={ROUTES.LOGIN}>Already have an account?</Link>
      }
    />
  )
}

export const Component = RegisterPage

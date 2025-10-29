import { Link } from "react-router-dom"
import { AuthLayout } from "./auth-layout"
import { RegisterForm } from "./register-form"
import { ROUTES } from "@/shared/model/routes"

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Register"
      description="Input email and password to register"
      form={<RegisterForm />}
      footerText={
        <>
          Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
        </>
      }
    />
  )
}

export const Component = RegisterPage

import { useNavigate } from "react-router-dom"
import { rqClient } from "@/shared/api/instance"
import type { ApiSchemas } from "@/shared/api/schema"
import { useSession } from "@/shared/hooks/session"
import { ROUTES } from "@/shared/model/routes"

export const useRegister = () => {
  const navigate = useNavigate()
  const session = useSession()

  const registerMutation = rqClient.useMutation("post", "/auth/register", {
    onSuccess(data) {
      session.login(data.idToken)
      navigate(ROUTES.HOME)
    },
  })

  const register = (data: ApiSchemas["RegisterRequest"]) => {
    registerMutation.mutate({ body: data })
  }

  const errorMessage = registerMutation.isError
    ? registerMutation.error.message
    : null

  return { register, isPending: registerMutation.isPending, errorMessage }
}

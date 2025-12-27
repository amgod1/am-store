import { useNavigate } from "react-router-dom"
import { rqClient } from "@/shared/api/instance"
import type { ApiSchemas } from "@/shared/api/schema"
import { ROUTES } from "@/shared/model/routes"
import { useSession } from "@/shared/model/session"

export const useLogin = () => {
  const navigate = useNavigate()
  const session = useSession()

  const loginMutation = rqClient.useMutation("post", "/auth/login", {
    onSuccess(data) {
      session.login(data.idToken)
      navigate(ROUTES.HOME)
    },
  })

  const login = (data: ApiSchemas["LoginRequest"]) => {
    loginMutation.mutate({ body: data })
  }

  const errorMessage = loginMutation.isError
    ? loginMutation.error.message
    : null

  return { login, isPending: loginMutation.isPending, errorMessage }
}

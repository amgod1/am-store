import { useNavigate } from "react-router-dom"
import { rqClient } from "@/shared/api/instance"
import { ApiSchemas } from "@/shared/api/schema"
import { useSession } from "@/shared/hooks/session"
import { ROUTES } from "@/shared/model/routes"

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

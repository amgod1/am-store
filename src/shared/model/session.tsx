import { createContext, useContext } from "react"

export interface SessionContextType {
  session: string | null
  login: (token: string) => void
  logout: () => void
}

export const SessionContext = createContext<SessionContextType | null>(null)

export const useSession = () => {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error("useSession must be used within SessionProvider")
  }

  return context
}

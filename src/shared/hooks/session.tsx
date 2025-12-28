import { createContext, ReactNode, useContext, useState } from "react"

export interface SessionContextType {
  session: string | null
  login: (token: string) => void
  logout: () => void
}

const SESSION_KEY = "SESSION"

const SessionContext = createContext<SessionContextType | null>(null)

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<string | null>(
    localStorage.getItem(SESSION_KEY) || null,
  )

  const login = (data: string) => {
    localStorage.setItem(SESSION_KEY, data)
    setSession(data)
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setSession(null)
  }

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error("useSession must be used within SessionProvider")
  }

  return context
}

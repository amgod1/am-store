import { ReactNode, useState } from "react"
import { SessionContext } from "@/shared/model/session"

const SESSION_KEY = "SESSION"

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

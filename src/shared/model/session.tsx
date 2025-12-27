import { useState } from "react"

const SESSION_KEY = "SESSION"

export const useSession = () => {
  const [session, setSession] = useState<string | null>(
    localStorage.getItem(SESSION_KEY) || null,
  )

  const login = (data: string) => {
    setSession(data)
    localStorage.setItem(SESSION_KEY, data)
  }
  const logout = () => {
    setSession(null)
    localStorage.removeItem(SESSION_KEY)
  }

  return { session, login, logout }
}

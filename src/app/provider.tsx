import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/shared/api/query-client"
import { PlayerProvider } from "@/shared/hooks/player"
import { SessionProvider } from "@/shared/hooks/session"

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PlayerProvider>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </PlayerProvider>
  )
}

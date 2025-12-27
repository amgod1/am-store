import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/shared/api/query-client"
import { SessionProvider } from "./session-provider"

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}

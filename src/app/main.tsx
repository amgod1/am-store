import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./router.tsx"
import "./index.css"
import { enableMocking } from "@/shared/api/mocks"

enableMocking().then(() => {
  // biome-ignore lint/style/noNonNullAssertion: basic app render
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
})

import { createBrowserRouter, redirect } from "react-router-dom"
import { ROUTES } from "../shared/model/routes"
import { App } from "./app"
import { Providers } from "./providers"

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/auth/login.page"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/features/auth/register.page"),
      },
      {
        path: ROUTES.BEATS,
        lazy: () => import("@/features/beats/beats.page"),
      },
      {
        path: ROUTES.BEAT,
        lazy: () => import("@/features/beat/beat.page"),
      },
      {
        path: ROUTES.PROFILE,
        lazy: () => import("@/features/profile/profile.page"),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.BEATS),
      },
    ],
  },
])

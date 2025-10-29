import "react-router-dom"

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  BEATS: "/beats",
  BEAT: "/beats/:beatId",
  PROFILE: "/profile",
} as const

export type PathParams = {
  [ROUTES.BEATS]: {
    beatId: string
  }
}

declare module "react-router-dom" {
  interface Register {
    params: PathParams
  }
}

import { delay, HttpResponse } from "msw"
import type { ApiSchemas } from "../../schema"
import { http } from "../http"
import {
  createRefreshTokenCookie,
  generateTokens,
  verifyToken,
} from "../session.ts"

const mockUsers: ApiSchemas["User"][] = [{ uid: "1", email: "admin@gmail.com" }]

const userPasswords = new Map<string, string>([["admin@gmail.com", "123456"]])

// DRY helper for returning errors
function errorResponse(message: string, code: string, status: number) {
  return HttpResponse.json<ApiSchemas["Error"]>({ message, code }, { status })
}

export const authHandlers = [
  http.post("/auth/login", async ({ request }) => {
    const { email, password } = await request.json()
    const user = mockUsers.find((u) => u.email === email)
    const storedPassword = userPasswords.get(email)

    await delay()

    if (!user || storedPassword !== password) {
      return errorResponse(
        "Invalid login or password",
        "INVALID_CREDENTIALS",
        401,
      )
    }

    const { accessToken: idToken, refreshToken } = await generateTokens({
      userId: user.uid,
      email: user.email,
    })

    return HttpResponse.json(
      { idToken, refreshToken, expiresIn: 3600, user },
      {
        status: 200,
        headers: { "Set-Cookie": createRefreshTokenCookie(refreshToken) },
      },
    )
  }),
  http.post("/auth/register", async ({ request }) => {
    const { email, password } = await request.json()
    await delay()

    if (mockUsers.some((u) => u.email === email)) {
      return errorResponse("User already exists", "USER_EXISTS", 409)
    }

    const newUser: ApiSchemas["User"] = {
      uid: String(mockUsers.length + 1),
      email,
    }
    mockUsers.push(newUser)
    userPasswords.set(email, password)

    const { accessToken: idToken, refreshToken } = await generateTokens({
      userId: newUser.uid,
      email: newUser.email,
    })

    return HttpResponse.json(
      { idToken, refreshToken, expiresIn: 3600, user: newUser },
      {
        status: 201,
        headers: { "Set-Cookie": createRefreshTokenCookie(refreshToken) },
      },
    )
  }),

  http.post("/auth/token/refresh", async ({ cookies }) => {
    const refreshToken = cookies.refreshToken

    if (!refreshToken) {
      return errorResponse(
        "Refresh token not found",
        "REFRESH_TOKEN_MISSING",
        401,
      )
    }

    try {
      const session = await verifyToken(refreshToken)
      const user = mockUsers.find((u) => u.uid === session.userId)

      if (!user) {
        return errorResponse("User not found", "USER_NOT_FOUND", 401)
      }

      const { accessToken: idToken, refreshToken: newRefreshToken } =
        await generateTokens({
          userId: user.uid,
          email: user.email,
        })

      return HttpResponse.json(
        { idToken, refreshToken: newRefreshToken, expiresIn: 3600, user },
        {
          status: 200,
          headers: { "Set-Cookie": createRefreshTokenCookie(newRefreshToken) },
        },
      )
    } catch {
      return errorResponse(
        "Invalid refresh token",
        "INVALID_REFRESH_TOKEN",
        401,
      )
    }
  }),
]

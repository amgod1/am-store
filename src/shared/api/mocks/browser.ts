import { setupWorker } from "msw/browser"
import { authHandlers } from "./handlers/auth"
import { beatsHandlers } from "./handlers/beats"

export const worker = setupWorker(...authHandlers, ...beatsHandlers)

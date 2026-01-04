import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPath from "vite-tsconfig-paths"

// https://vite.dev/config/
// biome-ignore lint/style/noDefaultExport: vite config setup
export default defineConfig({
  plugins: [react(), tsconfigPath(), tailwindcss()],
})

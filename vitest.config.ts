import { defineConfig } from 'vitest'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    alias: {
      "@": "/Users/a/.cline/data/workspaces/chat/112market/src",
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: "/Users/a/.cline/data/workspaces/chat/112market/src" },
    ],
  },
})

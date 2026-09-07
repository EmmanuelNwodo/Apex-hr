import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    css: false,
    // Per CLAUDE.md section 8: unit tests live under tests/unit/, not
    // co-located next to source files.
    include: ["tests/unit/**/*.test.{ts,tsx}"],
  },
});

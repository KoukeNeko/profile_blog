import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.otf'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'build', // Output directory for build files
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
      },
    },
  },
  server: {
    port: 3000,
  }
})

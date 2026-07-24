import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: https://m7moud2.github.io/docker-presentation/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/docker-presentation/' : '/',
})

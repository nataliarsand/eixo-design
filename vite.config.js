import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/eixo-design/', // IMPORTANT: match your repo name!
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const page = (p) => fileURLToPath(new URL(p, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        construction: page('./construction/index.html'),
        solar: page('./solar/index.html'),
        commercialProperty: page('./commercial-property/index.html'),
      },
    },
  },
})

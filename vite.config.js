import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/studio/',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
      },
    },
  },
})

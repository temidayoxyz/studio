import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/studio/',
  build: {
    target: 'es2022',
    assetsInlineLimit: 2048,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        method: resolve(__dirname, 'method.html'),
        about: resolve(__dirname, 'about.html'),
        notfound: resolve(__dirname, '404.html'),
      },
    },
  },
})

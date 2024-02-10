import { defineConfig } from "vite"
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        admin: resolve(__dirname, 'src/pages/admin-prueba.html'),
        prueba: resolve(__dirname, 'src/pages/prueba.html')
      }
    }
  }
})
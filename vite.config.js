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
        prueba: resolve(__dirname, 'src/pages/prueba.html'),
        form_alumno: resolve(__dirname, 'src/pages/form-alumno.html'),
        form_profesor: resolve(__dirname, 'src/pages/form-profesor.html'),
        form_admin: resolve(__dirname, 'src/pages/form-admin.html'),
        alumno_estadistica: resolve(__dirname, 'src/pages/alumno-estadistica.html'),
        alumno_matricula: resolve(__dirname, 'src/pages/alumno-matricula.html'),
        alumno_certificado: resolve(__dirname, 'src/pages/alumno-certificado.html'),
        vista_profesor: resolve(__dirname, 'src/pages/vista-profesor.html'),
        vista_admin: resolve(__dirname, 'src/pages/vista-admin.html')
      }
    }
  }
})
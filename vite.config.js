import { defineConfig } from "vite"
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        admin_ciclos: resolve(__dirname, 'src/pages/admin-ciclos.html'),
        admin_cursos: resolve(__dirname, 'src/pages/admin-cursos.html'),
        admin_horario: resolve(__dirname, 'src/pages/admin-horario.html'),
        admin_profesores: resolve(__dirname, 'src/pages/admin-profesores.html'),
        admin_temas: resolve(__dirname, 'src/pages/admin-temas.html'),
        alumno_certificado: resolve(__dirname, 'src/pages/alumno-certificado.html'),
        alumno_estadistica: resolve(__dirname, 'src/pages/alumno-estadistica.html'),
        alumno_matricula: resolve(__dirname, 'src/pages/alumno-matricula.html'),
        form_admin: resolve(__dirname, 'src/pages/form-admin.html'),
        form_alumno: resolve(__dirname, 'src/pages/form-alumno.html'),
        form_profesor: resolve(__dirname, 'src/pages/form-profesor.html'),
        profesor_asistencia: resolve(__dirname, 'src/pages/profesor-asistencia.html'),
        profesor_cursos_notas: resolve(__dirname, 'src/pages/profesor-cursos-notas.html'),
        profesor_horarios_asistencia: resolve(__dirname, 'src/pages/profesor-horarios-asistencia.html'),
        profesor_notas_form: resolve(__dirname, 'src/pages/profesor-notas-form.html'),
        profesor_notas: resolve(__dirname, 'src/pages/profesor-notas.html'),
      }
    }
  }
})
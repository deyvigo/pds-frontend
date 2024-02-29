import './../css/style.css'

window.addEventListener('load', async () => {
  const data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    location.href = '/'
  }

  await setCoursesAproved()
  sendToCertificate()
})

const fetchCourses = async () => {
  const idAlumno = JSON.parse(localStorage.getItem('data')).id
  const token = JSON.parse(localStorage.getItem('data')).token

  const API_URL = `https://pds-backend-gdj3.onrender.com/fichanota/alumno/${idAlumno}`

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    }
  })

  return response
}

const setCoursesAproved = async () => {
  
  const response = await fetchCourses()

  if (response.status === 404) {

    return
  }

  const json = await response.json()

  const aproved = json.filter(c => c.promedio >= 10.5)

  const tabla = document.getElementById('certificados-container')

  aproved.forEach(a => {
    const fechaInicio = a.fecha_inicio
    const fechaFinal = a.fecha_final
    tabla.innerHTML += `
      <div class="w-full border-2 border-black rounded-xl bg-[#12372A]">
        <div class="w-full p-2">
          <h1 class="indent-2 text-xl font-bold text-white">${a.curso}</h1>
          <p class="indent-4 font-semibold text-[#DBE7C9]">Promedio: <span>${Math.round(a.promedio)}</span></p>
          <p class="indent-4 font-semibold text-[#DBE7C9]">Ciclo: <span>${a.ciclo}</span></p>
          <p class="indent-4 font-semibold text-[#DBE7C9]">Fecha Inicio: <span>${fechaInicio.split('T')[0]}</span></p>
          <p class="indent-4 font-semibold text-[#DBE7C9]">Fecha Fin: <span>${fechaFinal.split('T')[0]}</span></p>
          <div class="w-full flex justify-end px-4">
            <button id="${a.id_curso + '_' + a.id_ciclo}" class="certificate-btn hover:scale-[1.02] transition-all ease-in-out border-2 border-[#DBE7C9] rounded-md px-2 text-white">Generar certificado</button>
          </div>
        </div>
      </div>
    `
  })
}

const sendToCertificate = async () => {

  const response = await fetchCourses()

  const json = await response.json()

  const nombres = JSON.parse(localStorage.getItem('data')).nombres + ' ' + JSON.parse(localStorage.getItem('data')).apellidos
  const token = JSON.parse(localStorage.getItem('data')).token

  const btn = document.querySelectorAll('.certificate-btn')
  btn.forEach(b => {
    b.addEventListener('click', async () => {
      const curso = json.find(c => c.id_curso === parseInt(b.id.split('_')[0]) && c.id_ciclo === parseInt(b.id.split('_')[1]))
      const fechaInicio = curso.fecha_inicio 
      const fechaFinal = curso.fecha_final
      
      const data = {
        nombres,
        id: curso.id_curso,
        fechaInicio: fechaInicio.split('T')[0],
        fechaFinal: fechaFinal.split('T')[0],
      }

      console.log(data)
      
      const API_URL = 'https://pds-backend-gdj3.onrender.com/certificado'

      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'mode': 'cors'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.blob())
      .then(blob => {
        const urlImg = URL.createObjectURL(blob)
        const newWindow = window.open('', '_blank')

        newWindow.document.write(`
          <html lang="es">
          <head>
            <title>Certificado</title>
          </head>
          <body style="display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
            <img src="${urlImg}" alt="Certificado" />
          </body> 
        `
        )
      })
    })
  })
}

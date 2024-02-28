import './../css/style.css'

window.addEventListener('load', async () => {
  const data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    location.href = '/'
  }

  const idHorario = JSON.parse(localStorage.getItem('idHorario'))

  await setAlumns(idHorario)
  sendAsistencia()
})

const setAlumns = async (idHorario) => {

  const token = JSON.parse(localStorage.getItem('data')).token

  const API_URL = `https://pds-backend-gdj3.onrender.com/horario/alumno/${idHorario}`

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    },
  })

  if (!response.ok) {
    alert('Error al obtener los alumnos')
    return
  }

  const form = document.getElementById('asistencia-container')

  const json = await response.json()

  if (json.length === 0) {
    form.innerHTML = '<h1>No hay alumnos registrados</h1>'
    return
  }

  json.forEach(a => {
    form.innerHTML += `
      <div class="w-full flex justify-between px-2">
        <div class="w-[90%] flex items-center">
          <h1 class="indent-2">${a.nombres} ${a.apellidos}</h1>
        </div>
        <div class="w-[10%] flex items-center font-bold">
          <input checked type="radio" value="P" name="${a.id_alumno}_${a.id_horario}" class="w-[20px]">
          <input type="radio" value="T" name="${a.id_alumno}_${a.id_horario}" class="w-[20px]">
          <input type="radio" value="J" name="${a.id_alumno}_${a.id_horario}" class="w-[20px]">
          <input type="radio" value="F" name="${a.id_alumno}_${a.id_horario}" class="w-[20px]">
        </div>
      </div>
      <hr>
    `
  })

  form.innerHTML += `
    <div class="w-full flex items-center justify-center">
      <button id="btn-asistencia" class="w-[20%] text-center font-bold p-2 border-2 border-red-500 rounded-lg">Enviar Asistencia</button>
    </div>
  `
}

const sendAsistencia = async () => {
  const btnAsistencia = document.getElementById('btn-asistencia')
  const formAsistencia = document.getElementById('asistencia-container')

  btnAsistencia.addEventListener('click', async (e) => {
    e.preventDefault()

    const values = Array.from(formAsistencia.querySelectorAll('input:checked')).map(i => i.value)
    const idHorarios = Array.from(formAsistencia.querySelectorAll('input:checked')).map(i => i.name.split('_').pop())
    const idAlumnos = Array.from(formAsistencia.querySelectorAll('input:checked')).map(i => i.name.split('_').shift())

    const fechaActual = new Date()
    const fecha = `${fechaActual.getFullYear()}-${fechaActual.getMonth() + 1}-${fechaActual.getDate()}`

    const token = JSON.parse(localStorage.getItem('data')).token
    
    const API_URL = 'https://pds-backend-gdj3.onrender.com/asistencia'

    const data = {
      data: values.map((a, index) => ({
        idAlumno: idAlumnos[index],
        idHorario: idHorarios[index],
        asistencia: a,
        fecha: fecha
      }))
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'mode': 'cors'
      },
      body: JSON.stringify(data)
    })

    const json = await response.json()
    console.log(json.errors)

    if (!response.ok) {
      alert('Error al enviar la asistencia')
      return
    }

    alert('Asistencia enviada')
    location.href = 'profesor-horarios-asistencia.html'
  })
}
import './../css/style.css'

window.addEventListener('load', async () =>{
  const data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    location.href = '/'
  }

  await setCourses()
  redirectToAsistencia()
})

const setCourses = async () => {
  const horariosContainer = document.getElementById('horarios-container')

  const token = JSON.parse(localStorage.getItem('data')).token
  const idProfesor = JSON.parse(localStorage.getItem('data')).id

  const API_URL = `http://localhost:3210/horario/profesor/${idProfesor}`

  const response = await fetch(API_URL,  {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    }
  })

  if (response.status === 404) {
    horariosContainer.innerHTML = '<h1 class="font-bold" >No hay horarios registrados</h1>'
    return
  }

  if (!response.ok) {
    alert('Error al obtener los horarios')
    return
  }

  const json = await response.json()

  json.forEach(c => {
    horariosContainer.innerHTML += `
      <div href="./profesor-asistencia.html" id="h_${c.id_horario}" class="cursor-pointer div-redirect w-full flex h-[40px] px-2">
        <div class="w-full flex items-center justify-between font-bold">
          <p class="w-[20%] text-center">${c.codigo_curso}</p>
          <p class="w-[20%] text-center">${c.nombre}</p>
          <p class="w-[20%] text-center">${c.ciclo}</p>
          <p class="w-[20%] text-center">${c.dia_semana}</p>
        </div>
      </div>
      <hr>
    `
  })
}

const redirectToAsistencia = () => {

  const divs = document.querySelectorAll('.div-redirect')

  divs.forEach(d => {
    d.addEventListener('click', () => {
      localStorage.setItem('idHorario', d.id.split('_').pop())
      location.href = './profesor-asistencia.html'
    })
  })
}
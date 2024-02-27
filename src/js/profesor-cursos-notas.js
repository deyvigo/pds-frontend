import './../css/style.css'

window.addEventListener('load', async () => {
  const data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    location.href = '/'
  }

  const idProfesor = data.id

  await showThemes(idProfesor)

})


const showThemes = async (idProfesor) => {
  const API_URL = `http://localhost:3210/curso/${idProfesor}`
  const token = JSON.parse(localStorage.getItem('data')).token
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    }
  })
  
  const table = document.getElementById('cursos-container')

  if (response.status === 404) {
    table.innerHTML = '<h1 class="font-bold" >No hay cursos registrados</h1>'
    return
  }

  if (!response.ok) {
    alert('Error al obtener los cursos')
    return
  }

  const json = await response.json()


  json.forEach(c => {
    table.innerHTML += `
      <div onclick="sendToNotes(${c.id_curso})" class="cursor-pointer hover:scale-[1.02] hover:bg-sky-400 transition-all ease-in-out w-[95%] flex h-[40px] justify-between px-2 border-2 border-[#12372A] rounded-lg">
        <div class="w-[90%] flex items-center">
          <h1 class="indent-2 font-bold">${c.curso}</h1>
        </div>
        <div class="w-[10%] flex items-center font-bold">

        </div>
      </div>
      <hr>
    `
  })
}

const sendToNotes = (idCurso) => {
  localStorage.setItem('idCurso', idCurso)
  location.href = './profesor-notas.html'
}

window.sendToNotes = sendToNotes
import './../css/style.css'

window.addEventListener('load', async () => {
  const data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    location.href = '/'
  }

  const idProfesor = data.id
  const idCurso = JSON.parse(localStorage.getItem('idCurso'))
  await showThemes(idCurso, idProfesor)

  // finalmente
  // localStorage.removeItem('idCurso') en la siguiente página se puede borrar para que cuandoa actualice no desaparezcan los datos
})

const showThemes = async (idCurso, idProfesor) => {
  const API_URL = `http://localhost:3210/tema/curso/${idCurso}/${idProfesor}`
  const token = JSON.parse(localStorage.getItem('data')).token

  const table = document.getElementById('temas-container')

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    }
  })

  if (!response.ok) {
    alert('Error al obtener los temas')
    return
  }

  const json = await response.json()

  json.forEach(t => {
    table.innerHTML += `
      <section class="w-full flex flex-col gap-2">
        <div class="flex flex-col gap-2">
          <h1 onclick="sendToFormNotes(${t.id_tema}, '${t.nombre}')" class="cursor-pointer indent-4 font-semibold">${t.nombre}</h1>
          <hr>
        </div>
      </section>
    `
  })
}

const sendToFormNotes = (idTema, nombre) => {
  localStorage.setItem('tema', JSON.stringify({ idTema, nombre }))
  location.href = './profesor-notas-form.html'
}

window.sendToFormNotes = sendToFormNotes

import './../css/style.css'

window.addEventListener('load', async () => {
  const data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    location.href = '/'
  }

  const idProfesor = data.id
  const idCurso = JSON.parse(localStorage.getItem('idCurso'))
  const tema = JSON.parse(localStorage.getItem('tema'))
  await setAlumns(idCurso, idProfesor, tema)
  sendNotes(tema, idProfesor)
  
})

const setAlumns = async (idCurso, idProfesor, tema) => {

  const API_URL = `http://localhost:3210/alumno/curso/${idCurso}/${idProfesor}`
  const token = JSON.parse(localStorage.getItem('data')).token

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    }
  })

  if (!response.ok) {
    alert('Error al obtener los alumnos')
    return
  }

  const tableForm = document.getElementById('alumnos-container')

  const nameCiclo = document.getElementById('nameCiclo')
  const nameTema = document.getElementById('name-tema')
  
  const json = await response.json()
  
  nameCiclo.innerHTML = json[0].ciclo
  nameTema.innerHTML = tema.nombre

  json.forEach(a => {
    tableForm.innerHTML += `
      <section class="w-full px-2 flex justify-between items-center h-[40px]">
        <div id="${a.id_alumn}_${a.id_ciclo}" class="font-semibold w-[70%]">${a.nombres} ${a.apellidos}</div>
        <div id="notes-form" class="w-[30%] justify-end flex font-bold">
          <input type="text" class="w-[15%] text-center border-2 border-[#12372A] rounded-md outline-none"></input>
          <input type="text" class="w-[15%] text-center border-2 border-[#12372A] rounded-md outline-none"></input>
          <input type="text" class="w-[15%] text-center border-2 border-[#12372A] rounded-md outline-none"></input>
          <input type="text" class="w-[15%] text-center border-2 border-[#12372A] rounded-md outline-none"></input>
          <input type="text" class="w-[15%] text-center border-2 border-[#12372A] rounded-md outline-none"></input>
          <input type="text" class="w-[15%] text-center border-2 border-[#12372A] rounded-md outline-none"></input>
        </div>
      </section>
      <hr>
    `
  })

  tableForm.innerHTML += `
    <div class="w-full flex items-center justify-center">
      <button id="sendCalification" class="w-[20%] border-2 border-sky-500 rounded-md font-bold">Enviar</button>
    </div>
  `
}

const sendNotes = async (tema, idProfesor) => {
  const btn = document.getElementById('sendCalification')

  const form = document.getElementById('alumnos-container')

  btn.addEventListener('click', async (e) => {
    e.preventDefault()

    const alumnos = Array.from(form.querySelectorAll('section'))
    const data = {
      data: alumnos.map(a => ({
        idAlumno: a.querySelector('div').id.split('_').shift(),
        idTema: tema.idTema,
        idCiclo: a.querySelector('div').id.split('_').pop(),
        notaEvaOral:  a.querySelectorAll('input')[0].value,
        notaEvaEscrita:  a.querySelectorAll('input')[1].value,
        puntosTiempo:  a.querySelectorAll('input')[2].value,
        puntosHabComu:  a.querySelectorAll('input')[3].value,
        puntosEstructura:  a.querySelectorAll('input')[4].value,
        puntosContenido:  a.querySelectorAll('input')[5].value,
        idProfesor: idProfesor
      }))
    }

    const API_URL = 'http://localhost:3210/fichanota'

    const token = JSON.parse(localStorage.getItem('data')).token

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'mode': 'cors'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      alert('Error al enviar las notas')
      return
    }

    alert('Notas enviadas correctamente')
    location.href = './profesor-cursos-notas.html'
  })
}
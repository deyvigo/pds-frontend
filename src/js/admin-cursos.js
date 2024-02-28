import './../css/style.css'

window.addEventListener('load', async () => {
  const data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    location.href = '/'
  }

  showCourses()
})

const showCourses = async () => {
  const API_URL = 'http://localhost:3210/curso'

  const token = JSON.parse(localStorage.getItem('data')).token

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    }
  })

  const json = await response.json()

  if (json.error) {
    alert(json.error)
    return
  }

  const tabla = document.getElementById('tabla-cursos')

  json.curso.forEach(c => {
    tabla.innerHTML += `
      <div class="flex w-full gap-2 items-center hover:bg-gray-50 transition-colors">
        <div class="flex w-full gap-2 items-center text-center justify-around border-t h-[50px]">
          <p class="w-[20%] font-semibold">${c.codigo_curso}</p>
          <p class="w-[20%] font-normal">${c.nombre}</p>
          <p class="w-[20%] font-normal">${c.nivel}</p>
          <p class="w-[20%] font-normal">${c.requisito??'No Requisito'}</p>
        </div>
      </div>
    `
  })

  setOptions(json.curso)
}

const setOptions = async (data) => {
  const select = document.getElementById('requisito')

  data.forEach(c => {
    select.innerHTML += `
      <option value="${c.id_curso}">${c.nombre}</option>
    `
  })
}

const createBtn = document.getElementById('create-course')

createBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  
  const API_URL = 'http://localhost:3210/curso'
  const token = JSON.parse(localStorage.getItem('data')).token

  const codigo = document.getElementById('codigo').value
  const nombre = document.getElementById('nombre').value
  const nivel = document.getElementById('nivel').value
  const requisito = document.getElementById('requisito').value === '' ? null : document.getElementById('requisito').value
  const idCreador = JSON.parse(localStorage.getItem('data')).id

  const data = {
    codigo,
    nombre,
    nivel,
    requisito,
    idCreador
  }
  console.log(data)

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    },
    body: JSON.stringify(data)
  })

  if (response.ok) {
    alert('Curso creado')
    location.reload()
  }
})
import './../css/style.css'

window.addEventListener('load', async () => {
  const data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    location.href = '/'
  }

  await showThemes()

  dropAnimation()
})

const showThemes = async () => {
  const API_URL = 'http://localhost:3210/tema'
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
    alert('No se pudo obtener los temas')
    return 
  }

  const json = await response.json()

  const tabla = document.getElementById('tabla-temas')

  json.curso.forEach(c => {
    let component = `
      <div class="flex flex-col w-full gap-2 items-center">
        <div class="drop-bottom cursor-pointer border-2 rounded-lg bg-[#436850] w-full h-[50px] flex items-center">
          <h1 class=" text-white indent-4 font-bold text-xl">${c.nombre}</h1>
        </div>
        <div class="drop-box sr-only transition-all duration-200 ease-in-out flex flex-col w-[80%] gap-2 items-center justify-around">
    `

    c.temas.forEach(t => {
      component += `
        <div class="w-full flex items-center h-[50px] border-t">
          <p class="w-[30%] font-semibold indent-4">${t.nombre}</p>
          <p class="w-[70%] font-normal indent-4">${t.descripcion}</p>
        </div>
      `
    })

    component += `
        </div>
      </div>
    `

    tabla.innerHTML += component
  })

  setOptions(json.curso)
}

const dropAnimation = () => {
  const dropBottoms = document.querySelectorAll('.drop-bottom')

  dropBottoms.forEach(d => {
    d.addEventListener('click', () => {
      const dropBox = d.nextElementSibling
      console.log(d.parentElement)
      if (dropBox.classList.contains('sr-only')) {
        dropBox.classList.remove('sr-only')
      } else {
        dropBox.classList.add('sr-only')
      }
    })
  })
}

const setOptions = (values) => {
  const select = document.getElementById('curso')

  values.forEach(c => {
    select.innerHTML += `
      <option value="${c.id_curso}">${c.nombre}</option>
    `
  })
}

const createBtn = document.getElementById('create-theme')

createBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  
  const API_URL = 'http://localhost:3210/tema'
  const token = JSON.parse(localStorage.getItem('data')).token

  const nombre = document.getElementById('nombre').value
  const descripcion = document.getElementById('descripcion').value
  const idCurso = document.getElementById('curso').value

  const data = {
    nombre,
    descripcion,
    idCurso
  }

  if (nombre === '' || descripcion === '') {
    alert('Llene todos los campos')
    return
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

  if (response.ok) {
    alert('Tema Creado')
    location.reload()
  }
})

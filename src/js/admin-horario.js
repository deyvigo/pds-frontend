import './../css/style.css'

window.addEventListener('load', async () => {
  const data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    location.href = '/'
  }

  await showHorarios()
  await setOptions()
  dropAnimation()
})


const showHorarios = async () => {
  const API_URL = 'http://localhost:3210/horario'
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
    alert('No se pudo obtener los horarios')
    return 
  }

  const json = await response.json()

  let tabla = document.getElementById('tabla-horarios')

  json.cursos.forEach(c => {
    let element = `
      <div class="flex flex-col w-full gap-2 items-center">
        <div class="drop-bottom cursor-pointer bg-[#436850] rounded-lg  w-full h-[50px] flex items-center">
          <h1 class="text-white indent-4 font-bold text-xl">${c.nombre}</h1>
        </div>
        <div class="drop-box sr-only transition-all duration-200 ease-in-out flex flex-col w-[95%] items-center justify-around">
          <div class="w-full flex">

            <div class="w-[85%] flex items-center h-[50px] hover:bg-gray-100 transition-colors">
              <p class="w-[20%] font-bold indent-4">Dia Semana</p>
              <p class="w-[20%] font-bold indent-4">Hora Inicio</p>
              <p class="w-[20%] font-bold indent-4">Hora Final</p>
              <p class="w-[20%] font-bold indent-4">Profesor</p>
              <p class="w-[20%] font-bold indent-4">Estado</p>
            </div>
            <div class="flex items-center w-[15%] justify-center">
              <div class="w-1/2 flex items-center justify-center">
                <p class="text-center font-bold">Cambiar Estado</p>
              </div>
              <div class="w-1/2 flex items-center justify-center">
                <button class="sr-only border-2 border-green-600  rounded-md p-1 font-semibold">Enviar</button>
              </div>
            </div>

          </div>

          
    `

    c.horarios.forEach(h => {
      let estados = ['activo', 'inactivo', 'en curso', 'finalizado']
      let newEstados = estados.filter(e => e !== h.estado)
      element += `
            <div class="w-full flex">
              <div class="w-[85%] flex items-center h-[50px] border-t hover:bg-gray-100 transition-colors">
                <p class="w-[20%] font-normal indent-4">${h.dia_semana}</p>
                <p class="w-[20%] font-normal indent-4">${h.hora_inicio}</p>
                <p class="w-[20%] font-normal indent-4">${h.hora_final}</p>
                <p class="w-[20%] font-normal indent-4">${h.profesor[0].nombres}</p>
                <p class="w-[20%] font-normal indent-4">${h.estado}</p>
              </div>
              <div class="flex items-center w-[15%] justify-center">
                <div class="w-1/2 flex items-center justify-center">
                  <select class="required w-[90%]" name="" id="estado">
                    <option value="${h.id_horario + '_' + newEstados[0] + '_' + h.id_ciclo}">${newEstados[0]}</option>
                    <option value="${h.id_horario + '_' + newEstados[1] + '_' + h.id_ciclo}">${newEstados[1]}</option>
                    <option value="${h.id_horario + '_' + newEstados[2] + '_' + h.id_ciclo}">${newEstados[2]}</option>
                  </select>
                </div>
                <div class="w-1/2 flex items-center justify-center">
                  <button onclick="changeStatus(this)" class="font-semibold border-2 border-green-600 rounded-md p-1">Enviar</button>
                </div>
              </div>
          
            </div>
      `
    })

    element += `
        </div>
      </div>
    `

    tabla.innerHTML += element
  })
}

const dropAnimation = () => {
  const dropBottoms = document.querySelectorAll('.drop-bottom')

  dropBottoms.forEach(d => {
    d.addEventListener('click', () => {
      const dropBox = d.nextElementSibling
      if (dropBox.classList.contains('sr-only')) {
        dropBox.classList.remove('sr-only')
      } else {
        dropBox.classList.add('sr-only')
      }
    })
  }) 
}

// parentElement.parentElement.children[0].children[0].value

const changeStatus = async (e) => {
  const select = e.parentElement.parentElement.children[0].children[0].value  // xd
  const idHorario = select.split('_').shift()
  const estado = select.split('_')[1]
  const idCiclo = select.split('_').pop()

  const API_URL = 'http://localhost:3210/horario'
  const token = JSON.parse(localStorage.getItem('data')).token

  const data = {
    idHorario,
    estado,
    idCiclo
  }

  console.log(data)

  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    alert('No se pudo cambiar el estado')
    return 
  }

  alert('Se cambio el estado')
  location.reload()
}

const setOptions = async () => {
  const selectCiclo = document.getElementById('ciclo')
  const selectCurso = document.getElementById('curso')
  const selectProfesor = document.getElementById('profesor')
  
  const token = JSON.parse(localStorage.getItem('data')).token

  const API_URL_CICLO = 'http://localhost:3210/ciclo'
  const API_URL_CURSO = 'http://localhost:3210/curso'
  const API_URL_PROFESOR = 'http://localhost:3210/profesor/activos'

  const responseCiclo = await fetch(API_URL_CICLO, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    }
  })

  const responseCurso = await fetch(API_URL_CURSO, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    }
  })

  const responseProfesor = await fetch(API_URL_PROFESOR, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    }
  })

  const jsonCiclo = await responseCiclo.json()
  const jsonCurso = await responseCurso.json()
  const jsonProfesor = await responseProfesor.json()

  jsonCiclo.forEach(c => {
    selectCiclo.innerHTML += `<option value="${c.id_ciclo}">${c.ciclo}</option>`
  })

  jsonCurso.curso.forEach(c => {
    selectCurso.innerHTML += `<option value="${c.id_curso}">${c.nombre}</option>`
  })

  jsonProfesor.forEach(p => {
    selectProfesor.innerHTML += `<option value="${p.id_profesor}">${p.nombres}</option>`
  })
}

const createBtn = document.getElementById('create-horario')

createBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  const ciclo = document.getElementById('ciclo').value
  const idCurso = document.getElementById('curso').value
  const idProfesor = document.getElementById('profesor').value
  const dia = document.getElementById('dia').value
  const horaInicio = document.getElementById('hora-inicio').value
  const horaFinal = document.getElementById('hora-final').value

  const API_URL = 'http://localhost:3210/horario'
  const token = JSON.parse(localStorage.getItem('data')).token

  const data = {
    ciclo,
    idCurso,
    estado: 'inactivo',
    idProfesor,
    dia,
    horaInicio,
    horaFinal
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

  if (!response.ok) {
    alert('No se pudo crear el horario')
    return 
  }

  alert('Se creo el horario')
  location.reload()
})

window.changeStatus = changeStatus

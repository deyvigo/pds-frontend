import './../css/style.css';

window.addEventListener('load', async () => {
  const data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    location.href = '/'
  }

  await getHorarios()

  changeColor()
  RestrictionForm()
})


const changeColor = () => {
  const labels = document.querySelectorAll('.label-to-check')

  let seleccionados = 0

  labels.forEach(l => {
    l.addEventListener('click', () => {
      if (l.classList.contains('bg-[#3B3355]')) {
        seleccionados--
        l.classList.remove('bg-[#3B3355]')
        l.classList.remove('text-white')
      } else if (seleccionados < 2){
        seleccionados++
        l.classList.add('bg-[#3B3355]')
        l.classList.add('text-white')
      }
    })
  })
}

const RestrictionForm = () => {
  const radioButtons = document.querySelectorAll('input[type="checkbox"]')

  let seleccionados = 0

  radioButtons.forEach(b => {
    b.addEventListener('change', () => {

      seleccionados = document.querySelectorAll('input[type="checkbox"]:checked').length

      radioButtons.forEach(r => {
        r.disabled = seleccionados >= 2 && !r.checked
      })
    })
  })
}

const getHorarios = async () => {
  const idAlumno = JSON.parse(localStorage.getItem('data')).id
  const nivel = JSON.parse(localStorage.getItem('data')).nivel
  const token = JSON.parse(localStorage.getItem('data')).token
  
  const API_URL = `https://pds-backend-gdj3.onrender.com/horario/nivel/${nivel}/${idAlumno}`

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    }
  })

  const json = await response.json()
  const horContainer = document.getElementById('matricula-container')

  if (json.response === 'Ya estás matriculado') {
    const element = `
      <div class="w-full indent-4 font-bold">${json.response}</div>
    `
    horContainer.innerHTML += element
    return
  }

  if (json.horarios.length === 0) {
    const element = `
      <div class="w-full indent-4 font-bold">No hay horarios disponibles</div>
    `
    horContainer.innerHTML += element
    return
  }

  json.horarios.forEach(h => {
    const element = `
      <div class="w-[90%] flex">
        <label for="radio_${h.id_horario}" class="label-to-check cursor-pointer transition-all duration-300 ease-in-out w-full h-[50px] flex items-center justify-around border-2 rounded border-black">
          <p class="w-[20%] text-center text-xl font-bold">${h.curso}</p>
          <p class="w-[20%] text-center text-xl font-bold">${h.profesor[0].nombres}</p>
          <p class="w-[20%] text-center text-xl font-bold">${h.dia_semana}</p>
          <p class="w-[20%] text-center text-xl font-bold">${h.hora_inicio}</p>
          <p class="w-[20%] text-center text-xl font-bold">${h.hora_final}</p>
        </label>
        <input class="sr-only" name="groupSelects" id="radio_${h.id_horario}" type="checkbox">
      </div>
    `

    horContainer.innerHTML += element
  })

  horContainer.innerHTML += `
    <div class="w-[20%] flex items-center justify-center border-2 border-black rounded-lg hover:scale-[1.02] transition-all ease-in-out">
      <button id="btn-matricula" class="p-2 font-bold text-center">Matricularse</button>
    </div>
  `

  matricula()
}

const matricula = async () => {
  const btnMatricula = document.getElementById('btn-matricula')

  btnMatricula.addEventListener('click', async (e) => {
    e.preventDefault()

    const API_URL = 'https://pds-backend-gdj3.onrender.com/matricula'
    
    const token = JSON.parse(localStorage.getItem('data')).token
    const idAlumno = JSON.parse(localStorage.getItem('data')).id
    const checkedHorarios = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(c => c.id.split('_').pop())

    if (checkedHorarios.length < 2) {
      alert('Debe seleccionar dos horarios')
      return
    }

    const data = {
      data: checkedHorarios.map(h => ({
        idAlumno,
        idHorario: h
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

    if (!response.ok) {
      alert('No se pudo matricular')
      return
    }

    alert('Matricula exitosa')
    location.reload()
  })
}
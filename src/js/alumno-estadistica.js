import './../css/style.css';

window.addEventListener('load', async () => {
  const data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    location.href = '/'
  }

  const bodyName = document.getElementById('for-name')
  bodyName.innerText = data.nombres + ' ' + data.apellidos

  await getCourses()
  showCard()
})

const getCourses = async () => {
  const idAlumno = JSON.parse(localStorage.getItem('data')).id
  const token = JSON.parse(localStorage.getItem('data')).token

  const API_URL = `http://localhost:3210/fichanota/alumno/${idAlumno}`

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mode': 'cors'
    },
  })

  if (response.status === 404) {
    alert('No tienes cursos finalizados')
    return
  }

  const json = await response.json()

  const content = document.getElementById('content-table')
  const terminados = document.getElementById('cursos-terminados')
  const aprobados = document.getElementById('cursos-aprobados')

  terminados.innerText = json.length
  aprobados.innerText = json.filter(c => c.promedio >= 10.5).length

  let element = ''

  json.forEach(c => {
    let colorPromedio = c.promedio >= 10.5 ? 'text-green-500' : 'text-red-500'
    element += `
      <div class="relative rounded-lg shadow-md py-5 px-4 hover:scale-105 transition-transform flex flex-col justify-center">
        <div class="rounded-lg bg-[#294B29] text-white text-3xl inline-flex px-4 py-3 mb-2 justify-center">
          <i class="fas fa-book"></i>
        </div>
        <div class="flex flex-col items-start">
          <h1 class="text-lg font-medium" id="curso">${c.curso}</h1>
          <p class="">Nivel: ${c.nivel}</p>
          <p class="">Profesor: ${c.profesor}</p>
          <p class="">Ciclo: ${c.ciclo}</p>
          <p class="font-semibold">Promedio: <span class="${colorPromedio}">${c.promedio}</span></p>
        </div>
        <i class="desc-box fas fa-info-circle absolute cursor-pointer bottom-0 right-0 px-4 py-3 bg-[#12372A] text-white rounded-br-lg rounded-tl-lg hover:bg-[#1d4436] " id="curso-info"></i>


        <div class="sr-only transition-all duration-150 ease-in-out absolute right-0 bottom-0 translate-y-[105%] p-4 border-2 border-black bg-white rounded-lg">

        
        `
    let box = ''
    c.temas.forEach(n => {
      box += `
          <p class="font-lg"><span class="font-semibold">${n.tema}</span>${': ' + n.nota}</p>
      `
    })

    element += `${box}</div></div>`
    
  })

  element += `
    <div class="rounded-lg shadow-md py-5 px-4  flex flex-col justify-center bg-gray-50 items-center">
      <p class="text-2xl font-medium mb-5">Matricularse en un curso</p>
      <a href="./alumno-matricula.html" class="border-2 border-black px-4 py-2 rounded-lg transition-colors hover:bg-black hover:text-white "><i class="fas fa-plus text-3xl  "></i></a>
    </div>
  `

  content.innerHTML += element
}

const showCard = () => {
  const btns = document.querySelectorAll('.desc-box')
  btns.forEach(btn => {

    const card = btn.nextElementSibling

    btn.addEventListener('mouseover', () => {  
      card.classList.remove('sr-only')
    })

    btn.addEventListener('mouseout', () => {
      card.classList.add('sr-only')
    })

  })
}
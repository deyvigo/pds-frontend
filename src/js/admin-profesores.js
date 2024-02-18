import './../css/style.css'

const getTeachers = async () => {
  const API_URL = 'http://localhost:3210/profesor'

  const token = '' // Del localStorage
  
  const response = await fetch(API_URL,{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json',
      'mode': 'cors'
    },
  })

  const data = await response.json()

  const table = document.querySelector('#tabla-profesores')

  data.forEach(e => {
    let statusColor = e.estado === 'inactivo' ? 'bg-red-500 text-white' : 'bg-green-500 text-black'
    let leftBottom = e.estado === 'inactivo' ? `<div id="pr_${e.id_profesor}" class="bg-slate-500 border-2 border-black rounded-lg py-1 cursor-pointer" onclick="changeStatus(this)">Autorizar</div>` : ''
    table.innerHTML += `
      <div class="flex w-full gap-2 items-center">
        <div class="w-[100px]"></div>
          <div class="flex w-full gap-2 items-center justify-around border-2 border-sky-500 rounded-lg h-[50px]">
            <p class="w-[100px]">${e.nombres}</p>
            <p class="w-[100px]">${e.apellidos}</p>
            <p class="w-[100px]">${e.username}</p>
            <p class="w-[100px] text-center rounded-lg py-1 ${statusColor}">${e.estado}</p>
          </div>
        <div class="w-[100px] text-center">${leftBottom}</div>
      </div>
    `
  })
}

// funcion que se activa cuando se da click en leftBottom (la variable que está más arriba)
const changeStatus = async (element) => {
  const idProfesor = element.id.split('_').pop()
  const API_URL = 'http://localhost:3210/profesor/autorizar'
  const idAutorizante = 1 // Esto se debe sacar de localStorage una vez que se ha iniciado sesion
  const token = '' // Esto también de localStorage
  const data = {
    idProfesor,
    idAutorizante,
    estado: 'activo'
  }
  const response = await fetch(API_URL,{
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json',
      'mode': 'cors'
    },
    body: JSON.stringify(data)
  })  
  if(response.ok){
    location.reload()
  }
}

window.addEventListener('load', () => {
  getTeachers()
})

// Agregar la función al DOM
window.changeStatus = changeStatus
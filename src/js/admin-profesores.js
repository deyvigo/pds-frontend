import './../css/style.css'

const getTeachers = async () => {
  const API_URL = 'http://localhost:3210/profesor'
  
  const response = await fetch(API_URL)

  const data = await response.json()

  const table = document.querySelector('#tabla-profesores')

  data.forEach(e => {
    let statusColor = ''
    if(e.estado === 'inactivo'){
      statusColor = 'bg-red-500 text-white'
    } else {
      statusColor = 'bg-green-500 text-black'
    }
    table.innerHTML += `
      <div class="flex w-full gap-2 items-center justify-around border-2 border-sky-500 rounded-lg h-[50px]">
        <p class="w-[100px]">${e.nombres}</p>
        <p class="w-[100px]">${e.apellidos}</p>
        <p class="w-[100px]">${e.username}</p>
        <p class="w-[100px] text-center rounded-lg py-1 ${statusColor}">${e.estado}</p>
      </div>
    `
  })
}

window.addEventListener('load', () => {
  getTeachers()
})
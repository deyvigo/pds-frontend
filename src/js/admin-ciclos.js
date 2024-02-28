import './../css/style.css'

window.addEventListener('load', async () => {
  const data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    location.href = '/'
  }

  showCicles()
})

const showCicles = async () => {
  const API_URL = 'http://localhost:3210/ciclo'

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

  const table = document.getElementById('tabla-ciclos')

  json.forEach(c => {
    table.innerHTML += `
      <div class="flex w-full gap-2 items-center hover:bg-gray-50 transition-colors">
        <div class="flex w-full gap-2 items-center text-center justify-around border-t h-[50px]">
          <p class="w-[30%] font-semibold">${c.ciclo}</p>
          <p class="w-[30%] font-normal">${c.inicio.split('T').shift()}</p>
          <p class="w-[30%] font-normal">${c.fin.split('T').shift()}</p>
        </div>
      </div>
    `
  })
}

const createBtn = document.getElementById('create-cicle')

createBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  const API_URL = 'http://localhost:3210/ciclo'

  const token = JSON.parse(localStorage.getItem('data')).token

  const ciclo = document.getElementById('ciclo').value
  const inicio = document.getElementById('inicio').value
  const fin = document.getElementById('fin').value

  if (ciclo === '' || inicio === '' || fin === '') {
    alert('Llene todos los campos')
    return
  }

  const data = {
    ciclo,
    inicio,
    fin
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
    alert('Ciclo creado')
    location.reload()
  }
})
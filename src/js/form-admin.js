import './../css/style.css'

const logBTn = document.getElementById('loginBottom')

logBTn.addEventListener('click', async (e) => {
  e.preventDefault()
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  const API_URL = 'http://localhost:3210/login/administrador'
  const data = {
    username,
    password
  }
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'mode': 'cors'
    },
    body: JSON.stringify(data)
  })

  const json = await response.json()
  if (json.error) {
    alert(json.error)
    return
  }

  if (response.ok) {
    alert('Bienvenido')
    localStorage.setItem('data', JSON.stringify(json))
    location.href = 'admin-ciclos.html'
  }
})
import './../css/style.css'

const getStudents = async () => {
  const API_URL = 'http://localhost:4321/alumno'

  const response = await fetch(API_URL)
  const json = await response.json()
  console.log(json)

  json.forEach(e => {
    document.getElementById('lista-alumnos').innerHTML += `
      <div>${e.username}, ${e.nombres}</div>
    `
  });
}

const getTeachers = async () => {
  const API_URL = 'http://localhost:4321/profesor'

  const response = await fetch(API_URL)
  const json = await response.json()
  console.log(json)

  json.forEach(e => {
    document.getElementById('lista-alumnos').innerHTML += `
      <div class="font-bold">${e.username}, ${e.nombres}</div>
    `
  });
}

window.addEventListener('load', () => {
  getStudents()
  getTeachers()
})
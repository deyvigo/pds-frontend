import './../css/style.css';

window.addEventListener('load', () => {
  const data = localStorage.getItem('data')
  console.log(JSON.parse(data))
  if (!data) {
    window.location.href = 'index.html'
  }
  const { nombres } = JSON.parse(data)
  putName(nombres)
})

const putName = (name) => {
  const nombre = document.getElementById('nombre-alumno')
  nombre.innerText = name
}
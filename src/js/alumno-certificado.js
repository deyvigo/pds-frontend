import './../css/style.css'

window.addEventListener('load', async () => {
  const data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    location.href = '/'
  }

})

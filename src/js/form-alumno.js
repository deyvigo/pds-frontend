import './../css/style.css';

document.getElementById("register").addEventListener("click", function() {
        console.log("click");
        document.getElementById("registerForm").classList.remove("hidden");
        document.getElementById("loginForm").classList.add("hidden");

        document.querySelector("h1").innerHTML = "Registrar";
        
        document.getElementById("register").classList.add("bg-[#3B3355]");
        document.getElementById("register").classList.add("text-white");
        document.getElementById("login").classList.remove("text-white");
        document.getElementById("login").classList.remove("bg-[#3B3355]");
});

document.getElementById("login").addEventListener("click", function() {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
    
    document.querySelector("h1").innerHTML = "Iniciar sesión";

    document.getElementById("register").classList.remove("bg-[#3B3355]");
    document.getElementById("register").classList.remove("text-white");
    document.getElementById("login").classList.add("text-white");
    document.getElementById("login").classList.add("bg-[#3B3355]");
});

const loginBtn = document.getElementById('login-alumno')

loginBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const username = document.getElementById('l-username').value
    const password = document.getElementById('l-password').value

    const API_URL = 'http://localhost:3210/login/alumno'

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

    localStorage.setItem('data', JSON.stringify(json))
    location.href = 'alumno-estadistica.html'
})

const registerBtn = document.getElementById('register-alumno')

registerBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const API_URL = 'http://localhost:3210/alumno'

    const nombres = document.getElementById('r-first-name').value
    const apellidos = document.getElementById('r-last-name').value
    const username = document.getElementById('r-username').value
    const password = document.getElementById('r-password').value
    const nivel = 1
    const rol = 2

    const data = {
        nombres,
        apellidos,
        username,
        password,
        nivel,
        rol
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

    if (json.response){
        alert(json.response)
    }
})

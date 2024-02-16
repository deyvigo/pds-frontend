import './../css/style.css'

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
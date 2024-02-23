var hide = document.getElementById('hide-menu');
var menu = document.getElementById('sidebar');
var headMenu = document.getElementById('head-menu');
var container = document.getElementById('main');
const menuContent = document.getElementById('menu-content');
const divContainer = document.getElementById('div-sidebar');
hide.addEventListener('click', function() {
    divContainer.classList.toggle('w-[50px]');
    menu.classList.toggle('w-[50px]');
    menu.classList.toggle('w-[300px]');
    menu.classList.toggle('px-4');
    menu.classList.toggle('px-2');
    headMenu.classList.toggle('justify-between');
    headMenu.classList.toggle('justify-center');
    menuContent.classList.toggle('px-4');
    hide.classList.toggle('rotate-180');
    main.classList.toggle('ml-[50px]');
    main.classList.toggle('ml-[300px]');
    var elements = menu.getElementsByTagName('p');
    var logo = document.getElementById('logo');
    logo.classList.toggle('hidden');

    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.toggle('hidden');
    }
})

const btn = document.getElementById('logout')

btn.addEventListener('click', () => {
    console.log('Sesion Cerrada')
    localStorage.clear()
    location.href = '/'
})

const logName = document.getElementById('logout-name')

logName.innerHTML = JSON.parse(localStorage.getItem('data')).nombres

var hide = document.getElementById('hide-menu');
var menu = document.getElementById('sidebar');
var headMenu = document.getElementById('head-menu');
var container = document.getElementById('main');
hide.addEventListener('click', function() {
    menu.classList.toggle('w-[50px]');
    menu.classList.toggle('w-[190px]');
    menu.classList.toggle('px-4');
    menu.classList.toggle('px-2');
    headMenu.classList.toggle('justify-center');
    headMenu.classList.toggle('justify-between');
    hide.classList.toggle('rotate-180');
    main.classList.toggle('ml-[50px]');
    main.classList.toggle('ml-[190px]');
    var elements = menu.getElementsByTagName('p');
    var logo = document.getElementById('logo');
    logo.classList.toggle('hidden');

    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.toggle('hidden');
    }
});
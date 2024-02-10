import './../css/style.css'
import javascriptLogo from './../images/javascript.svg'
import viteLogo from './../../public/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div class="flex flex-col items-center gap-2">
    <div class="flex flex-row w-[200px] h-[100px] gap-[10px] items-center">
      <a href="https://vitejs.dev" target="_blank">
        <img src="${viteLogo}" class="logo w-[90px] h-[90px]" alt="Vite logo" />
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="${javascriptLogo}" class="logo vanilla w-[90px] h-[90px]" alt="JavaScript logo" />
      </a>
    </div>
    <h1>Hello Vite!</h1>
    <div class="card border-2 border-black bg-sky-500 rounded-xl p-2">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
    
  </div>
`

setupCounter(document.querySelector('#counter'))

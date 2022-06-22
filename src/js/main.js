import ConfettiGenerator from 'confetti-js'
import Swal from 'sweetalert2'
import nyanCat from '../images/nyan-cat.gif'
import cakeImage from '../images/cake.gif'
import dancingBoy from '../images/dancingBoy.gif'
import typingCats from '../images/typingCats.gif'
import enablePopovers from './popovers';

let parentsInput = document.getElementById('parentsInput')
let button = document.getElementById('button')
let writtenByParents = document.getElementById('writtenByParents')

let writtenByKid = document.querySelector('#writtenByKid')
let childsInput = document.querySelector('#childsInput')
let congratulationsArray = [
  'LIUKS! :)',
  'KAIP GERAI RAŠAI! ;)',
  'PUIKUMĖLIS! ;)',
  'DUOK PENKIS! ;)',
  'TIRLI PIRLI KAIP ŠAUNU!',
  'TAIP IR TOLIAU!;)'
]
let gifArray = [nyanCat, cakeImage, dancingBoy, typingCats]

let confettiElement = document.getElementById('confeti')
let confettiSettings = {
  target: confettiElement,
  max: 500
}
let confetti = new ConfettiGenerator(confettiSettings)

enablePopovers();

const isMobileUser = () => {
  return screen.width <= 640
}

if (isMobileUser()) {
  Swal.fire({
    title: 'Pardon!',
    text: 'Deja, programėlė skirta naudotis tik kompiuteriu',
    icon: 'error',
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false
  })
}

pushMe.addEventListener('click', () => {
  populateWrittenByParents()
})

parentsInput.addEventListener('input', (el) => {
  el.target.value = el.target.value.toUpperCase()
})

childsInput.addEventListener('input', (el) => {
  el.target.value = el.target.value.toUpperCase()
  writtenByKid.innerHTML = childsInput.value.toUpperCase()
  let childsInputArray = childsInput.value.split('')
  let changedElements = []

  childsInputArray.forEach(function (childsInputLetter, index) {
    let elementId = `parentInput${index}`
    let parentLetter = document.getElementById(elementId)

    if (parentLetter === null) {
      return
    }

    if (childsInputLetter.toUpperCase() === parentLetter.innerHTML) {
      parentLetter.classList.add('yellowLetter')
    } else {
      parentLetter.classList.add('redLetter')
    }

    changedElements.push(parentLetter)
  })

  if (parentsInput.value === childsInput.value) {
    confetti = new ConfettiGenerator(confettiSettings)
    confetti.render()

    let randomPopupIndex = Math.floor(Math.random() * congratulationsArray.length)
    let randomGifIndex = Math.floor(Math.random() * gifArray.length)

    Swal.fire({
      title: congratulationsArray[randomPopupIndex],
      width: 600,
      padding: '3em',
      color: '#716add',
      //background: `#fff url(${treesImage})`,
      backdrop: `
        rgba(0,0,123,0.4)
        url(${gifArray[randomGifIndex]})
        left top
        no-repeat
      `
    }).then((result) => {
      confetti.clear()
      confettiElement.height = 0
    })
  }

  let writtenByParentsLetters = Array.from(writtenByParents.children)
  writtenByParentsLetters.forEach((el) => {
    if (!changedElements.includes(el)) {
      el.classList.remove('yellowLetter')
      el.classList.remove('redLetter')
    }
  })
})

const populateWrittenByParents = () => {
  parentsInput.value = parentsInput.value.trim()
  let array = parentsInput.value.trim().split('')
  let string = ''
  childsInput.value = ''
  childsInput.dispatchEvent(new Event('input'))
  array.forEach(function (letter, index) {
    string = string + `<span id=parentInput${index}>${letter.toUpperCase()}</span>`
  })
  writtenByParents.innerHTML = string
  childsInput.focus()
}

clearInputsButton.addEventListener('click', () => {
  childsInput.value = ''
  parentsInput.value = ''
  writtenByKid.innerHTML = ''
  writtenByParents.innerHTML = ''
  parentsInput.focus()
})

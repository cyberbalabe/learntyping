let parentsInput = document.getElementById('parentsInput')
let button = document.getElementById('button')
let writtenByParents = document.getElementById('writtenByParents')

let writtenByKid = document.querySelector('#writtenByKid')
let childsInput = document.querySelector('#childsInput')

let confettiElement = document.getElementById('confeti');
let confettiSettings = { 
  target: confettiElement,
  max: 500
    };
let confetti = new ConfettiGenerator(confettiSettings);    

pushMe.addEventListener('click', () => {
  populateWrittenByParents();
})

parentsInput.addEventListener('input', (el) => {
  el.target.value = el.target.value.toUpperCase()
})



childsInput.addEventListener('input', (el) => {
  el.target.value = el.target.value.toUpperCase();
  writtenByKid.innerHTML = childsInput.value.toUpperCase()
  let childsInputArray = childsInput.value.split('')
  let changedElements = []

  childsInputArray.forEach(function (childsInputLetter, index) {
    let elementId = `parentInput${index}`
    let parentLetter = document.getElementById(elementId)

    if (parentLetter === null){
      return 
    }
    
    if(childsInputLetter.toUpperCase() === parentLetter.innerHTML){
      parentLetter.classList.add("yellowLetter") 
    } else{
      parentLetter.classList.add("redLetter")
    }

    changedElements.push(parentLetter)
  })

  if (parentsInput.value === childsInput.value){
    confetti = new ConfettiGenerator(confettiSettings);   
    confetti.render()
  }

  let writtenByParentsLetters = Array.from(writtenByParents.children)
  writtenByParentsLetters.forEach((el) => {
    if (!changedElements.includes(el)) {
      el.classList.remove('yellowLetter');
      el.classList.remove('redLetter');
    }
  })
})

confettiButton.addEventListener('click', () => {
  
  confetti.clear()
  confettiElement.height = 0
})

const populateWrittenByParents = () => {
  parentsInput.value = parentsInput.value.trim()
  let array = parentsInput.value.trim().split('')
  let string = ''
  childsInput.value = ''
  childsInput.dispatchEvent(new Event('input'));
  array.forEach(function (letter, index) {
    string = string + `<span id=parentInput${index}>${letter.toUpperCase()}</span>`
  })
  writtenByParents.innerHTML = string
  childsInput.focus()
}


const allInputBoxDiv = document.querySelectorAll('.input-box-div')
allInputBoxDiv.forEach((inputBoxDiv) => {
  const inputBox = inputBoxDiv.querySelector('.input-box')
  const inputBoxTextDiv = inputBoxDiv.querySelector('.input-box-text-div')
  inputBox.addEventListener('focus', () => {
    inputBoxTextDiv.style.display = 'none'
  })
  inputBoxDiv.addEventListener('focusout', (e) => {
    if (e.target.value === '') {
      inputBoxTextDiv.style.display = 'flex'
    }
  })
})

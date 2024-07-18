const allInputBoxDiv = document.querySelectorAll('.input-box-div')
allInputBoxDiv.forEach((inputBoxDiv) => {
  const inputBox = inputBoxDiv.querySelector('.input-box')
  const inputBoxTextDiv = inputBoxDiv.querySelector('.input-box-text-div')
  inputBox.addEventListener('focus', () => {
    inputBoxTextDiv.style.display = 'none'
    inputBoxDiv.style.border = '1px solid #007bff'
  })
  inputBoxDiv.addEventListener('focusout', (event) => {
    inputBoxDiv.style.border = '1px solid #ced4da'
  })
})

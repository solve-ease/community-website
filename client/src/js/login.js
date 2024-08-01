import { login } from './api.js'

document.addEventListener('DOMContentLoaded', function () {
  const allInputBoxDiv = document.querySelectorAll('.input-box-div')
  allInputBoxDiv.forEach((inputBoxDiv) => {
    const inputBox = inputBoxDiv.querySelector('.input-box')
    const inputBoxTextDiv = inputBoxDiv.querySelector('.input-box-text-div')
    inputBox.addEventListener('focus', () => {
      inputBoxTextDiv.style.display = 'none'
      inputBoxDiv.style.border = '1px solid #007bff'
    })
    inputBoxDiv.addEventListener('focusout', (e) => {
      inputBoxDiv.style.border = '1px solid #ced4da'
      if (e.target.value === '') {
        inputBoxTextDiv.style.display = 'flex'
      }
    })
  })

  //login request to server
  const loginForm = document.getElementById('login-form')
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault()
    if (true) {
      //code for sending form data to server
      const formData = new FormData(loginForm)
      const userData = {
        email: formData.get('email'),
        password: formData.get('password')
      }
      try {
        const response = await login(userData)
        // form.reset()
      } catch (error) {
        console.error(
          'There was a problem with the fetch operation:',
          error.message
        )
      }
    }
  })
})

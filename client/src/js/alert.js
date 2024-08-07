document.addEventListener('DOMContentLoaded', () => {
  fetch('alert.html')
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML('beforeend', data)
      setupCustomAlert()
    })
})

function setupCustomAlert() {
  const alertBox = document.getElementById('custom-alert')
  const alertClose = document.getElementById('custom-alert-close')

  alertClose.addEventListener('click', () => {
    alertBox.classList.add('animated-element')
  })
}
// function to show the alert message
export function showCustomAlert(message) {
  const alertMessage = document.getElementById('custom-alert-message')
  const alertBox = document.getElementById('custom-alert')
  alertMessage.textContent = message
}

import { CONFIG } from './config.js'

export async function sendUserData(userData) {
  try {
    const response = await fetch(`${CONFIG.API_ENDPOINT}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      alert(errorData.message || 'Network response was not ok')
      throw new Error(errorData.message || 'Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(
      'There was a problem with the fetch operation:',
      error.message
    )
    throw error
  }
}

export async function login(userData) {
  try {
    const response = await fetch(`${CONFIG.API_ENDPOINT}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    const data = await response.json()
    if (response.ok) {
      localStorage.setItem('accessToken', data.accessToken)
      document.cookie = `refreshToken=${data.refreshToken}; HttpOnly`
      alert('Login successful!')

      // checks for new profile creation
      let profCreated = false; // need to feteched and verified from the backend
      if (!profCreated) {
        window.location.href = 'profile_creation.html'
      }
      else {
        window.location.href = 'user_dashboard.html'
      }

    } else {
      alert(data.message)
    }
  } catch (e) {
    console.error(
      'There was a problem with the fetch operation:',
      error.message
    )
    throw error
  }
}

async function fetchProtectedData() {
  let accessToken = localStorage.getItem('accessToken')
  const response = await fetch(`${CONFIG.API_ENDPOINT}/api/protected`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (response.status === 401) {
    // Access token expired, try to refresh it
    const refreshToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('refreshToken'))
      .split('=')[1]
    const tokenResponse = await fetch(`${CONFIG.API_ENDPOINT}/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: refreshToken })
    })

    if (tokenResponse.ok) {
      const tokenData = await tokenResponse.json()
      accessToken = tokenData.accessToken
      localStorage.setItem('accessToken', accessToken)

      // Retry the original request with the new access token
      const retryResponse = await fetch(
        `${CONFIG.API_ENDPOINT}/api/protected`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      if (retryResponse.ok) {
        const data = await retryResponse.json()
      } else {
        alert('Failed to fetch protected data')
      }
    } else {
      alert('Failed to refresh token')
    }
  } else if (response.ok) {
    const data = await response.json()
  } else {
    alert('Failed to fetch protected data')
  }
}

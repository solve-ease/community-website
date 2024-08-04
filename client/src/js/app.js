const AUTHOR = 'Team Solve-Ease'
console.log(`Developed by ${AUTHOR}`)

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      })
    })
  })

  // Animation for hero content
  const heroContent = document.querySelector('.hero-content')
  heroContent.style.opacity = '0'
  heroContent.style.transform = 'translateY(20px)'

  setTimeout(() => {
    heroContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
    heroContent.style.opacity = '1'
    heroContent.style.transform = 'translateY(0)'
  }, 200)

  // Parallax effect for hero image
  const heroImage = document.querySelector('.hero-image img')
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY
    heroImage.style.transform = `translateY(${scrolled * 0.1}px)`
  })
})

function animateShapes() {
  const shapes = document.querySelectorAll('.shape')

  shapes.forEach((shape) => {
    // Set initial position
    setPosition(shape)

    // Animate
    animateShape(shape)
  })
}

function setPosition(element) {
  const maxX = window.innerWidth - element.offsetWidth
  const maxY = window.innerHeight - element.offsetHeight

  const x = Math.random() * maxX
  const y = Math.random() * maxY

  element.style.position = 'absolute'
  element.style.left = `${x}px`
  element.style.top = `${y}px`
}

function animateShape(element) {
  const animationDuration = 15 + Math.random() * 10 // Between 15 and 25 seconds
  const xDistance = Math.random() * 100 - 50 // Move between -50px and 50px horizontally
  const yDistance = Math.random() * 100 - 50 // Move between -50px and 50px vertically

  // Get the current position from the element's style
  const startX = parseFloat(element.style.left) || 0
  const startY = parseFloat(element.style.top) || 0

  const endX = startX + xDistance
  const endY = startY + yDistance

  element.animate(
    [
      { transform: `translate(${0}px, ${0}px)` },
      { transform: `translate(${xDistance}px, ${yDistance}px)` }
    ],
    {
      duration: animationDuration * 1000,
      easing: 'ease-in-out',
      iterations: Infinity,
      direction: 'alternate'
    }
  )
}
// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', animateShapes)

// ----Loader----
const loader = document.getElementById('preloader')
const body = document.querySelector('body')

function preloadFunc() {
  setTimeout(() => {
    loader.style.display = 'none'
  }, 1000) //delay added
}

window.addEventListener('load', preloadFunc)

// other sections js

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      })
    })
  })

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      '.project-card, .contributor-card, .testimonial-card'
    )
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      }
    })
  }

  window.addEventListener('scroll', animateOnScroll)
  animateOnScroll() // Initial check on page load

  // Interactive hover effect for project cards
  const projectCards = document.querySelectorAll('.project-card')
  projectCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.backgroundColor = '#f0f0f0'
    })
    card.addEventListener('mouseleave', function () {
      this.style.backgroundColor = '#fff'
    })
  })

  // Testimonial carousel
  const testimonials = document.querySelectorAll('.testimonial-card')
  let currentTestimonial = 0

  function showNextTestimonial() {
    testimonials[currentTestimonial].style.display = 'none'
    currentTestimonial = (currentTestimonial + 1) % testimonials.length
    testimonials[currentTestimonial].style.display = 'block'
  }

  setInterval(showNextTestimonial, 5000) // Change testimonial every 5 seconds

  // Dynamic content loading for "Learn More" buttons

  // BACKEND PART -
  // document.querySelectorAll('.cta-btn').forEach(btn => {
  //     btn.addEventListener('click', function(e) {
  //         e.preventDefault();
  //         const url = this.getAttribute('href');
  //         fetch(url)
  //             .then(response => response.text())
  //             .then(data => {
  //                 const tempDiv = document.createElement('div');
  //                 tempDiv.innerHTML = data;
  //                 const content = tempDiv.querySelector('main').innerHTML;
  //                 document.querySelector('main').innerHTML = content;
  //             })
  //             .catch(error => console.error('Error:', error));
  //     });
  // });
})
//event listener to get user data from github and to display it
document.addEventListener('DOMContentLoaded', fetchContributors)

//function to get the contributors data from github
async function fetchContributors() {
  const owner = 'solve-ease'
  const repo = 'community-website'
  const url = `https://api.github.com/repos/${owner}/${repo}/contributors`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const contributors = await response.json()
    for (const contributor of contributors) {
      await fetchContributorDetails(contributor.login)
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}
async function fetchContributorDetails(username) {
  const userUrl = `https://api.github.com/users/${username}`
  try {
    const response = await fetch(userUrl)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const user = await response.json()
    displayContributor(user)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}
async function displayContributor(user) {
  const contributorsContainer = document.querySelector('.contributor-cards')
  const contributorCard = document.createElement('div')
  contributorCard.classList.add('contributor-card')
  contributorCard.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" />
        <h3>${user.name}</h3>
        <a href="${user.html_url}" target="_blank" class="cta-btn">View Profile</a>
    `
  contributorsContainer.appendChild(contributorCard)
}

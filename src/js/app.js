const AUTHOR = 'Team Solve-Ease';
console.log(`Developed by ${AUTHOR}`);

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation for hero content
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';

    setTimeout(() => {
        heroContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 200);

    // Parallax effect for hero image
    const heroImage = document.querySelector('.hero-image img');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    });
});


function animateShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach(shape => {
        // Set initial position
        setPosition(shape);
        
        // Animate
        animateShape(shape);
    });
}



function setPosition(element) {
    const maxX = window.innerWidth - element.offsetWidth;
    const maxY = window.innerHeight - element.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    element.style.position = 'absolute';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
}


function animateShape(element) {
    const animationDuration = 15 + Math.random() * 10; // Between 15 and 25 seconds
    const xDistance = Math.random() * 100 - 50; // Move between -50px and 50px horizontally
    const yDistance = Math.random() * 100 - 50; // Move between -50px and 50px vertically

    // Get the current position from the element's style
    const startX = parseFloat(element.style.left) || 0;
    const startY = parseFloat(element.style.top) || 0;

    const endX = startX + xDistance;
    const endY = startY + yDistance;

    element.animate([
        { transform: `translate(${0}px, ${0}px)` },
        { transform: `translate(${xDistance}px, ${yDistance}px)` }
    ], {
        duration: animationDuration * 1000,
        easing: 'ease-in-out',
        iterations: Infinity,
        direction: 'alternate'
    });
}
// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', animateShapes);
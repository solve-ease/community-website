// back to top 
document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('back-to-top');
    const progressRing = backToTopButton.querySelector('.progress-ring__circle');
    const radius = progressRing.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
  
    progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
    progressRing.style.strokeDashoffset = circumference;
  
    function setProgress(percent) {
        const offset = circumference - percent / 100 * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
  
    function scrollHandler() {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const scrollPercent = (scrolled / scrollTotal) * 100;
  
        if (scrolled > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
  
        setProgress(scrollPercent);
    }
  
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
  
    window.addEventListener('scroll', scrollHandler);
    backToTopButton.addEventListener('click', scrollToTop);
  });
  
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('profileForm');
    const profileImage = document.getElementById('profileImage');
    const profilePreview = document.getElementById('profilePreview');

    profileImage.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePreview.src = e.target.result;
                profilePreview.classList.add('fade-in');
            }
            reader.readAsDataURL(file);
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            // Here you would typically send the form data to your server
            alert('Basic Profile created successfully!');

            window.location.href = 'profile_creation_tw.html';
        }
    });

    function validateForm() {
        let isValid = true;

        // username check is required for existing users to be fetched from the backend

        const username = document.getElementById('username');
        // const email = document.getElementById('email');
        const phone = document.getElementById('phone');

        // Clear previous error messages
        clearErrors();

        if (username.value.trim() === '') {
            showError(username, 'Full name is required');
            isValid = false;
        }


        if (phone.value.trim() !== '' && !isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = document.createElement('div');
        error.className = 'error-message';
        error.innerText = message;
        formGroup.appendChild(error);
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        const re = /^\+?[\d\s-]{10,}$/;
        return re.test(phone);
    }

    // Add hover effect to form inputs
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.boxShadow = '0 0 5px rgba(52, 152, 219, 0.5)';
        });
        input.addEventListener('blur', function () {
            this.style.boxShadow = 'none';
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('additionalProfileForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            // Here you would typically send the form data to your server
            alert('Profile completed successfully!');
            // Redirect to the user's profile page or dashboard
            window.location.href = 'user_dashboard.html';
        }
    });

    function validateForm() {
        let isValid = true;
        const website = document.getElementById('website');

        // Clear previous error messages
        clearErrors();

        if (website.value.trim() !== '' && !isValidURL(website.value)) {
            showError(website, 'Please enter a valid URL');
            isValid = false;
        }

        // Add more validation for other fields if needed

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

    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Add hover effect to form inputs
    const formInputs = document.querySelectorAll('input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.boxShadow = '0 0 5px rgba(52, 152, 219, 0.5)';
        });
        input.addEventListener('blur', function () {
            this.style.boxShadow = 'none';
        });
    });
});
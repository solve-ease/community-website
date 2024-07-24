

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const fields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            alert('Registration successful!');
            form.reset();
        }
    });

    fields.forEach(field => {
        const input = document.getElementById(field);
        input.addEventListener('blur', () => validateField(field));
        input.addEventListener('input', () => clearError(field));
    });

    function validateForm() {
        let isValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        return isValid;
    }

    function validateField(field) {
        const input = document.getElementById(field);
        const error = document.getElementById(`${field}Error`);
        let isValid = true;

        switch (field) {
            case 'firstName':
            case 'lastName':
                if (input.value.trim() === '') {
                    showError(error, 'This field is required');
                    isValid = false;
                }
                break;
            case 'email':
                if (!isValidEmail(input.value)) {
                    showError(error, 'Please enter a valid email address');
                    isValid = false;
                }
                break;
            case 'password':
                if (input.value.length < 8) {
                    showError(error, 'Password must be at least 8 characters long');
                    isValid = false;
                }
                break;
            case 'confirmPassword':
                if (input.value !== document.getElementById('password').value) {
                    showError(error, 'Passwords do not match');
                    isValid = false;
                }
                break;
        }

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    function clearError(field) {
        const error = document.getElementById(`${field}Error`);
        error.textContent = '';
        error.style.display = 'none';
    }
});
// 1. SELECTING ALL ELEMENTS
const form = document.getElementById('interactiveForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const successPanel = document.getElementById('success-panel');

// 2. HELPER FUNCTIONS (To show or clear errors easily)
function showError(input, errorSpanId, message) {
    const errorSpan = document.getElementById(errorSpanId);
    const inputGroup = input.parentElement;
    
    errorSpan.textContent = message;          // Add the error message text
    inputGroup.classList.add('invalid');     // Add red styling class
    inputGroup.classList.remove('valid');    // Remove green styling class
}

function clearError(input, errorSpanId) {
    const errorSpan = document.getElementById(errorSpanId);
    const inputGroup = input.parentElement;
    
    errorSpan.textContent = '';               // Erase the error text
    inputGroup.classList.remove('invalid');  // Remove red styling class
    inputGroup.classList.add('valid');       // Add green styling class
}

// 3. INDIVIDUAL VALIDATION LOGIC
function validateName() {
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'name-error', 'Name is required.');
        return false;
    } else {
        clearError(nameInput, 'name-error');
        return true;
    }
}

function validateEmail() {
    // A regular expression (pattern) to check for a valid email structure (e.g., test@domain.com)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'email-error', 'Email is required.');
        return false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'email-error', 'Please enter a valid email address.');
        return false;
    } else {
        clearError(emailInput, 'email-error');
        return true;
    }
}

function validatePhone() {
    // Checks if the phone number contains at least 8 numbers
    const phonePattern = /^\+?[0-9]{8,15}$/;
    
    if (phoneInput.value.trim() === '') {
        showError(phoneInput, 'phone-error', 'Phone number is required.');
        return false;
    } else if (!phonePattern.test(phoneInput.value.trim())) {
        showError(phoneInput, 'phone-error', 'Enter a valid phone number (min 8 digits).');
        return false;
    } else {
        clearError(phoneInput, 'phone-error');
        return true;
    }
}

function validatePassword() {
    if (passwordInput.value.trim() === '') {
        showError(passwordInput, 'password-error', 'Password is required.');
        return false;
    } else if (passwordInput.value.length < 8) {
        showError(passwordInput, 'password-error', 'Password must be at least 8 characters long.');
        return false;
    } else {
        clearError(passwordInput, 'password-error');
        return true;
    }
}

// 4. ATTACHING REAL-TIME EVENTS (Input, Focus, and Blur)
// 'input' fires instantly whenever the user types a single character
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
passwordInput.addEventListener('input', validatePassword);

// 'blur' fires when a user clicks out of a text field (loses focus)
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
passwordInput.addEventListener('blur', validatePassword);

// Optional UX touch: Remove error highlights purely when clicking inside ('focus')
const inputs = [nameInput, emailInput, phoneInput, passwordInput];
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.remove('invalid');
    });
});

// 5. HANDLING FORM SUBMISSION
form.addEventListener('submit', function(event) {
    // Prevent the default browser page reload behavior
    event.preventDefault();
    
    // Run all validations one last time to make sure everything is completely clean
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    
    // If every single check returns true, show the final confirmation
    if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid) {
        successPanel.classList.remove('hidden'); // Show the success message card
        form.reset();                             // Clear out the form inputs
        
        // Remove the successful green borders after submission
        inputs.forEach(input => {
            input.parentElement.classList.remove('valid');
        });
        
        // Automatically hide the success banner after 4 seconds
        setTimeout(() => {
            successPanel.classList.add('hidden');
        }, 4000);
    }
});
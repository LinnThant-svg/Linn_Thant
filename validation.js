// Form Validation Script for Booking Form
// References: MDN Web Docs - Form Validation, W3Schools JS Validation

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    
    if (!form) return; // Exit if form doesn't exist on this page

    // Get all form fields
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const appointmentDate = document.getElementById('appointmentDate');
    const appointmentTime = document.getElementById('appointmentTime');
    const serviceType = document.getElementById('serviceType');
    const firstVisitRadios = document.getElementsByName('firstVisit');

    // Validation functions
    function validateName() {
        const nameValue = fullName.value.trim();
        const errorElement = document.getElementById('fullNameError');
        
        if (nameValue === '') {
            showError(fullName, errorElement, 'Please enter your full name');
            return false;
        } else if (nameValue.length < 2) {
            showError(fullName, errorElement, 'Name must be at least 2 characters');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
            showError(fullName, errorElement, 'Name can only contain letters and spaces');
            return false;
        } else {
            showSuccess(fullName, errorElement);
            return true;
        }
    }

    function validateEmail() {
        const emailValue = email.value.trim();
        const errorElement = document.getElementById('emailError');
        
        if (emailValue === '') {
            showError(email, errorElement, 'Please enter your email address');
            return false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            showError(email, errorElement, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(email, errorElement);
            return true;
        }
    }

    function validatePhone() {
        const phoneValue = phone.value.trim();
        const errorElement = document.getElementById('phoneError');
        
        // Remove spaces and dashes for validation
        const cleanPhone = phoneValue.replace(/[\s-]/g, '');
        
        if (phoneValue === '') {
            showError(phone, errorElement, 'Please enter your phone number');
            return false;
        } else if (!/^(04\d{8}|07\d{8}|\d{10})$/.test(cleanPhone)) {
            showError(phone, errorElement, 'Please enter a valid Australian phone number');
            return false;
        } else {
            showSuccess(phone, errorElement);
            return true;
        }
    }

    function validateDate() {
        const dateValue = appointmentDate.value;
        const errorElement = document.getElementById('dateError');
        
        if (dateValue === '') {
            showError(appointmentDate, errorElement, 'Please select a preferred date');
            return false;
        }
        
        // Check if date is in the future
        const selectedDate = new Date(dateValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        
        if (selectedDate < today) {
            showError(appointmentDate, errorElement, 'Please select a future date');
            return false;
        } else {
            showSuccess(appointmentDate, errorElement);
            return true;
        }
    }

    function validateTime() {
        const timeValue = appointmentTime.value;
        const errorElement = document.getElementById('timeError');
        
        if (timeValue === '' || timeValue === 'Select a time') {
            showError(appointmentTime, errorElement, 'Please select a preferred time');
            return false;
        } else {
            showSuccess(appointmentTime, errorElement);
            return true;
        }
    }

    function validateService() {
        const serviceValue = serviceType.value;
        const errorElement = document.getElementById('serviceError');
        
        if (serviceValue === '' || serviceValue === 'Select a service') {
            showError(serviceType, errorElement, 'Please select a service type');
            return false;
        } else {
            showSuccess(serviceType, errorElement);
            return true;
        }
    }

    function validateFirstVisit() {
        const errorElement = document.getElementById('firstVisitError');
        let isChecked = false;
        
        for (let radio of firstVisitRadios) {
            if (radio.checked) {
                isChecked = true;
                break;
            }
        }
        
        if (!isChecked) {
            errorElement.textContent = 'Please select an option';
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            return true;
        }
    }

    // Helper functions to show/hide errors
    function showError(input, errorElement, message) {
        input.style.borderColor = '#e53e3e';
        input.style.backgroundColor = '#fff5f5';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function showSuccess(input, errorElement) {
        input.style.borderColor = '#38a169';
        input.style.backgroundColor = '#f0fff4';
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    // Add event listeners for real-time validation (on blur)
    fullName.addEventListener('blur', validateName);
    email.addEventListener('blur', validateEmail);
    phone.addEventListener('blur', validatePhone);
    appointmentDate.addEventListener('blur', validateDate);
    appointmentTime.addEventListener('change', validateTime);
    serviceType.addEventListener('change', validateService);
    
    firstVisitRadios.forEach(radio => {
        radio.addEventListener('change', validateFirstVisit);
    });

    // Form submission validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Run all validations
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isDateValid = validateDate();
        const isTimeValid = validateTime();
        const isServiceValid = validateService();
        const isFirstVisitValid = validateFirstVisit();
        
        // Check if all fields are valid
        const isFormValid = isNameValid && isEmailValid && isPhoneValid && 
                           isDateValid && isTimeValid && isServiceValid && 
                           isFirstVisitValid;
        
        if (isFormValid) {
            // Hide the form
            form.style.display = 'none';
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Reset form after 5 seconds and show it again
            setTimeout(function() {
                form.reset();
                form.style.display = 'block';
                successMessage.style.display = 'none';
                
                // Reset all field styles
                const inputs = form.querySelectorAll('input, select, textarea');
                inputs.forEach(input => {
                    input.style.borderColor = '';
                    input.style.backgroundColor = '';
                });
                
                // Scroll back to top of form
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 5000);
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.error-message[style*="display: block"]');
            if (firstError) {
                firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});
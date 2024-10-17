const form = document.getElementById("form");
const uname = document.getElementById("uname");
const phone = document.getElementById("contact-phone");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");
const tandc = document.getElementById("tc");
const successMessage = document.getElementById("success-message");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()) {
        form.style.display = "none";
        successMessage.style.display = "block";
    }
});

function validate() {
    let isValid = true;
    const nameValue = uname.value.trim();
    const phoneValue = phone.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const cpasswordValue = cpassword.value.trim();

    // User name check
    if (nameValue === '') {
        setError(uname, 'User name cannot be empty');
        isValid = false;
    } else if (nameValue.length < 5) {
        setError(uname, 'User name should be minimum 5 characters');
        isValid = false;
    } else {
        setSuccess(uname);
    }

    // Phone number check
    if (phoneValue === '') {
        setError(phone, 'Phone number cannot be empty');
        isValid = false;
    } else if (!/^\d{10}$/.test(phoneValue)) {
        setError(phone, 'Phone number should be exactly 10 digits');
        isValid = false;
    } else if (phoneValue === '1234567890') {
        setError(phone, 'Phone Number should not be 1234567890');
        isValid = false;
    } else {
        setSuccess(phone);
    }

    // Email check
    if (emailValue === '') {
        setError(email, 'Email cannot be empty');
        isValid = false;
    } else if (!emailCheck(emailValue)) {
        setError(email, 'Enter a valid Email ID');
        isValid = false;
    } else {
        setSuccess(email);
    }

    // Password check
    if (passwordValue === '') {
        setError(password, 'Password cannot be empty');
        isValid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password should be minimum 8 characters');
        isValid = false;
    } else if (passwordValue === 'password' || passwordValue === uname.value) {
        setError(password, 'Password is not strong');
        isValid = false;
    } else {
        setSuccess(password);
    }

    // Confirm Password check
    if (cpasswordValue === '') {
        setError(cpassword, 'Confirm Password cannot be empty');
        isValid = false;
    } else if (cpasswordValue !== passwordValue) {
        setError(cpassword, 'Passwords do not match');
        isValid = false;
    } else {
        setSuccess(cpassword);
    }

    // Terms and conditions check
    if (!tandc.checked) {
        setError(tandc, 'You must agree to the terms and conditions');
        isValid = false;
    } else {
        setSuccess(tandc);
    }
    return isValid;
}

function setError(input, message) {
    const parent = input.parentElement;
    const feedback = parent.querySelector('.invalid-feedback');
    feedback.innerText = message;
    parent.classList.add('is-invalid');
    parent.classList.remove('is-valid');
}

function setSuccess(input) {
    const parent = input.parentElement;
    parent.classList.add('is-valid');
    parent.classList.remove('is-invalid');
    const feedback = parent.querySelector('.invalid-feedback');
    feedback.innerText = ''; // Clear the error message
}

function emailCheck(input) {
    const emailReg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    return emailReg.test(input);
}

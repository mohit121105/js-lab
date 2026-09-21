const form = document.getElementById("signupForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const dob = document.getElementById("dob");
const message = document.getElementById("message");
const showPassword = document.getElementById("showPassword");

const lengthCriteria = document.getElementById("length");
const uppercaseCriteria = document.getElementById("uppercase");
const lowercaseCriteria = document.getElementById("lowercase");
const numberCriteria = document.getElementById("number");
const specialCriteria = document.getElementById("special");

const verifiedInfo = document.getElementById("verifiedInfo");
const displayFirstName = document.getElementById("displayFirstName");
const displayLastName = document.getElementById("displayLastName");
const displayEmail = document.getElementById("displayEmail");
const displayDob = document.getElementById("displayDob");
const displayGender = document.getElementById("displayGender");

showPassword.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        showPassword.textContent = "Hide";
    } else {
        password.type = "password";
        showPassword.textContent = "Show";
    }
});

password.addEventListener("input", () => {
    const value = password.value;

    updateCriteria(
        lengthCriteria,
        value.length >= 8,
        "At least 8 characters"
    );

    updateCriteria(
        uppercaseCriteria,
        /[A-Z]/.test(value),
        "One uppercase letter"
    );

    updateCriteria(
        lowercaseCriteria,
        /[a-z]/.test(value),
        "One lowercase letter"
    );

    updateCriteria(
        numberCriteria,
        /[0-9]/.test(value),
        "One number"
    );

    updateCriteria(
        specialCriteria,
        /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/.test(value),
        "One special character"
    );
});

function updateCriteria(element, valid, text) {
    element.textContent = valid ? `✓ ${text}` : `✕ ${text}`;
    element.className = valid ? "valid" : "invalid";
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value;
    const dobValue = dob.value;
    const gender = document.querySelector('input[name="gender"]:checked');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validPassword =
        passwordValue.length >= 8 &&
        /[A-Z]/.test(passwordValue) &&
        /[a-z]/.test(passwordValue) &&
        /[0-9]/.test(passwordValue) &&
        /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/.test(passwordValue);

    if (!firstNameValue) {
        showMessage("Please enter your first name.", false);
        return;
    }

    if (!lastNameValue) {
        showMessage("Please enter your last name.", false);
        return;
    }

    if (!emailValue) {
        showMessage("Please enter your email address.", false);
        return;
    }

    if (!emailPattern.test(emailValue)) {
        showMessage("Please enter a valid email address.", false);
        return;
    }

    if (!passwordValue) {
        showMessage("Please enter your password.", false);
        return;
    }

    if (!validPassword) {
        showMessage("Wrong password.", false);
        return;
    }

    if (!dobValue) {
        showMessage("Please select your date of birth.", false);
        return;
    }

    if (!gender) {
        showMessage("Please select your gender.", false);
        return;
    }

    const birthDate = new Date(dobValue);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (
        month < 0 ||
        (month === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    if (age < 13) {
        showMessage("You must be at least 13 years old.", false);
        return;
    }

    displayFirstName.textContent = firstNameValue;
    displayLastName.textContent = lastNameValue;
    displayEmail.textContent = emailValue;

    displayDob.textContent = new Date(
        dobValue + "T00:00:00"
    ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    displayGender.textContent = gender.value;

    verifiedInfo.hidden = false;
    showMessage("Account information is valid!", true);
});

function showMessage(text, success) {
    if (!success) {
        verifiedInfo.hidden = true;
    }

    message.textContent = text;
    message.style.color = success ? "#00a400" : "#ed4956";
}
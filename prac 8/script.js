const form = document.querySelector("#membership-form");
const fields = {
  name: document.querySelector("#name"),
  age: document.querySelector("#age"),
  phone: document.querySelector("#phone"),
  email: document.querySelector("#email"),
  bloodGroup: document.querySelector("#blood-group"),
  plan: document.querySelector("#plan"),
  admissionDate: document.querySelector("#admission-date"),
  terms: document.querySelector("#terms")
};
const successMessage = document.querySelector("#success-message");
const submitButton = document.querySelector(".submit-button");
const submitButtonLabel = submitButton.querySelector("span");

function setFieldError(fieldName, message) {
  const field = fields[fieldName];
  const error = document.querySelector(`#${fieldName}-error`);

  field.classList.toggle("invalid", Boolean(message));
  field.setAttribute("aria-invalid", String(Boolean(message)));
  error.textContent = message;
}

function validateForm() {
  let isValid = true;
  const name = fields.name.value.trim();
  const age = Number(fields.age.value);
  const phone = fields.phone.value.trim();
  const email = fields.email.value.trim();
  const admissionDate = fields.admissionDate.value;

  setFieldError("name", "");
  setFieldError("age", "");
  setFieldError("phone", "");
  setFieldError("email", "");
  setFieldError("bloodGroup", "");
  setFieldError("plan", "");
  setFieldError("admissionDate", "");
  setFieldError("terms", "");

  if (name.length < 2) {
    setFieldError("name", "Please enter your full name.");
    isValid = false;
  }

  if (!Number.isInteger(age) || age < 16 || age > 60) {
    setFieldError("age", "Age must be between 16 and 60.");
    isValid = false;
  }

  if (!/^\d{10}$/.test(phone)) {
    setFieldError("phone", "Enter a valid 10-digit phone number.");
    isValid = false;
  }

  if (!fields.email.validity.valid || !email) {
    setFieldError("email", "Please enter a valid email address.");
    isValid = false;
  }

  if (!fields.bloodGroup.value) {
    setFieldError("bloodGroup", "Please select a valid blood group.");
    isValid = false;
  }

  if (!fields.plan.value) {
    setFieldError("plan", "Please select a membership plan.");
    isValid = false;
  }

  if (!admissionDate) {
    setFieldError("admissionDate", "Please select an admission date.");
    isValid = false;
  } else if (admissionDate < new Date().toISOString().split("T")[0]) {
    setFieldError("admissionDate", "Admission date cannot be in the past.");
    isValid = false;
  }

  if (!fields.terms.checked) {
    setFieldError("terms", "Please accept the terms and conditions.");
    isValid = false;
  }

  return isValid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.textContent = "";
  successMessage.classList.remove("error-state");
  submitButtonLabel.textContent = "Join Gym";
  submitButton.classList.remove("accepted");

  if (!validateForm()) {
    successMessage.textContent = "Please correct the highlighted fields and try again.";
    successMessage.classList.add("error-state");
    const firstInvalidField = form.querySelector(".invalid");
    firstInvalidField?.focus();
    return;
  }

  const selectedPlan = fields.plan.options[fields.plan.selectedIndex].text.split(" — ")[0];
  successMessage.textContent = `Gym membership accepted! Your ${selectedPlan.toLowerCase()} plan is active.`;
  submitButtonLabel.textContent = "Membership Accepted";
  submitButton.classList.add("accepted");
});

Object.values(fields).forEach((field) => {
  field.addEventListener("input", () => {
    submitButtonLabel.textContent = "Join Gym";
    submitButton.classList.remove("accepted");
    field.classList.remove("invalid");
    field.setAttribute("aria-invalid", "false");
    const error = document.querySelector(`#${field.name}-error`);
    error.textContent = "";
  });
});

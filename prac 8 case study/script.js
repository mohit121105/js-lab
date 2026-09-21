const form = document.getElementById("admission-form");
const statusMessage = document.getElementById("form-status");

const fields = {
  fullName: document.getElementById("full-name"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  age: document.getElementById("age"),
  membership: document.getElementById("membership"),
  terms: document.getElementById("terms")
};

const messages = {
  fullName: "Please enter your full name.",
  email: "Enter a valid email address.",
  phone: "Enter a valid 10-digit phone number.",
  age: "Age must be between 16 and 80.",
  gender: "Please select your gender.",
  membership: "Please choose a membership plan.",
  terms: "Please accept the membership terms."
};

function getErrorElement(name) {
  return document.getElementById(`${name === "fullName" ? "full-name" : name}-error`);
}

function validateField(name) {
  const field = fields[name];
  let message = "";

  if (name === "fullName" && field.value.trim().length < 2) message = messages.fullName;
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) message = messages.email;
  if (name === "phone" && !/^\d{10}$/.test(field.value.replace(/\D/g, ""))) message = messages.phone;
  if (name === "age" && (field.value === "" || field.value < 16 || field.value > 80)) message = messages.age;
  if (name === "membership" && field.value === "") message = messages.membership;
  if (name === "terms" && !field.checked) message = messages.terms;

  field.classList.toggle("invalid", Boolean(message));
  if (name !== "terms") field.setAttribute("aria-invalid", Boolean(message));
  getErrorElement(name).textContent = message;
  return !message;
}

function validateGender() {
  const selected = document.querySelector('input[name="gender"]:checked');
  const error = document.getElementById("gender-error");
  error.textContent = selected ? "" : messages.gender;
  return Boolean(selected);
}

Object.keys(fields).forEach((name) => {
  fields[name].addEventListener("input", () => validateField(name));
  fields[name].addEventListener("change", () => validateField(name));
});

document.querySelectorAll('input[name="gender"]').forEach((radio) => {
  radio.addEventListener("change", validateGender);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const valid = Object.keys(fields).every(validateField) && validateGender();

  if (!valid) {
    statusMessage.textContent = "Please correct the highlighted fields.";
    statusMessage.style.color = "var(--error)";
    const firstInvalid = form.querySelector(".invalid, input:not(:checked)[name='gender']");
    firstInvalid?.focus();
    return;
  }

  const membershipPlan = fields.membership.options[fields.membership.selectedIndex].text;
  statusMessage.textContent = `Application received for the ${membershipPlan} plan. We will contact you soon.`;
  statusMessage.style.color = "var(--success)";
  Object.keys(fields).forEach((name) => {
    fields[name].classList.remove("invalid");
    getErrorElement(name).textContent = "";
  });
  document.getElementById("gender-error").textContent = "";
});
const registrationForm = document.getElementById('registrationForm');
const registrationError = document.getElementById('registrationError');
const registrationSuccess = document.getElementById('registrationSuccess');

const storageKey = 'concertRegistration';

function getStoredData() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch (error) {
    return {};
  }
}

function saveLocalStorage(value) {
  localStorage.setItem(storageKey, JSON.stringify(value));
}

function saveSessionStorage(value) {
  sessionStorage.setItem('concertSession', JSON.stringify(value));
}

function markFieldInvalid(field) {
  field.classList.add('invalid');
}

function clearFieldInvalid(field) {
  field.classList.remove('invalid');
}

function validateRegistrationForm() {
  let isValid = true;
  const fields = [
    document.getElementById('fullName'),
    document.getElementById('email'),
    document.getElementById('phone'),
    document.getElementById('city'),
    document.getElementById('age'),
    document.getElementById('genre')
  ];

  fields.forEach((field) => {
    clearFieldInvalid(field);
    if (!field.value.trim()) {
      markFieldInvalid(field);
      isValid = false;
    }
  });

  const email = document.getElementById('email');
  if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    markFieldInvalid(email);
    isValid = false;
  }

  const age = document.getElementById('age');
  if (age.value && (Number(age.value) < 10 || Number(age.value) > 100)) {
    markFieldInvalid(age);
    isValid = false;
  }

  return isValid;
}

function fillRegistrationFormFromStorage() {
  const data = getStoredData();
  Object.entries(data).forEach(([key, value]) => {
    const field = document.getElementById(key);
    if (field) {
      field.value = value;
    }
  });
}

document.querySelectorAll('input, select, textarea').forEach((field) => {
  field.addEventListener('focus', () => {
    field.style.borderColor = '#111';
  });

  field.addEventListener('blur', () => {
    field.style.borderColor = '#e5e5e5';
    if (field.classList.contains('invalid')) {
      field.style.borderColor = '#d93025';
    }
  });

  field.addEventListener('input', () => clearFieldInvalid(field));
  field.addEventListener('change', () => clearFieldInvalid(field));
});

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  registrationError.style.display = 'none';
  registrationSuccess.style.display = 'none';

  if (!validateRegistrationForm()) {
    registrationError.textContent = 'Please complete all required registration fields correctly.';
    registrationError.style.display = 'block';
    return;
  }

  const formData = Object.fromEntries(new FormData(registrationForm).entries());
  saveLocalStorage(formData);
  saveSessionStorage(formData);

  registrationSuccess.textContent = `Registration successful for ${formData.fullName}!`;
  registrationSuccess.style.display = 'block';
});

fillRegistrationFormFromStorage();

window.addEventListener('storage', () => {
  fillRegistrationFormFromStorage();
});

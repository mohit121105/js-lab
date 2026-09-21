const workshopForm = document.getElementById('workshopForm');
const registrationError = document.getElementById('registrationError');
const registrationSuccess = document.getElementById('registrationSuccess');

const storageKey = 'technicalWorkshopCombined';

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
  sessionStorage.setItem('technicalWorkshopSession', JSON.stringify(value));
}

function markInvalid(field) {
  if (field) field.classList.add('invalid');
}

function clearInvalid(field) {
  if (field) field.classList.remove('invalid');
}

function validateWorkshopForm() {
  let valid = true;
  const fields = [
    document.getElementById('fullName'),
    document.getElementById('email'),
    document.getElementById('phone'),
    document.getElementById('college'),
    document.getElementById('course'),
    document.getElementById('year'),
    document.getElementById('track'),
    document.getElementById('experience'),
    document.getElementById('workshopDate'),
    document.getElementById('ticketType'),
    document.getElementById('quantity'),
    document.getElementById('mode')
  ];

  fields.forEach((field) => {
    clearInvalid(field);
    if (field && !field.value.trim()) {
      markInvalid(field);
      valid = false;
    }
  });

  const emailField = document.getElementById('email');
  if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
    markInvalid(emailField);
    valid = false;
  }

  const quantity = document.getElementById('quantity');
  if (quantity && quantity.value && (Number(quantity.value) < 1 || Number(quantity.value) > 10)) {
    markInvalid(quantity);
    valid = false;
  }

  const terms = document.getElementById('terms');
  if (terms && !terms.checked) {
    valid = false;
  }

  return valid;
}

function fillWorkshopFormFromStorage() {
  const data = getStoredData();
  Object.entries(data).forEach(([key, value]) => {
    const field = document.getElementById(key);
    if (field) field.value = value;
  });
}

if (workshopForm) {
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

    field.addEventListener('input', () => clearInvalid(field));
    field.addEventListener('change', () => clearInvalid(field));
  });

  workshopForm.addEventListener('submit', (event) => {
    event.preventDefault();
    registrationError.style.display = 'none';
    registrationSuccess.style.display = 'none';

    if (!validateWorkshopForm()) {
      registrationError.textContent = 'Please fill all required workshop and booking fields correctly.';
      registrationError.style.display = 'block';
      return;
    }

    const formData = Object.fromEntries(new FormData(workshopForm).entries());
    saveLocalStorage(formData);
    saveSessionStorage(formData);

    registrationSuccess.innerHTML = `Registration and booking successful for <strong>${formData.fullName}</strong>.<br> ${formData.quantity} ${formData.ticketType} pass(es) reserved for ${formData.workshopDate}.`;
    registrationSuccess.style.display = 'block';
  });

  fillWorkshopFormFromStorage();

  window.addEventListener('storage', () => {
    fillWorkshopFormFromStorage();
  });
}

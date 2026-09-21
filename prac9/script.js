const themeView = document.querySelector('#themeView');
const loginView = document.querySelector('#loginView');
const themeCards = document.querySelectorAll('.theme-card');
const continueButton = document.querySelector('#continueButton');
const clearPreference = document.querySelector('#clearPreference');
const backButton = document.querySelector('#backButton');
const studentForm = document.querySelector('#studentForm');
const themeStatus = document.querySelector('#themeStatus');
const formStatus = document.querySelector('#formStatus');

const savedLocalTheme = localStorage.getItem('campus-theme');
const savedSessionTheme = sessionStorage.getItem('campus-theme');
let selectedTheme = savedLocalTheme === 'dark' ? 'dark' : savedSessionTheme === 'light' ? 'light' : null;

function setTheme(theme) {
  selectedTheme = theme;
  document.documentElement.dataset.theme = theme;
  if (theme === 'dark') {
    localStorage.setItem('campus-theme', theme);
    sessionStorage.removeItem('campus-theme');
  } else {
    sessionStorage.setItem('campus-theme', theme);
    localStorage.removeItem('campus-theme');
  }
  themeCards.forEach((card) => {
    const isSelected = card.dataset.theme === theme;
    card.classList.toggle('selected', isSelected);
    card.setAttribute('aria-checked', String(isSelected));
  });
  continueButton.disabled = false;
  themeStatus.textContent = `${theme[0].toUpperCase()}${theme.slice(1)} theme selected.`;
}

function showLogin() {
  themeView.hidden = true;
  loginView.hidden = false;
  window.location.hash = 'student-login';
  document.querySelector('input[name="firstName"]').focus();
}

function showThemePicker() {
  loginView.hidden = true;
  themeView.hidden = false;
  window.location.hash = 'theme';
  themeStatus.textContent = selectedTheme ? `${selectedTheme[0].toUpperCase()}${selectedTheme.slice(1)} theme selected.` : '';
}

themeCards.forEach((card) => card.addEventListener('click', () => setTheme(card.dataset.theme)));
continueButton.addEventListener('click', showLogin);
backButton.addEventListener('click', showThemePicker);

clearPreference.addEventListener('click', () => {
  localStorage.removeItem('campus-theme');
  sessionStorage.removeItem('campus-theme');
  selectedTheme = null;
  document.documentElement.removeAttribute('data-theme');
  themeCards.forEach((card) => {
    card.classList.remove('selected');
    card.setAttribute('aria-checked', 'false');
  });
  continueButton.disabled = true;
  themeStatus.textContent = 'Preference cleared.';
});

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!studentForm.checkValidity()) {
    studentForm.reportValidity();
    formStatus.textContent = 'Please complete every field.';
    return;
  }
  formStatus.textContent = 'Details saved. Welcome to Campus Access.';
});

if (selectedTheme) setTheme(selectedTheme);
if (window.location.hash === '#student-login') showLogin();

const form = document.querySelector('#signup-form');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const birthday = document.querySelector('#birthday');
const website = document.querySelector('#website');
const formStatus = document.querySelector('#form-status');

birthday.max = new Date().toISOString().split('T')[0];

website.addEventListener('focus', () => {
	formStatus.className = 'status';
	formStatus.textContent = 'Enter a complete website address, such as https://example.com.';
});

website.addEventListener('change', () => {
	website.setCustomValidity('');

	if (website.value && !website.checkValidity()) {
		website.setCustomValidity('Enter a complete website address starting with https:// or http://.');
		formStatus.className = 'status error';
		formStatus.textContent = 'Please enter a valid website address.';
		return;
	}

	formStatus.className = 'status';
	formStatus.textContent = '';
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
	formStatus.className = 'status';
	formStatus.textContent = '';
	confirmPassword.setCustomValidity('');

	if (password.value !== confirmPassword.value) {
		confirmPassword.setCustomValidity('Passwords do not match.');
	}

	if (!form.checkValidity()) {
		form.reportValidity();
		formStatus.className = 'status error';
		formStatus.textContent = 'Please check the highlighted fields and try again.';
		return;
	}

	formStatus.className = 'status success';
	formStatus.textContent = 'Your account details are ready to be submitted.';
});

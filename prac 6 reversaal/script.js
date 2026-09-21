const inputText = document.getElementById('inputText');
const reverseBtn = document.getElementById('reverseBtn');
const result = document.getElementById('result');

function reverseString(str) {
  return str.split('').reverse().join('');
}

function handleReverse() {
  const value = inputText.value.trim();

  if (value === '') {
    result.textContent = 'Please enter some text.';
    return;
  }

  result.textContent = reverseString(value);
}

reverseBtn.addEventListener('click', handleReverse);

inputText.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    handleReverse();
  }
});

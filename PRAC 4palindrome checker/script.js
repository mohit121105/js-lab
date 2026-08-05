function reverseString(str) {
    return str.split("").reverse().join("");
}

function message() {
    var msg = "Palindrome Checker";

    function display() {
        return msg;
    }

    return display;
}

var showMessage = message();
document.getElementById("heading").innerHTML = showMessage();

function checkPalindrome() {
    var word = document.getElementById("word").value.trim();

    if (word === "") {
        document.getElementById("result").innerHTML = "Please enter a word.";
        return;
    }

    var reversed = reverseString(word);

    if (word.toLowerCase() === reversed.toLowerCase()) {
        document.getElementById("result").innerHTML = '"' + word + '" is a Palindrome.';
    } else {
        document.getElementById("result").innerHTML = '"' + word + '" is Not a Palindrome.';
    }
}
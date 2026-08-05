function validateRegistration() {

    const reg = document.getElementById("regNo").value.trim();
    const result = document.getElementById("result");

    try {

        if (reg === "") {
            throw "Registration number should not be empty.";
        }

        if (reg.length !== 10) {
            throw "Registration number must contain exactly 10 characters.";
        }

        if (!/^[A-Z]{2}/.test(reg)) {
            throw "First two characters must be uppercase alphabets (State Code).";
        }

        if (!/^[A-Z]{2}[0-9]{2}/.test(reg)) {
            throw "District code must contain two digits.";
        }

        if (!/^[A-Z]{2}[0-9]{2}[A-Z]{2}/.test(reg)) {
            throw "Series must contain two uppercase alphabets.";
        }

        if (!/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/.test(reg)) {
            throw "Last four characters must be digits.";
        }

        result.style.color = "green";
        result.innerHTML = "✔ Registration Number is VALID";

    }
    catch(error) {

        result.style.color = "red";
        result.innerHTML = "✖ " + error;

    }

}
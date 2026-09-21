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

        for (let i = 0; i < 2; i++) {
            let ch = reg.charCodeAt(i);
            if (ch < 65 || ch > 90) {
                throw "First two characters must be uppercase alphabets (State Code).";
            }
        }

        for (let i = 2; i < 4; i++) {
            let ch = reg.charCodeAt(i);
            if (ch < 48 || ch > 57) {
                throw "District code must contain two digits.";
            }
        }

        for (let i = 4; i < 6; i++) {
            let ch = reg.charCodeAt(i);
            if (ch < 65 || ch > 90) {
                throw "Series must contain two uppercase alphabets.";
            }
        }

        for (let i = 6; i < 10; i++) {
            let ch = reg.charCodeAt(i);
            if (ch < 48 || ch > 57) {
                throw "Last four characters must be digits.";
            }
        }

        result.style.color = "green";
        result.innerHTML = "✔ Registration Number is VALID";

    }
    catch (error) {

        result.style.color = "red";
        result.innerHTML = "✖ " + error;

    }

}
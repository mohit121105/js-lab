const inputText = document.getElementById("inputText");
const processBtn = document.getElementById("processBtn");
const message = document.getElementById("message");
const results = document.getElementById("results");

const studentName = document.getElementById("studentName");
const emailAddress = document.getElementById("emailAddress");
const emailStatus = document.getElementById("emailStatus");
const phoneNumber = document.getElementById("phoneNumber");
const phoneStatus = document.getElementById("phoneStatus");
const department = document.getElementById("department");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const processedText = document.getElementById("processedText");

processBtn.addEventListener("click", processText);

function processText() {

    const text = inputText.value.trim();

    if (!text) {
        showMessage("Please enter student information.", false);
        results.classList.add("hidden");
        return;
    }

    const nameRegex =
        /(?:my\s+name\s+is|student\s+name\s+is|name\s+is)\s+([A-Za-z]+(?:\s+[A-Za-z]+)*)/i;

    const emailRegex =
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

    const phoneRegex =
        /(?:phone|mobile|contact(?:\s+number)?)\s*(?:number)?\s*(?:is|:)?\s*(\d{10})\b/i;

    const departmentRegex =
        /(?:department\s*(?:is|:)?\s*(computer\s+science|information\s+technology|electronics\s+and\s+telecommunication|mechanical\s+engineering|civil\s+engineering)|((?:computer\s+science|information\s+technology|electronics\s+and\s+telecommunication|mechanical\s+engineering|civil\s+engineering))\s+department)/i;

    const nameMatch = text.match(nameRegex);
    const emailMatch = text.match(emailRegex);
    const phoneMatch = text.match(phoneRegex);
    const departmentMatch = text.match(departmentRegex);

    const extractedName = nameMatch
        ? nameMatch[1].trim()
        : "Not found";

    const extractedEmail = emailMatch
        ? emailMatch[0]
        : "Not found";

    const extractedPhone = phoneMatch
        ? phoneMatch[1]
        : "Not found";

    const extractedDepartment = departmentMatch
        ? (departmentMatch[1] || departmentMatch[2])
        : "Not found";

    const emailValidationRegex =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const isEmailValid =
        extractedEmail !== "Not found" &&
        emailValidationRegex.test(extractedEmail);

    const phoneValidationRegex =
        /^\d{10}$/;

    const isPhoneValid =
        extractedPhone !== "Not found" &&
        phoneValidationRegex.test(extractedPhone);

    const words = text.match(/\S+/g);

    const totalWords =
        words ? words.length : 0;

    const totalCharacters =
        text.replace(/\s/g, "").length;

    let lowerCaseText =
        text.toLowerCase();

    lowerCaseText =
        lowerCaseText.replace(
            /computer\s+science/gi,
            "information technology"
        );

    let updatedDepartment =
        extractedDepartment;

    if (/computer\s+science/i.test(updatedDepartment)) {
        updatedDepartment =
            "Information Technology";
    }

    studentName.textContent =
        extractedName;

    emailAddress.textContent =
        extractedEmail;

    emailStatus.textContent =
        isEmailValid
            ? "Valid"
            : "Invalid";

    emailStatus.className =
        isEmailValid
            ? "valid"
            : "invalid";

    phoneNumber.textContent =
        extractedPhone;

    phoneStatus.textContent =
        isPhoneValid
            ? "Valid (10 digits)"
            : "Invalid";

    phoneStatus.className =
        isPhoneValid
            ? "valid"
            : "invalid";

    department.textContent =
        updatedDepartment;

    wordCount.textContent =
        totalWords;

    charCount.textContent =
        totalCharacters;

    processedText.textContent =
        lowerCaseText;

    results.classList.remove("hidden");

    showMessage(
        "Information extracted successfully.",
        true
    );
}

function showMessage(text, success) {

    message.textContent = text;

    message.className =
        success
            ? "success-message"
            : "error-message";
}
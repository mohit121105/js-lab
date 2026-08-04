function findGrade() {

    let marks = Number(document.getElementById("marks").value);
    let result = document.getElementById("result");

    if (marks === "" || isNaN(marks) || marks < 0 || marks > 100) {
        result.textContent = "Enter valid marks between 0 and 100";
        result.style.color = "#dc2626";
        return;
    }

    if (marks < 50) {
        result.textContent = "Result: Fail";
        result.style.color = "#dc2626";
    }
    else if (marks >= 50 && marks <= 65) {
        result.textContent = "Grade: C";
        result.style.color = "#d97706";
    }
    else if (marks >= 66 && marks <= 80) {
        result.textContent = "Grade: B";
        result.style.color = "#2563eb";
    }
    else if (marks >= 81 && marks <= 90) {
        result.textContent = "Grade: A";
        result.style.color = "#16a34a";
    }
    else {
        result.textContent = "Grade: A+";
        result.style.color = "#15803d";
    }

}
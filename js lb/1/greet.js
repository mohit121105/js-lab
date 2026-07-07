function greet() {
    var name = document.getElementById("studentName").value;
    var roll = document.getElementById("studentRoll").value;
    var branch = document.getElementById("studentBranch").value;
    
    console.log("Name: " + name);
    console.log("Roll No: " + roll);
    console.log("Branch: " + branch);
    
    alert("Welcome to SIT, " + name + "!\nRoll No: " + roll + "\nBranch: " + branch);
}

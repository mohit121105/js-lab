const form = document.getElementById("loginForm");

const prn = document.getElementById("prn");
const email = document.getElementById("email");
const batch = document.getElementById("batch");
const username = document.getElementById("username");
const password = document.getElementById("password");

const prnError = document.getElementById("prnError");
const emailError = document.getElementById("emailError");
const batchError = document.getElementById("batchError");
const userError = document.getElementById("userError");
const passError = document.getElementById("passError");
const strength = document.getElementById("strength");
const success = document.getElementById("success");

password.addEventListener("input", checkStrength);

function checkStrength(){

    let value = password.value;

    let upper = false;
    let lower = false;
    let number = false;
    let special = false;

    for(let i=0;i<value.length;i++){

        let ch = value.charAt(i);

        if(ch>='A' && ch<='Z'){
            upper = true;
        }
        else if(ch>='a' && ch<='z'){
            lower = true;
        }
        else if(ch>='0' && ch<='9'){
            number = true;
        }
        else{
            special = true;
        }

    }

    let score = 0;

    if(value.length>=8){
        score++;
    }

    if(upper){
        score++;
    }

    if(lower){
        score++;
    }

    if(number){
        score++;
    }

    if(special){
        score++;
    }

    if(value.length==0){
        strength.textContent="";
    }
    else if(score<=2){
        strength.textContent="Strength : Weak";
        strength.style.color="red";
    }
    else if(score<=4){
        strength.textContent="Strength : Medium";
        strength.style.color="orange";
    }
    else{
        strength.textContent="Strength : Strong";
        strength.style.color="green";
    }

}

form.addEventListener("submit",function(e){

    e.preventDefault();

    prnError.textContent="";
    emailError.textContent="";
    batchError.textContent="";
    userError.textContent="";
    passError.textContent="";
    success.textContent="";

    let valid=true;

    let prnValue=prn.value.trim();
    let emailValue=email.value.trim();
    let batchValue=batch.value;
    let usernameValue=username.value.trim();
    let passwordValue=password.value;

    if(prnValue.length<10 || prnValue.length>15){

        prnError.textContent="PRN must contain 10 to 15 digits.";
        valid=false;

    }
    else{

        for(let i=0;i<prnValue.length;i++){

            let ch=prnValue.charAt(i);

            if(ch<'0' || ch>'9'){
                prnError.textContent="PRN must contain only digits.";
                valid=false;
                break;
            }

        }

    }

    if(emailValue.length==0){

        emailError.textContent="Enter Email Address.";
        valid=false;

    }

    let atCount=0;
    let dotCount=0;

    for(let i=0;i<emailValue.length;i++){

        if(emailValue.charAt(i)=="@"){
            atCount++;
        }

        if(emailValue.charAt(i)=="."){
            dotCount++;
        }

    }

    if(atCount!=1 || dotCount<1){

        emailError.textContent="Enter a valid Email Address.";
        valid=false;

    }

    if(emailValue.indexOf("@")==0){

        emailError.textContent="Invalid Email Address.";
        valid=false;

    }

    if(emailValue.lastIndexOf(".")<emailValue.indexOf("@")){

        emailError.textContent="Invalid Email Address.";
        valid=false;

    }

    if(batchValue==""){

        batchError.textContent="Select Batch.";
        valid=false;

    }
        if(usernameValue.length < 4 || usernameValue.length > 20){

        userError.textContent = "Username must be 4 to 20 characters.";
        valid = false;

    }
    else{

        for(let i = 0; i < usernameValue.length; i++){

            let ch = usernameValue.charAt(i);

            if(
                !(
                    (ch >= 'A' && ch <= 'Z') ||
                    (ch >= 'a' && ch <= 'z') ||
                    (ch >= '0' && ch <= '9') ||
                    ch == '_'
                )
            ){
                userError.textContent = "Only letters, numbers and _ are allowed.";
                valid = false;
                break;
            }

        }

    }

    let upper = false;
    let lower = false;
    let number = false;
    let special = false;

    for(let i = 0; i < passwordValue.length; i++){

        let ch = passwordValue.charAt(i);

        if(ch >= 'A' && ch <= 'Z'){
            upper = true;
        }
        else if(ch >= 'a' && ch <= 'z'){
            lower = true;
        }
        else if(ch >= '0' && ch <= '9'){
            number = true;
        }
        else{
            special = true;
        }

    }

    if(passwordValue.length < 8){

        passError.textContent = "Password must contain at least 8 characters.";
        valid = false;

    }
    else if(!upper){

        passError.textContent = "Password must contain an uppercase letter.";
        valid = false;

    }
    else if(!lower){

        passError.textContent = "Password must contain a lowercase letter.";
        valid = false;

    }
    else if(!number){

        passError.textContent = "Password must contain a number.";
        valid = false;

    }
    else if(!special){

        passError.textContent = "Password must contain a special character.";
        valid = false;

    }

    if(valid){

        localStorage.setItem("prn", prnValue);
        localStorage.setItem("email", emailValue);
        localStorage.setItem("batch", batchValue);
        localStorage.setItem("username", usernameValue);

        success.style.color = "green";
        success.textContent = "Login Successful";

        setTimeout(function(){

            window.location.href = "grading.html";

        },1500);

    }

});
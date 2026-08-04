const studentName = localStorage.getItem("username");
const studentPRN = localStorage.getItem("prn");
const studentBatch = localStorage.getItem("batch");

if(document.getElementById("studentName")){
    document.getElementById("studentName").textContent = studentName || "-";
}

if(document.getElementById("studentPRN")){
    document.getElementById("studentPRN").textContent = studentPRN || "-";
}

if(document.getElementById("studentBatch")){
    document.getElementById("studentBatch").textContent = studentBatch || "-";
}

function getGrade(mark){

    if(mark>=90){
        return "A+";
    }

    if(mark>=80){
        return "A";
    }

    if(mark>=66){
        return "B";
    }

    if(mark>=50){
        return "C";
    }

    return "Fail";

}

function calculateGrades(){

    const marks=[
        Number(document.getElementById("math").value),
        Number(document.getElementById("physics").value),
        Number(document.getElementById("chemistry").value),
        Number(document.getElementById("english").value),
        Number(document.getElementById("computer").value)
    ];

    const gradeIds=[
        "g1",
        "g2",
        "g3",
        "g4",
        "g5"
    ];

    let total=0;
    let pass=true;

    for(let i=0;i<marks.length;i++){

        if(isNaN(marks[i]) || marks[i]<0 || marks[i]>100){

            alert("Please enter valid marks between 0 and 100 for all subjects.");
            return;

        }

        const grade=getGrade(marks[i]);

        const cell=document.getElementById(gradeIds[i]);

        cell.textContent=grade;

        if(grade==="A+"){
            cell.style.color="#2e7d32";
        }
        else if(grade==="A"){
            cell.style.color="#43a047";
        }
        else if(grade==="B"){
            cell.style.color="#fb8c00";
        }
        else if(grade==="C"){
            cell.style.color="#1976d2";
        }
        else{
            cell.style.color="#d32f2f";
            pass=false;
        }

        total+=marks[i];

    }

    const average=(total/marks.length).toFixed(2);

    document.getElementById("average").textContent=average;

    const overall=getGrade(Number(average));

    document.getElementById("overallGrade").textContent=overall;

    document.getElementById("result").textContent=pass?"PASS":"FAIL";

    document.getElementById("result").style.color=pass?"#2e7d32":"#d32f2f";

}

function resetForm(){

    const inputs=["math","physics","chemistry","english","computer"];

    const grades=["g1","g2","g3","g4","g5"];

    inputs.forEach(function(id){
        document.getElementById(id).value="";
    });

    grades.forEach(function(id){
        document.getElementById(id).textContent="-";
        document.getElementById(id).style.color="#222";
    });

    document.getElementById("average").textContent="0";
    document.getElementById("overallGrade").textContent="-";
    document.getElementById("result").textContent="-";
    document.getElementById("result").style.color="#222";

}

function logout(){

    localStorage.clear();

    window.location.href="index.html";

}
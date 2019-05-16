let RESULT = 0;
let EXPRESSION = "";
let HISTORY = [];

function inputExpression(value) {
    EXPRESSION += value;
    updateInput(value);
    debugger;
}

function clearEntry(){
    // let resultDisplay = document.querySelector(".calculator .result");
    let input = document.querySelector(".calc-head input");

    EXPRESSION = "";
    input.value = ""
}

function evaluate(){
    let resultDisplay = document.querySelector(".calculator .result");
    let total = eval(EXPRESSION);
    resultDisplay.textContent = total;
    HISTORY.push(EXPRESSION);
    clearEntry();
    debugger;
}

function validateInput(event){
    const value = event.target.value;
    let pattern = /([0-9]|[\/+\-%*)(.])+/;

    if(value.match(pattern)){
        inputExpression(value);
    } else {
        event.target.value=""
    }
}

function updateInput(value){
    document.querySelector(".calc-head input").value += value;
}


function init() {
    let input = document.querySelector(".calc-head input");
    input.addEventListener('input', validateInput);

    let calcBody = document.querySelector(".calc-body");
    // Add event listners on all buttons except
    for(let child of calcBody.children){
        child.addEventListener('click', validateInput);
    }

    let equals = document.querySelector("button.equals");
    equals.addEventListener('click',evaluate);
}


init();
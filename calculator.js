let RESULT = 0;
let EXPRESSION = "";
let HISTORY = [];

function calculate(expression) {

}

function inputExpression(event) {
    EXPRESSION += event.target.value;
}

function inputChange(event) {
    EXPRESSION = event.text.content;
}

function evaluate(){
    return eval(EXPRESSION);
}

function validateInput(event){
    const value = event.target.value;
    let pattern ="";

    //TODO
}

function init() {
    let input = document.querySelector(".calc-head input");
    input.addEventListener('input', inputExpression);
}


init();
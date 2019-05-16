let RESULT = 0;
let EXPRESSION = "";
let HISTORY = [];

function calculate(expression) {

}

function inputNumber(event) {
    EXPRESSION += event.target.value;
}

function inputChange(event) {
    EXPRESSION = event.text.content;
}

function init() {
    let input = document.querySelector(".calc-head input");
    input.addEventListener('input', inputChange);
}


init();
let RESULT = 0;
let EXPRESSION = "";
let HISTORY = [];

function calculate(expression) {

}

function inputExpression(value) {
    EXPRESSION += value;
}
}

function evaluate(){
    return eval(EXPRESSION);
}

function validateInput(event){
    const value = event.target.value;
    let pattern = /([A-Z]*)(?!CE)\w+/;

    if(!value.match(pattern)) inputExpression(value);
}


function init() {
    let input = document.querySelector(".calc-head input");
    input.addEventListener('input', validateInput);

    let calcBody = document.querySelector(".calc-body");
    // Add event listners on all buttons except
    for(let child of calcBody.children){
        child.addEventListener('click', validateInput);
    }
}


init();
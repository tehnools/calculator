let TOTAL = 0;
let TEMP = "";
let ENTRIES = [];
let HISTORY = [];

function evaluate() {
    //TODO
    return;
}
function clearAll() {
    //TODO
    return;
}
function clearEntry() {
    //TODO
    return;
}

function sortEval(value){
    switch (value) {
        case "=":
            evaluate();
            break;
        case "AC":
            clearAll();
            break;
        case "CE":
            clearEntry();
            break;
    }
}

function validateInput(event) {
    const value = event.target.value;
    const regOperators = /[\/*%+\-]/;
    const regEval = /[CE|AC|=]/

    if (!isNaN(value)) {
        TEMP += value;
        debugger;
        updateInput(TEMP)
    } else if (value.match(regOperators)) {
        ENTRIES.push(TEMP);
        ENTRIES.push(value);
        TEMP = 0;
        debugger;
    } else if(value.match(regEval)){
        sortEval(value);
    } else {
        updateInput("NaN")
    }

}

function updateInput(value) {
    document.querySelector(".calc-head input").value = value;
}

function init() {
    let input = document.querySelector(".calc-head input");
    input.addEventListener('input', validateInput);

    // Check Input
    document.body.addEventListener('click', validateInput);
}


init();
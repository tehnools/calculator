let TOTAL = 0;
let TEMP = "";
let ENTRIES = [];
let HISTORY = [];

function evaluate() {
    //TODO
    return;
}
function clearAll() {
    ENTRIES = []
    TOTAL = 0;
    clearEntry();
    clearDisplay();
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

    //REGEX
    const regOperators = /[\/*%+\-]/;
    const regEval = /[CE|AC|=]/

    if (!isNaN(value)) {
        TEMP += value;
        updateInput(TEMP)
    } else if (value.match(regOperators)) {
        // Operators go here
        ENTRIES.push(TEMP);
        ENTRIES.push(value);
        TEMP = 0;
    } else if(value.match(regEval)){
        // Evaluation and Deletion
        sortEval(value);
    } else {
        // All Invalid values
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
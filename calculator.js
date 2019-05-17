let TOTAL = 0;
let TEMP = "";
let ENTRIES = [];
let HISTORY = [];

function evaluate() {
    ENTRIES.reverse()
   
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
    TEMP = "";
    updateInput(TEMP);
    return;
}

function sortEval(value) {
    switch (value) {
        case "=":
            if (!isNaN(TEMP)) ENTRIES.push(TEMP);
            if (!isNaN(ENTRIES[-1])) ENTRIES.splice(-1, 1);
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
    const regOperators = /[\/*%.+\-]/;
    const regEval = /[CE|AC|=]/

    if (!isNaN(value)) {
        TEMP += value;
        updateInput(TEMP)
    } else if (value.match(regOperators)) {
        // Operators go here
        addEntry(value);
        updateDisplay();
        TEMP = "";
        updateInput(TEMP);
    } else if (value.match(regEval)) {
        // Evaluation and Deletion
        sortEval(value);
    } else {
        // All Invalid values
        updateInput("NaN")
    }
}

function addEntry(value) {
    ENTRIES.push(TEMP);
    ENTRIES.push(value);
}

function updateInput(value) {
    document.querySelector(".calc-head input").value = value;
}

function updateDisplay() {
    let resultDisplay = document.querySelector('.result');
    resultDisplay.textContent = ENTRIES.join(" ");
}

function clearDisplay() {
    let resultDisplay = document.querySelector('.result');
    resultDisplay.textContent = "";
}

function clearAll() {
    ENTRIES = []
    TOTAL = 0;
    clearEntry();
    clearDisplay();
    return;
}

function clearEntry() {
    TEMP = "";
    updateInput(TEMP);
    return;
}

function init() {
    let calcBody = document.querySelector('.calc-body');
    let input = document.querySelector(".calc-head input");
    input.addEventListener('input', validateInput);

    // Check Input
    for (let child of calcBody.children) {
        child.addEventListener('click', validateInput);
    }
}

init();
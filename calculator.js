let TOTAL = 0;
let TEMP = "";
let ENTRIES = [];
let HISTORY = [];


function evaluate() {
    let entries = [...ENTRIES];

    removeEntry = (index, answer) => {
        entries.splice(index + 2, 0, answer);
        entries.splice(index - 1, 3);
    }

    sum = (i) => {
        return Number(entries[i - 1]) + Number(entries[i + 1]);
    }

    diff = (i) => {
        return Number(entries[i - 1]) - Number(entries[i + 1]);
    }

    multiply = (i) => {
        return Number(entries[i - 1]) * Number(entries[i + 1]);
    }

    divide = (i) => {
        return Number(entries[i - 1]) / Number(entries[i + 1]);
    }

    let i = -1;
    while (entries.length > 1) {
        if (entries.includes("*")) {
            i = entries.indexOf("*");
            removeEntry(i, multiply(i))
        } else if (entries.includes("/")) {
            i = entries.indexOf("/");
            removeEntry(i, divide(i))
        }
        else if (entries.includes("+")) {
            i = entries.indexOf("+")
            removeEntry(i, sum(i))
        } else if (entries.includes("-")) {
            i = entries.indexOf("-")
            removeEntry(i, diff(i))
        }
    }
    return entries.pop();
}

function sortEval(value) {

    completeEval = () => {
        TOTAL = evaluate();
        updateDisplay();
        clearInput();
        ENTRIES = [];
        TOTAL = 0;
        HISTORY.push(TOTAL)
    }

    switch (value) {
        case "=":
            if (!isNaN(TEMP)) ENTRIES.push(TEMP);
            if (!isNaN(ENTRIES[-1])) ENTRIES.splice(-1, 1);
            completeEval();
            break;
        case "AC":
            clearAll();
            break;
        case "CE":
            clearInput();
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
        clearInput();
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
    clearInput();
    clearDisplay();
    return;
}

function clearInput() {
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
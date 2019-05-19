// Globals denoted with CAPS
let TOTAL = 0;
let TEMP = "";
let ENTRIES = [];
let HISTORY = [];

// Push value to Entry
function addEntry(value) {
    ENTRIES.push(TEMP);
    ENTRIES.push(value);
}


// Change value of Display Input
function updateInput(value) {
    document.querySelector(".calc-head input").value = value;
}

// Update result Display on top of Input
function updateDisplay() {
    let resultDisplay = document.querySelector('.result');
    resultDisplay.textContent = ENTRIES.join(" ") + " = ";
}

// Clears The top display
function clearDisplay() {
    let resultDisplay = document.querySelector('.result');
    resultDisplay.textContent = "";
}

// Clears Whole Display
function clearAll() {
    ENTRIES = []
    TOTAL = 0;
    clearInput();
    clearDisplay();
    return;
}

// Clears all Input
function clearInput() {
    TEMP = "";
    updateInput(TEMP);
    return;
}


// Performs evaluation of all entries follwing EDMAS
function evaluate() {
    let entries = [...ENTRIES];

    // Remove Entry
    removeEntry = (index, answer) => {
        entries.splice(index + 2, 0, answer);
        entries.splice(index - 1, 3);
    }
    // Basic Sum
    sum = (i) => {
        return Number(entries[i - 1]) + Number(entries[i + 1]);
    }
    // Basic Subtract
    diff = (i) => {
        return Number(entries[i - 1]) - Number(entries[i + 1]);
    }
    // Basic Multiply
    multiply = (i) => {
        return Number(entries[i - 1]) * Number(entries[i + 1]);
    }
    // Divide, reduce long floats
    divide = (i) => {
        let answer = Number(entries[i - 1]) / Number(entries[i + 1]);
        if (typeof answer === 'number' && !Number.isInteger(answer)) {
            return answer.toFixed(4);
        }
        return answer;
    }

    // Perform calculation till evaluations is length 1
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

// Handler that filters input values
    // Get button value

    // Completes evaluation
    completeEval = () => {
        TOTAL = evaluate();
        updateDisplay();
        clearInput();
        ENTRIES = [];
        TEMP = TOTAL;
        TOTAL = 0;
        HISTORY.push(TOTAL)
        if (typeof TEMP && !Number.isInteger(TEMP)) {
        // Updates Input to Answer
            updateInput(TEMP.toFixed(4))
        } else {
            updateInput(TEMP);
        }
    }

    // Adds Entry and updates display
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

    // Check for numbers first then check for operators
    const value = event.target.value;
    //REGEX
    const regOperators = /[\/*+\-]/;
    const regEval = /[CE|AC|=]/

    if (!isNaN(value)) {
        TEMP += value;
        updateInput(TEMP)
    } else if (value.match(regOperators)) {
        // Add entries based on operator value
        addEntry(value);
        updateDisplay();
        clearInput();
    } else if (value.match(regEval)) {
        // Evaluation and Deletion
        sortEval(value);
    } else if (value === "%") {
        TEMP = TEMP / 100;
        updateInput(TEMP);
    } else if (value === '.') {
        TEMP += '.'
        updateInput(TEMP)
    }
    else {
                updateInput("NaN")
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
    resultDisplay.textContent = ENTRIES.join(" ") + " = ";
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
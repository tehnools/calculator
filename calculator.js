// Globals denoted with CAPS
let TOTAL = 0;
let TEMP = "";
let ENTRIES = [];
let HISTORY = [];


// History Object
// {
//     equation: String,
//     total: Number
// }


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

// Builds History Card
function buildHistoryCard(leftTag, equals, rightTag) {
    let historyCard = document.createElement('div');
    historyCard.className = "history-card";
    historyCard.appendChild(leftTag);
    historyCard.appendChild(equals);
    historyCard.appendChild(rightTag);
    return historyCard;
}

function updateHistory() {
    // Ensure history div is always Empty
    let history = document.querySelector(".history");
    history.innerHTML = "";
    for (let calculation of HISTORY) {
        let leftTag = document.createElement('a');
        leftTag.className = "tag";
        leftTag.textContent = calculation.equation;
        let equals = document.createElement('span');
        equals.textContent = "=";
        let rightTag = document.createElement('a');
        rightTag.className = "tag";
        rightTag.textContent = calculation.total;
        // Append History to history parent
        let historyCard = buildHistoryCard(leftTag, equals, rightTag);
        history.append(historyCard);
    }
}

function toggleHistory() {
    let calcHistory = document.querySelector(".calc-history");
    calcHistory.classList.toggle('hidden');
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

    // Remove Entry based on operator index
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

    // When Entries length === 1 result is computed
    while (entries.length > 1) {
        // Calculate in Order of left to right according to bedmas
        for (let i = 0; i < entries.length; i++) {
            if (!entries.includes("*") && !entries.includes("/")) {
                switch (entries[i]) {
                    case "+":
                        removeEntry(i, sum(i))
                        break;
                    case "-":
                        removeEntry(i, diff(i))
                        break;
                    default:
                        continue;
                }
            } else {
                switch (entries[i]) {
                    case "*":
                        removeEntry(i, multiply(i))
                        break;
                    case "/":
                        removeEntry(i, divide(i))
                        break;
                    default:
                        continue;
                }
            }
        }


    }
    return entries.pop();
}

// Handler that filters input values
function validateInput(event) {
    // Get button value
    const value = event.target.value;

    addHistory = () => {
        HISTORY.push(
            {
                equation: ENTRIES.join(" "),
                total: TOTAL
            })
    }

    // Completes evaluation
    completeEval = () => {
        TOTAL = evaluate();
        updateDisplay();
        clearInput();
        // Add history and Update It.
        addHistory();
        updateHistory()
        ENTRIES = [];
        // Set TEMP to TOTAL
        TEMP = TOTAL;
        // Add to history
        TOTAL = 0;


        // Updates Input to Answer
        if (typeof TEMP === Number && !Number.isInteger(TEMP)) {
            updateInput(TEMP.toFixed(4))
        } else {
            updateInput(TEMP);
        }
    }

    // Adds Entry and updates display
    completeEntry = (value) => {
        addEntry(value);
        updateDisplay();
        clearInput();
    }

    // Check for numbers first then check for operators
    if (!isNaN(value)) {
        TEMP += value;
        updateInput(TEMP)
    } else {
        // Add entries based on operator value
        switch (value) {
            case "/":
                completeEntry(value)
                break;
            case "*":
                completeEntry(value)
                break;
            case "-":
                completeEntry(value)
                break;
            case "+":
                completeEntry(value)
                break;
            case "CE":
                clearInput();
                break;
            case "AC":
                clearAll();
                break;
            case "=":
                // Removes rogue operators
                if (!isNaN(TEMP)) ENTRIES.push(TEMP);
                if (!isNaN(ENTRIES[-1])) ENTRIES.splice(-1, 1);
                // Complete Evaluation
                completeEval();
                break;
            case "%":
                TEMP = TEMP / 100;
                updateInput(TEMP);
                break;
            case '.':
                TEMP += '.'
                updateInput(TEMP)
                break;
            default:
                updateInput("NaN")
                break;
        }
    }
}

// Init us the main function to be called at the start
function init() {
    let calcBody = document.querySelector('.calc-body');
    // Add event listeners to all buttons
    for (let child of calcBody.children) {
        child.addEventListener('click', validateInput);
    }
}

// Init Called
init();
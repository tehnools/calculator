let TOTAL = 0;
let TEMP = "";
let ENTRIES = [];
let HISTORY = [];

function evaluate() {
    //TODO
    continue;
}
function clearAll() {
    //TODO
    continue;
}
function clearEntry() {
    //TODO
    continue;
}

function validateInput(event) {
    const value = event.target.value;
    const reg = /[\/*%+\-]/;

    if (!isNaN(value)) {
        TEMP += value;
        updateInput(TEMP)
    } else if (value.match(reg)) {
        ENTRIES.push(TEMP);
        ENTRIES.push(value);
        TEMP = 0;
        debugger;
    } else {
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
    updateInput("NaN")

}
//     document.querySelector(".calc-head input").value += value;
// }

function updateInput(value) {
    document.querySelector(".calc-head input").value = value;
}

function init() {
    let input = document.querySelector(".calc-head input");
    input.addEventListener('input', validateInput);

    // Check Input
    document.body.addEventListener('click', validateInput);
    // let calcBody = document.querySelector(".calc-body");
    // // Add event listners on all buttons except
    // for(let child of calcBody.children){
    //     child.addEventListener('click', validateInput);
    // }

    // let equals = document.querySelector("button.equals");
    // equals.addEventListener('click',evaluate);
}


init();
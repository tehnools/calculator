const PLUS_MINUS = 1, TIMES_DIVIDE_MOD = 2;


function infixToPostfix(entries) {
    // Temp Stack
    let stack = [];
    let postfix = "";

    // Helps find Precednce
    precedence = (char) => {
        if (char === '+' || char === '-') {
            return PLUS_MINUS;              //Precedence of + or - is 1
        } else if (char === '*' || char === '/' || char === '%') {
            return TIMES_DIVIDE_MOD;            //Precedence of * or / is 2
        } else {
            return 0;
        }
    }

    for (let char in entries) {
        if (!isNaN(char)) {
            postfix += char;
        } else if (char.match(/[\/*%.+\-]/)) {
            const isEmpty = entries.length === 0;

            while (isEmpty && (precedence(char) <= precedence(infixStack.stackTop()))) {
                pfixString += infixStack.popFromStack().item;
            }
            infixStack.pushToStack(char);
        }
    }

    while (entries.length !== 0) {
        postfix += entries.pop()
    }

    return postfix;
}
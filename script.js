function add(a, b) {
    return a + b;
}   

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = "";

function operate(operater, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            throw new Error("Invalid operator");
    }
}   

const display = document.querySelector(".display"); 

function updateDisplay() {
    display.textContent = result;
}

const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        if (!isNaN(value)) {
            if (operator === "") {
                firstNumber += value;
                result = firstNumber;
            } else {
                secondNumber += value;
                result = secondNumber;
            }
        } else if (value === "=") {
            if (firstNumber !== "" && secondNumber !== "" && operator !== "") {
                result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
                firstNumber = result.toString();
                secondNumber = "";
                operator = "";
            }
        } else if (value === "C") {
            firstNumber = "";
            secondNumber = "";
            operator = "";
            result = "";
        } else {
            if (firstNumber !== "") {
                operator = value;
            }
        }
        updateDisplay();
    });
});     


document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isNaN(key)) {
        if (operator === "") {
            firstNumber += key;
            result = firstNumber;
        } else {
            secondNumber += key;
            result = secondNumber;
        }
    } else if (key === "=" || key === "Enter") {
        if (firstNumber !== "" && secondNumber !== "" && operator !== "") {
            result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
            firstNumber = result.toString();
            secondNumber = "";
            operator = "";
        }
    } else if (key === "c" || key === "C") {
        firstNumber = "";
        secondNumber = "";
        operator = "";
        result = "";
    } else if (["+", "-", "*", "/"].includes(key)) {
        if (firstNumber !== "") {
            operator = key;
        }
    }
    updateDisplay();
}); 

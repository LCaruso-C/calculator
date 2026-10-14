const display = document.getElementById("display");

let firstNumber = "";
let secondNumber = "";
let operator = null;
let resultDisplayed = false;

function updateDisplay(value) {
  display.textContent = value;
}

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Bruh… you tried dividing by zero";
  return a / b;
}

function operate(op, a, b) {
  a = Number(a);
  b = Number(b);
  switch (op) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
  }
}

// DIGIT BUTTONS
document.querySelectorAll(".digit").forEach(btn => {
  btn.addEventListener("click", () => {
    if (resultDisplayed) {
      firstNumber = "";
      resultDisplayed = false;
    }

    if (!operator) {
      firstNumber += btn.textContent;
      updateDisplay(firstNumber);
    } else {
      secondNumber += btn.textContent;
      updateDisplay(secondNumber);
    }
  });
});

// OPERATOR BUTTONS
document.querySelectorAll(".operator").forEach(btn => {
  btn.addEventListener("click", () => {
    const op = btn.textContent;

    // Prevent double operators
    if (operator && secondNumber === "") {
      operator = op;
      return;
    }

    // Auto-evaluate if full equation exists
    if (firstNumber && operator && secondNumber) {
      let result = operate(operator, firstNumber, secondNumber);

      if (typeof result === "number") {
        result = Math.round(result * 1000) / 1000;
      }

      updateDisplay(result);
      firstNumber = result.toString();
      secondNumber = "";
    }

    operator = op;
    resultDisplayed = false;
  });
});

// EQUALS BUTTON
document.getElementById("equals").addEventListener("click", () => {
  if (!firstNumber || !operator || !secondNumber) return;

  let result = operate(operator, firstNumber, secondNumber);

  if (typeof result === "number") {
    result = Math.round(result * 1000) / 1000;
  }

  updateDisplay(result);
  firstNumber = result.toString();
  secondNumber = "";
  operator = null;
  resultDisplayed = true;
});

// CLEAR BUTTON
document.getElementById("C").addEventListener("click", () => {
  firstNumber = "";
  secondNumber = "";
  operator = null;
  resultDisplayed = false;
  updateDisplay("0");
});

// DECIMAL BUTTON
document.getElementById("decimal").addEventListener("click", () => {
  if (!operator) {
    if (!firstNumber.includes(".")) {
      firstNumber += ".";
      updateDisplay(firstNumber);
    }
  } else {
    if (!secondNumber.includes(".")) {
      secondNumber += ".";
      updateDisplay(secondNumber);
    }
  }
});

// BACKSPACE BUTTON
document.getElementById("backspace").addEventListener("click", () => {
  if (!operator) {
    firstNumber = firstNumber.slice(0, -1);
    updateDisplay(firstNumber || "0");
  } else {
    secondNumber = secondNumber.slice(0, -1);
    updateDisplay(secondNumber || "0");
  }
});

const display = document.getElementById("display");
const memoryIndicator = document.getElementById("memoryIndicator");
const processDisplay = document.getElementById("processDisplay");

let currentInput = "0";
let previousInput = null;
let operator = null;
let waitingForNewInput = false;
let memory = 0;
let expression = "";

function updateDisplay() {
  display.value = currentInput;
}

function updateProcess() {
  processDisplay.textContent = expression;
}

function updateMemoryIndicator() {
  memoryIndicator.textContent = memory !== 0 ? "M" : "";
}

function inputNumber(num) {
  if (waitingForNewInput) {
    currentInput = num;
    waitingForNewInput = false;
  } else {
    currentInput = currentInput === "0" ? num : currentInput + num;
  }
  expression += num;           
  updateDisplay();
  updateProcess();
}

function inputDecimal() {
  if (waitingForNewInput) {
    currentInput = "0.";
    waitingForNewInput = false;
    expression += "0.";           
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
    expression += ".";
  }
  updateDisplay();
  updateProcess();
}

function setOperation(nextOperator) {
  const value = parseFloat(currentInput);
  if (previousInput === null) {
    previousInput = value;
  } else if (operator) {
    const result = performCalculation(previousInput, value, operator);
    currentInput = String(result);
    previousInput = result;
    updateDisplay();
  }
  operator = nextOperator;
  waitingForNewInput = true;
  expression += ` ${operator} `;   
  updateProcess();
}

function calculate() {
  if (previousInput !== null && operator) {
    const result = performCalculation(previousInput, parseFloat(currentInput), operator);
    currentInput = String(result);
    previousInput = null;
    operator = null;
    updateDisplay();
    updateProcess();
  }
}

function performCalculation(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : "Error";
    default: return b;
  }
}

function clearAll() {
  currentInput = "0";
  previousInput = null;
  operator = null;
  expression = "";
  waitingForNewInput = false;
  updateDisplay();
  updateProcess();
}

function clearCurrentInput() {
  currentInput = "0";
  updateDisplay();
}

// Memory Functions
function memoryAdd() {
  memory += parseFloat(currentInput);
  updateMemoryIndicator();
}

function memorySubtract() {
  memory -= parseFloat(currentInput);
  updateMemoryIndicator();
}

function memoryRecall() {
  currentInput = String(memory);
  waitingForNewInput = false;
  expression += currentInput;       
  updateDisplay();
  updateProcess();
}

function memoryClear() {
  memory = 0;
  updateMemoryIndicator();
}

updateDisplay();
updateProcess();
updateMemoryIndicator();

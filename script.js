let expression = '';
let display = document.getElementById('display');
let answerDisplay = document.getElementById('answerDisplay');

function appendValue(value) {
    if (expression === '' && /[+\*/]/.test(value)) {
        return;
    }
    if (value === '.') {
        const parts = expression.split(/[\+\-\*\/]/);
        const lastNumber = parts[parts.length - 1];
        if (lastNumber.includes('.')) {
            return;
        }
    }
    expression += value;
    display.value = expression;
}

function calculateResult() {
    try {
        let result = new Function('return ' + expression)();
        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Invalid Calculation");
        }
        answerDisplay.value = result;
    } catch {
        answerDisplay.value = 'Error';
    }
}

function clearAll() {
    expression = '';
    display.value = '';
    answerDisplay.value = '';
}

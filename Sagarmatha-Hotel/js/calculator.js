const calculatorDisplay = document.getElementById('calculatorDisplay');
let currentValue = '';
let prevValue = '';
let operation = null;

function appendToDisplay(value) {
  currentValue += value;
  calculatorDisplay.value = currentValue;
}

function calculate() {
  let result;
  const prev = parseFloat(prevValue);
  const current = parseFloat(currentValue);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        alert('Cannot divide by zero');
        clearDisplay();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentValue = result.toString();
  prevValue = '';
  operation = null;
  calculatorDisplay.value = currentValue;
}

function clearDisplay() {
  currentValue = '';
  prevValue = '';
  operation = null;
  calculatorDisplay.value = '';
}

function setOperation(op) {
  if (currentValue === '') return;

  if (prevValue !== '') {
    calculate();
  }

  operation = op;
  prevValue = currentValue;
  currentValue = '';
}

function appendToDisplay(value) {
  if (value === '.' && currentValue.includes('.')) return;

  currentValue += value;
  calculatorDisplay.value = currentValue;
}

// Add event listeners to calculator buttons
const debouncedHandleButtonClick = debounce(handleButtonClick, 200); // Adjust the delay value as needed
document.querySelectorAll('.calculator-button').forEach(button => {
  button.addEventListener('pointerdown', (event) => debouncedHandleButtonClick(event), { once: true });
});

function handleButtonClick(event) {
  event.preventDefault(); // Prevent default action
  event.stopPropagation(); // Prevent event propagation

  const value = event.currentTarget.textContent;

  if (value === 'C') {
    clearDisplay();
  } else if (value === '=') {
    calculate();
  } else if (['+', '-', '*', '/'].includes(value)) {
    setOperation(value);
  } else {
    appendToDisplay(value);
  }
}

function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
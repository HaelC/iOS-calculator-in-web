const screen = document.querySelector(".screen");
const clear = document.getElementById("clear");
// const add = document.getElementById("add");
// const sub = document.getElementById("sub");
// const multiply = document.getElementById("multiply");
// const divide = document.getElementById("divide");

let runningTotal;
let buffer;
let bufferValue;
let previousOperator;
let selectedOperator;
let containPeriod;
let isNonNegative;

init();

function init() {
  runningTotal = 0;
  buffer = "0";
  bufferValue = 0;
  selectedOperator = null;
  containPeriod = false;
  isNonNegative = true;
  clearOperatorStyle();
}

document.querySelector('.buttons').addEventListener('click', (event) => {
  buttonClick(event.target.innerText);
})

 function updateOperator() {
  clearOperatorStyle();
  document.querySelector("#" + selectedOperator).style.backgroundColor = "white";
  document.querySelector("#" + selectedOperator).style.color = "#ff8d00";
}

function clearOperatorStyle() {
  let operators = document.querySelectorAll(".operator");
  operators.forEach((operator) => {
    operator.style.backgroundColor = "#ff8d00";
    operator.style.color = "white";
  })
}

function buttonClick(value) {
  // special case when clicking clearance among buttons
  if (value.length > 3) {
    return;
  }
  
  if (value !== "." && isNaN(parseInt(value))) {
    handleSymbol(value);
  }
  else {                      // value is '.' or '0'-'9'
    handleNumber(value);
  }
  rerender();
}

function handleSymbol(value) {
  switch (value) {
    case "AC":
      init();
      break;
    case "C":
      clear.innerText = "AC";
      buffer = "0";
      isNonNegative = true;
      containPeriod = false;
      break;
    case "+/-":
      isNonNegative = !isNonNegative;
      if (isNonNegative) {
        buffer = buffer.substr(1);
      }
      else {
        buffer = "-" + buffer;
      }
      break;
    case "%":
      bufferValue /= 100;
      buffer = "" + bufferValue;
      // addComma();
      break;
    case "+":
      selectedOperator = "add";
      updateOperator();
      break;
    case "-":
      selectedOperator = "sub";
      updateOperator();
      break;
    case "×":
      selectedOperator = "multiply";
      updateOperator();
      break;
    case "÷":
      selectedOperator = "divide";
      updateOperator();
      break;
    default:

      break;
  }
}

function handleNumber(value) {
  clear.innerText = "C";
  clearOperatorStyle();
  if (value === ".") {
    addPeriod();
  }
  else {
    if (buffer === "0") {
      buffer = value;
      bufferValue = parseInt(buffer);
    }
    else if (buffer === "-0") {
      buffer = "-" + value;
      bufferValue = parseInt(buffer);
    }
    else {
      let digitNum = buffer.replace(/[,\.-]/g, "").length;
      if (digitNum < 9) {
        buffer += value;
        if (!containPeriod) {
          bufferValue = parseInt(buffer.replace(/,/g, ""));
          addComma();
        }
        else {
          bufferValue = parseFloat(buffer.replace(/,/g, ""));
        }
      }
    }
  }
}

function addComma() {
  buffer = buffer.replace(/[,-]/g, "");
  if (buffer.length > 6) {
    buffer = buffer.substr(0, buffer.length - 6) + "," + buffer.substr(buffer.length - 6, 3) + "," + buffer.substr(buffer.length - 3);
  } else if (buffer.length > 3) {
    buffer = buffer.substr(0, buffer.length - 3) + "," + buffer.substr(buffer.length - 3);
  }
  if (!isNonNegative) {
    buffer = "-" + buffer;
  }
}

function addPeriod() {
  if (!containPeriod && buffer.length < 11) {
    containPeriod = true;
    buffer += ".";
  }
}

function rerender() {
  screen.innerText = buffer;
}


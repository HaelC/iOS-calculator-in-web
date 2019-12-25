const screen = document.querySelector(".screen");
let runningTotal;
let buffer;
let previousOperator;

init();

function init() {
  runningTotal = 0;
  buffer = "0";
  bufferValue = 0;
  previousOperator = null;
}

document.querySelector('.buttons').addEventListener('click', (event) => {
  // console.log(event.target.innerText);
  buttonClick(event.target.innerText);
})

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  }
  else {
    handleNumber(value);
  }
  rerender();
}

function handleSymbol(value) {

}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  }
  else if (buffer.length < 11){
    buffer += value;
    buffer = buffer.replace(/,/g, "");
    if (buffer.length > 6) {
      buffer = buffer.substr(0, buffer.length - 6) + "," + buffer.substr(buffer.length - 6, 3) + "," + buffer.substr(buffer.length - 3);
    } else if (buffer.length > 3) {
      buffer = buffer.substr(0, buffer.length - 3) + "," + buffer.substr(buffer.length - 3);
    }
  }
}

function rerender() {
  screen.innerText = buffer;
}


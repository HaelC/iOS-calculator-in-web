const screen = document.querySelector(".screen");
let runningTotal;
let buffer;
let previousOperator;
let containPeriod;

init();

function init() {
  runningTotal = 0;
  buffer = "0";
  previousOperator = null;
  containPeriod = false;
}

document.querySelector('.buttons').addEventListener('click', (event) => {
  buttonClick(event.target.innerText);
})

function buttonClick(value) {
  if (value.length > 3) {
    return;
  }
  
  if (value !== "." && isNaN(parseInt(value))) {
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
  if (value === ".") {
    addPeriod();
  }
  else {
    if (buffer === "0") {
      buffer = value;
    }
    else {
      let digitNum = buffer.replace(/[,\.]/g, "").length;
      if (digitNum < 9) {
        buffer += value;
        if (!containPeriod) {
          addComma();
        }
      }
    }
  }
}

function addComma() {
  buffer = buffer.replace(/,/g, "");
  if (buffer.length > 6) {
    buffer = buffer.substr(0, buffer.length - 6) + "," + buffer.substr(buffer.length - 6, 3) + "," + buffer.substr(buffer.length - 3);
  } else if (buffer.length > 3) {
    buffer = buffer.substr(0, buffer.length - 3) + "," + buffer.substr(buffer.length - 3);
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


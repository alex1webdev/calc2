const selectSmallDisplay = document.querySelector(".small-display");
const selectResultDisplay = document.querySelector(".result-display");
const selectButtons = document.querySelectorAll(".button");

let rawInput = "";
// let step = 0;
let equalsCounter = 0;

const numberAMatch = /\-?[0-9]+[.]?([0-9]+)?/;
const numberBMatch = /[+\-\/*]{1}[0-9\.]+$/;

const operandMatch = /[+\-*\/][0-9\.]/;

const firstExpression = /\-?[0-9\.]+[+\-\/*]+[0-9\.]+[+\-\/*]/;
const firstExpressionSlice = /\-?[0-9.]+[+-\/*]+[0-9.]+[+-\/*]+/;
// const firstExpressionEquals = /[0-9\.]+[+\-\/*]+[0-9\.]+[=]/;
const firstExpressionEquals = /[0-9\.]+[+\-\/*]+[0-9\.]+[=]/;

const percentMatch1 = /[0-9\.]+([+\/*\-%]+)?[%][=]/;
const percentMatch2 = /[0-9\.]+[+\/*\-%]+[0-9\.]+([+\/*\-%]+)?[%][=]/;

const smallDisplayMatch1 = /[+\-*\/]$/;
const smallDisplaySlice = /[\-+\/*][0-9\.]+$/;

const multipleOperandMatch = /([0-9.]+)([+\-\/*]+)[0-9.]+/;
const negMultOperandMatch = /\-([0-9.]+)([+\-\/*]+)[0-9.]+/;
// const smallDisplayMatch2 = /\-?[0-9\.]+[+\-*\/]+[0-9\.]+/;

/////////////////////////////////////////////////////////////////

selectButtons.forEach((btn) => {
  /////////

  let a = "";
  let b = "";
  let op = "";

  /////////////////**EVENT START*****/////////////////////

  btn.addEventListener("click", () => {
    let value = btn.getAttribute("data-value");
    // step += 1;
    let res = "";

    if (checkEqualsPressed(value) >= 2) return;

    rawInput += value;

    if (value !== "C" && value !== "=") {
      selectSmallDisplay.textContent = rawInput;
    }
    if (value === "C") {
      selectSmallDisplay.textContent = rawInput.slice(0, -2);
    }

    ////////////////////////////////////////

    if (rawInput.match(numberAMatch)) {
      a = parseFloat(checkAMatch());
      console.log("match a?:", a);
    }

    if (rawInput.match(smallDisplayMatch1)) {
      selectSmallDisplay.textContent = a + rawInput.match(smallDisplayMatch1);
    }

    //////////////////////////////////////

    if (rawInput.match(operandMatch)) {
      console.log("cheking3");
      op = checkOperandMatch(op);
      // selectSmallDisplay.textContent = a + op + b;
      console.log("cheking3 OP", op);
      console.log(" cheking3 a", a);
      console.log(" cheking3 b", b);
      console.log("rawInput", rawInput);
    }

    ////////////////////////////////////////

    if (rawInput.match(numberBMatch)) {
      b = parseFloat(checkBMatch());
      console.log("match b?: ", b);
    }

    ////////////////////////////////////

    if (value === "C") {
      rawInput = rawInput.slice(0, -2);
      op = rawInput.match(smallDisplaySlice)[0][0];
      b = parseFloat(checkBMatch());
      selectSmallDisplay.textContent = a + op + b;
    }

    ////////////////////////////////////////

    if (
      (rawInput.match(multipleOperandMatch) && b) ||
      (rawInput.match(negMultOperandMatch) && b)
    ) {
      op = rawInput.match(smallDisplaySlice)[0][0];
      selectSmallDisplay.textContent = a + op + b;
    }

    /////////////////////////////

    if (rawInput.match(firstExpression)) {
      rawInput =
        multipleOperandCount(op) +
        rawInput.match(firstExpressionSlice)[0].slice(-1);
      selectResultDisplay.textContent = rawInput.slice(0, -1);
      selectSmallDisplay.textContent = rawInput.slice(0, -1) + op;
    }

    //////////////////////////////////////

    checkEqualsVsOperands();

    ////////////////////////////////////////

    if (value === "AC") {
      ac();
    }

    /////////////////////////////

    if (rawInput.match(firstExpressionEquals)) {
      if (rawInput.match(/\-[0-9.]+/)) {
        op = rawInput.match(/[+\-\/*][0-9\.]+=$/)[0].slice(0, 1);
      }
      rawInput = multipleOperandCount(op);
      selectResultDisplay.textContent = rawInput;
      return;
    }

    ////////////////////////////////////////

    if (rawInput.match(percentMatch2)) {
      let percentRemains = rawInput.match(percentMatch1)[0].slice(-2);
      rawInput = multipleOperandCount(op) + percentRemains;
      if (rawInput.match(percentMatch1)) {
        a = parseFloat(checkAMatch());
        rawInput = percent(a);
      }
      selectResultDisplay.textContent = rawInput;

      return;
    }

    ////////////////////////////////////////

    if (rawInput.match(percentMatch1)) {
      rawInput = percent(a);
      selectResultDisplay.textContent = rawInput;
    }

    /////////////////////////////////////////

    console.log("       ");
  });

  /////////////////**EVENT END*****/////////////////////
});

/////////////////////////////////////////////////////////////////

function checkBMatch() {
  b = +rawInput.match(numberBMatch)[0].slice(1);
  return b;
}

function checkAMatch() {
  a = +rawInput.match(numberAMatch)[0];
  return a;
}

function checkOperandMatch(op) {
  if (rawInput.match(operandMatch)) {
    op = rawInput.match(operandMatch)[0][0];
  }
  return op;
}

function ac() {
  a = "";
  b = "";
  op = "";
  rawInput = "";
  selectSmallDisplay.textContent = "";
  selectResultDisplay.textContent = "";
}

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
  return a / b;
}

function percent(a) {
  res = a / 100;
  return res;
}

function checkEqualsPressed(value) {
  if (value === "=") {
    equalsCounter += 1;
  }
  if (
    value === "+" ||
    value === "*" ||
    value === "-" ||
    value === "/" ||
    value === "%"
  ) {
    equalsCounter = 0;
  }
  return equalsCounter;
}

function checkEqualsVsOperands() {
  if (rawInput.match(/([0-9])?([+\-\/*]+)?=([+\-\/*]+)?[0-9]/)) {
    console.log("ERROR");
    selectSmallDisplay.textContent = "";
    selectResultDisplay.textContent = "Error";
    setTimeout(ac, 1000);
  }
}

function multipleOperandCount(op) {
  let res, decimalCheck;
  if (op === "+") {
    res = add(a, b);
    console.log("******add res", res);
  }
  if (op === "-") {
    res = subtract(a, b);
    console.log("******subtract res", res);
  }
  if (op === "/") {
    res = divide(a, b);
    console.log("******divide res", res);
  }
  if (op === "*") {
    res = multiply(a, b);
    console.log("******multiply res", res);
  }

  decimalCheck = res - Math.floor(res) !== 0;
  if (decimalCheck) {
    res = res.toFixed(2);
  }
  return res;
}

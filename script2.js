const selectSmallDisplay = document.querySelector(".small-display");
const selectResultDisplay = document.querySelector(".result-display");
const selectButtons = document.querySelectorAll(".button");

let rawInput = "";
let equalsCounter = 0;

const preventOperandStart1 = /^[+%*\/=]/;
const preventOperandStart2 = /^-[+\-\/*=%]+/;

const numberAMatch = /\-?[0-9]+[.]?([0-9]+)?/;
const numberBMatch = /[+\-\/*%]{1}[0-9\.]+$/;

const operandMatch = /[+\-*\/%][0-9\.]/;

const firstExpression = /\-?[0-9\.]+[+\-\/*%]+[0-9\.]+[+\-\/*%]/;
const firstExpressionSlice = /\-?[0-9.]+[+-\/*%]+[0-9.]+[+-\/*%]+/;
const firstExpressionEquals = /\-?[0-9\.]+[+\-\/*%]+[0-9\.]+[=]/;

const percentMatch1 = /[0-9\.]+([+\/*\-%]+)?[%][=]/;
const percentMatch2 = /[0-9\.]+[+\/*\-%]+[0-9\.]+([+\/*\-%]+)?[%][=]/;
const percentMatch3 = /[0-9\.]+([+\/*\-%]+)?[%][=]/;
const percentMatch4 = /[0-9\.]+[%][0-9\.]+/;

const smallDisplayMatch1 = /[+\-*\/%]$/;
const smallDisplaySlice = /[\-+\/*%][0-9\.]+$/;

const multipleOperandMatch = /([0-9.]+)([+\-\/*%]+)[0-9.]+/;
const negMultOperandMatch = /\-([0-9.]+)([%+\-\/*]+)[0-9.]+/;

/////////////////////////////////////////////////////////////////

//////////////////////////////////////
//                                  //
//           CORE START             //
//                                  //
//////////////////////////////////////

selectButtons.forEach((btn) => {
  let a = "";
  let b = "";
  let op = "";

  window.addEventListener(
    "keydown",
    function (e) {
      keyboard(e, a, b, op);
    },
    true
  );

  btn.addEventListener("click", () => {
    let value = btn.getAttribute("data-value");
    let res = "";
    calculator(value, a, b, op);
  });
});

//////////////////////////////////////
//                                  //
//           CORE END               //
//                                  //
//////////////////////////////////////

/////////////////////////////////////////////////////////////////

function isOverflown(element, y) {
  console.log("OVERLOW", y);
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

/////////////////////////////////////////////////////////////////

function checkBMatch() {
  b = +rawInput.match(numberBMatch)[0].slice(1);
  return b;
}

/////////////////////////////////////////////////////////////////

function checkAMatch() {
  a = +rawInput.match(numberAMatch)[0];
  return a;
}

/////////////////////////////////////////////////////////////////

function checkOperandMatch(op) {
  if (rawInput.match(operandMatch)) {
    op = rawInput.match(operandMatch)[0][0];
  }
  return op;
}

/////////////////////////////////////////////////////////////////

function ac() {
  a = "";
  b = "";
  op = "";
  rawInput = "";
  selectSmallDisplay.textContent = "";
  selectResultDisplay.textContent = "";
}

/////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////

function checkEqualsVsOperands() {
  if (rawInput.match(/([0-9])?([+\-\/*]+)?=([+\-\/*]+)?[0-9]/)) {
    selectSmallDisplay.textContent = "";
    selectResultDisplay.textContent = "Error";
    // setTimeout(ac, 1000);
  }
}

/////////////////////////////////////////////////////////////////

function multipleOperandCount(op) {
  let res, decimalCheck;
  if (op === "+") {
    res = add(a, b);
  }
  if (op === "-") {
    res = subtract(a, b);
  }
  if (op === "/") {
    res = divide(a, b);
  }
  if (op === "*") {
    res = multiply(a, b);
  }
  if (op === "%") {
    res = percent(a);
  }

  decimalCheck = res - Math.floor(res) !== 0;
  if (decimalCheck) {
    res = res.toFixed(2);
  }
  console.log(res.toString().length);
  if (res.toString().length >= 14) {
    selectResultDisplay.setAttribute("class", "result-display-overflow");
  } else {
    selectResultDisplay.setAttribute("class", "result-display");
  }
  return res;
}

/////////////////////////////////////////////////////////////////

//////////////////////////////////////
//                                  //
//        CORE FUNCTION START       //
//                                  //
//////////////////////////////////////

function calculator(value, a, b, op) {
  if (checkEqualsPressed(value) >= 2) return;

  rawInput += value;

  if (
    rawInput.match(preventOperandStart1) ||
    rawInput.match(preventOperandStart2)
  ) {
    rawInput = "";
  }

  ///////////////////////////////////

  if (value !== "C" && value !== "=") {
    selectSmallDisplay.textContent = rawInput;
  }
  if (value === "C") {
    selectSmallDisplay.textContent = rawInput.slice(0, -2);
  }

  ///////////////////////////////////

  if (rawInput.match(numberAMatch)) {
    a = parseFloat(checkAMatch());
  }

  if (rawInput.match(smallDisplayMatch1)) {
    selectSmallDisplay.textContent = a + rawInput.match(smallDisplayMatch1);
  }

  ///////////////////////////////////

  if (rawInput.match(operandMatch)) {
    op = checkOperandMatch(op);
  }

  ///////////////////////////////////

  if (rawInput.match(numberBMatch)) {
    b = parseFloat(checkBMatch());
  }

  ///////////////////////////////////

  if (value === "C") {
    rawInput = rawInput.slice(0, -2);
    op = rawInput.match(smallDisplaySlice)[0][0];
    b = parseFloat(checkBMatch());
    selectSmallDisplay.textContent = a + op + b;
  }

  ///////////////////////////////////

  if (
    (rawInput.match(multipleOperandMatch) && b) ||
    (rawInput.match(negMultOperandMatch) && b)
  ) {
    op = rawInput.match(smallDisplaySlice)[0][0];
    selectSmallDisplay.textContent = a + op + b;
  }

  ///////////////////////////////////

  if (rawInput.match(firstExpression)) {
    rawInput =
      multipleOperandCount(op) +
      rawInput.match(firstExpressionSlice)[0].slice(-1);
    selectResultDisplay.textContent = rawInput.slice(0, -1);
    selectSmallDisplay.textContent = rawInput.slice(0, -1) + op;
  }

  ///////////////////////////////////

  checkEqualsVsOperands();

  ///////////////////////////////////

  if (value === "AC") {
    ac();
  }

  ///////////////////////////////////

  if (rawInput.match(firstExpressionEquals)) {
    if (rawInput.match(/\-[0-9.]+/)) {
      op = rawInput.match(/[+\-\/*][0-9\.]+=$/)[0].slice(0, 1);
    }
    rawInput = multipleOperandCount(op);
    selectResultDisplay.textContent = rawInput;
    return;
  }

  ///////////////////////////////////

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

  ///////////////////////////////////

  if (rawInput.match(percentMatch1)) {
    rawInput = percent(a);
    selectResultDisplay.textContent = rawInput;
  }

  if (rawInput.match(percentMatch4)) {
    selectResultDisplay.textContent = "Error";
    selectSmallDisplay.textContent = "";
  }
}

//////////////////////////////////////
//                                  //
//        CORE FUNCTION END         //
//                                  //
//////////////////////////////////////

/////////////////////////////////////////////////////////////////

function keyboard(e, a, b, op) {
  let value = e.key;

  if (event.defaultPrevented) {
    return;
  }

  switch (event.key) {
    case "1":
      value = "1";

      break;
    case "2":
      value = "2";

      break;
    case "3":
      value = "3";
      break;
    case "4":
      value = "4";
      break;
    case "5":
      value = "5";
      break;
    case "6":
      value = "6";
      break;
    case "7":
      value = "7";
      break;
    case "8":
      value = "8";
      break;
    case "9":
      value = "9";
      break;
    case "0":
      value = "0";
      break;
    case ".":
      value = ".";
      break;
    case "*":
      value = "*";
      break;
    case "/":
      value = "/";
      break;
    case "-":
      value = "-";
      break;
    case "+":
      value = "+";
      break;
    case "=":
      value = "=";
      break;
    case "%":
      value = "%";
      break;
    case "C":
      value = "C";
      break;
    case "Enter":
      value = "=";
      break;
    case "Backspace":
      value = "C";
      break;
    case "AC":
      value = "AC";
      break;
    default:
      return;
  }
  event.preventDefault();
  calculator(value, a, b, op);
}

/////////////////////////////////////////////////////////////////

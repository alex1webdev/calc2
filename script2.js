const selectSmallDisplay = document.querySelector(".small-display");
selectSmallDisplay.textContent = "";

const selectResultDisplay = document.querySelector(".result-display");
// selectResultDisplay.textContent = "Result";

const selectButtons = document.querySelectorAll(".button");

let smallContentRaw = "";
// let valueString = "";
let rawInput = "";
let operandCounter = 0;
let step = 0;
let equalsCounter = 0;

// const numberAMatch = /[0-9.]*/;
const numberAMatch = /[0-9]+[.]?([0-9]+)?/;

// const numberBMatch = /[+-\/*%][0-9.]+$/;
const numberBMatch = /[+\-\/*]{1}[0-9.]+$/;

// const operandMatch = /[+-\/*%][0-9.]$/;
const operandMatch = /[+\-*\/][0-9.]/;

// const firstExpression = /[0-9.]+[+-\/*%]+[0-9.]+[+-\/*%]/;
const firstExpression = /[0-9.]+[+\-\/*]+[0-9.]+[+\-\/*]/;
const firstExpressionEquals = /[0-9.]+[+\-\/*]+[0-9.]+[=]/;

// const percentMatch1 = /[0-9.]+%$/;
const percentMatch1 = /[0-9.]+([+\/*\-%]+)?[%][=]/;
// const percentMatch2 = /[0-9.]+[+\-\/*%]+[0-9.]+[+\-\/*%]/;
const percentMatch2 = /[0-9.]+[+\/*\-%]+[0-9.]+([+\/*\-%]+)?[%][=]/;

selectButtons.forEach((btn) => {
  /////////
  let a = "";
  let b = "";
  let op = "";

  ////////

  btn.addEventListener("click", () => {
    let value = btn.getAttribute("data-value");
    step += 1;
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

    ////////////////////////////////////////

    if (rawInput.match(operandMatch)) {
      op = checkOperandMatch(op);

      operandCounter += 1;

      if (operandCounter === 2) {
        operandCounter = 1;
      }

      console.log("found op HERE", op);
    }

    ////////////////////////////////////////

    if (rawInput.match(numberBMatch)) {
      b = parseFloat(checkBMatch());
      console.log("match b?: ", b);
    }

    ////////////////////////////////////////

    if (rawInput.match(firstExpression)) {
      rawInput =
        multipleOperandCount(op) +
        rawInput.match(/[0-9.]+[+-\/*]+[0-9.]+[+-\/*]+/)[0].slice(-1);

      selectResultDisplay.textContent = rawInput.slice(0, -1);
      console.log("THIS IS OP", op);
    }

    ////////////////////////////////////////
    if (value === "C") {
      rawInput = rawInput.slice(0, -2);
    }
    if (value === "AC") {
      ac();
    }

    ////////////////////////////////////////

    if (rawInput.match(firstExpressionEquals)) {
      rawInput = multipleOperandCount(op);
      // selectResultDisplay.textContent = res;
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
        // selectResultDisplay.textContent = res;
        console.log("percentMatch2=>percentMatch1", res);
      }
    }

    ////////////////////////////////////////

    if (rawInput.match(percentMatch1)) {
      console.log("percentMatch1", rawInput.match(percentMatch1));

      rawInput = percent(a);

      console.log("PERCENT RESULT:", rawInput);
      selectResultDisplay.textContent = rawInput;
      // return;
    }

    ////////////////////////////////////////

    console.log("OPERANDCOUNTER", operandCounter);
    console.log("RESULT", res);
    console.log("rawInput:", rawInput);
    console.log("Step #", step);

    console.log("       ");
  });
});

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
    console.log("TESTING NEW OP MATCH before:", rawInput.match(operandMatch));

    op = rawInput.match(operandMatch)[0][0];
    // op = rawInput.match(operandMatch)[0].slice(-1);
    console.log("TESTING SLICED OP", op);
    // console.log("MATCHED 1 Sliced", op);
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

function multipleOperandCount(op) {
  let res = "";
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

  return res;
}

function calculate(a, b, op, res) {
  if (op === "+") {
    res = add(a, b);
  }
  if (op === "-") {
    res = subtract(a, b);
  }
  if (op === "*") {
    res = multiply(a, b);
  }
  if (op === "/") {
    res = divide(a, b);
  }
  rawInput = res;
  return rawInput;
}

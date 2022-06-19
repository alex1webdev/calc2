const selectSmallDisplay = document.querySelector(".small-display");
selectSmallDisplay.textContent = "";

const selectResultDisplay = document.querySelector(".result-display");
selectResultDisplay.textContent = "Result";

const selectButtons = document.querySelectorAll(".button");

let smallContentRaw = "";
// let valueString = "";
let rawInput = "";
let operandCounter = 0;
let step = 0;
let equalsCounter = 0;

const numberAMatch = /[0-9]*/;
const numberBMatch = /[+-\/*][0-9]+/;

const operandMatch = /[0-9][+-\/*]/;
const firstExpression = /[0-9]+[+-\/*]+[0-9]+[+-\/*]/;

selectButtons.forEach((btn) => {
  /////////
  let a = "";
  let b = "";
  let op = "";

  let res = 0;

  ////////

  btn.addEventListener("click", () => {
    let value = btn.getAttribute("data-value");
    step += 1;

    if (checkEqualsPressed(value) >= 2) return;

    rawInput += value;

    if (rawInput.match(numberAMatch)) {
      a = checkAMatch();
      console.log("checked match a:", a);
    }

    if (rawInput.match(operandMatch)) {
      op = checkOperandMatch(op);

      operandCounter += 1;

      if (operandCounter === 2) {
        operandCounter = 1;
      }

      // console.log("operandCounter when match found", operandCounter);
      console.log("found op HERE", op);
    }

    if (rawInput.match(numberBMatch)) {
      b = checkBMatch();
      console.log("match b?: ", b);
    }

    if (rawInput.match(firstExpression)) {
      // operandCounter = 2;

      // rawInput = multipleOperandCount(op);

      console.log("THIS op original:", op);
      console.log("THIS rawInput original:", rawInput);
      rawInput =
        multipleOperandCount(op) +
        rawInput.match(/[0-9]+[+-\/*]+$/)[0].slice(-1);

      console.log("THIS IS OP", op);

      console.log("FIRST EXPRESSION and operandValue", operandCounter);
    }

    ///////////////////////////////

    // if (operandCounter === 2) {
    //   // op = checkOperandMatch(op);
    //   // console.log("OPERAND COUNTER =2");
    //   rawInput = multipleOperandCount(op);
    // }

    /////////////////////////////

    // if (operandCounter === 2) {
    //   res = add(a, b);
    //   rawInput = res + op;

    //   operandCounter = 0;
    //   console.log("rawInput at COUNTER=2:", rawInput);
    // }

    if ((a, b) && op === "+" && value === "=") {
      res = add(a, b);
      rawInput = res;
      console.log("rawInput after SUM:", rawInput);
      console.log("YESS Result:", res);
    }
    if ((a, b) && op === "*" && value === "=") {
      res = multiply(a, b);
      rawInput = res;
      console.log("rawInput after MULTIPLY:", rawInput);
      console.log("YESS Result MULTIPLY:", res);
    }
    if ((a, b) && op === "-" && value === "=") {
      res = subtract(a, b);
      rawInput = res;
      console.log("rawInput after SUBTRACT:", rawInput);
      console.log("YESS Result SUBTRACT:", res);
    }
    if ((a, b) && op === "/" && value === "=") {
      res = divide(a, b);
      rawInput = res;
      console.log("rawInput after DIVIDE:", rawInput);
      console.log("YESS Result DIVIDE:", res);
    }

    console.log("OPERANDCOUNTER", operandCounter);
    console.log("rawInput:", rawInput);
    console.log("Step #", step);

    // console.log("a= ", a);
    // console.log("operand:  ", op);
    // console.log("check2: ", b);
    // console.log("rawInput before transfor:", rawInput);

    // if ((a, b, op)) {
    //   res1 = add(a, b);
    //   console.log("res1: ", res1);
    //   firstExpression = rawInput.match(firstMatch)[0];
    //   rawInput = rawInput.replace(firstExpression, res1);

    //   selectSmallDisplay.textContent = a;
    //   selectSmallDisplay.textContent =
    //     selectSmallDisplay.textContent.concat(op);
    //   selectSmallDisplay.textContent = selectSmallDisplay.textContent.concat(b);

    //   selectResultDisplay.textContent = res1;
    // }
    // console.log("firstExpression: ", firstExpression);

    // console.log("rawInput transformed:", rawInput);

    // let b =
    // smallContentRaw += value;

    // console.log("smallContentRaw: ", smallContentRaw);

    // selectSmallDisplay.textContent;

    console.log("       ");
    // selectSmallDisplay.textContent = smallContent;
  });
});

function checkBMatch() {
  b = +rawInput.match(numberBMatch)[0].slice(1);
  return b;
}

function checkAMatch() {
  a = +rawInput.match(numberAMatch)[0];

  // console.log("match a?: ", a);
  return a;
}

function checkOperandMatch(op) {
  op = rawInput.match(operandMatch)[0][1];
  return op;
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

function checkEqualsPressed(value) {
  if (value === "=") {
    equalsCounter += 1;
  }
  if (value === "+" || value === "*" || value === "-" || value === "/") {
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

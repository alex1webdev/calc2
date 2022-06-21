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

// const numberAMatch = /[0-9.]*/;
const numberAMatch = /[0-9]+[.]?([0-9]+)?/;

// const numberBMatch = /[+-\/*%][0-9.]+$/;
const numberBMatch = /[+\-\/*]{1}[0-9.]+$/;

// const operandMatch = /[+-\/*%][0-9.]$/;
const operandMatch = /[+\-*\/][0-9.]/;
// const percentMatch = /[0-9.]+[+-\/*%]+/;

// const firstExpression = /[0-9.]+[+-\/*%]+[0-9.]+[+-\/*%]/;
const firstExpression = /[0-9.]+[+\-\/*]+[0-9.]+[+\-\/*]/;
const firstExpressionEquals = /[0-9.]+[+\-\/*]+[0-9.]+[=]/;

const percentMatch1 = /[0-9.]+%$/;
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

    if (rawInput.match(numberAMatch)) {
      a = parseFloat(checkAMatch());
      // if (value === "/") {
      //   rawInput = a / 100;
      // }
      console.log("match a?:", a);
    }

    // let y = rawInput.match(/[+-\/*][0-9]+$/);
    // if (y !== null) {
    //   console.log("TEST:", y[0][0]);
    // }

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
      b = parseFloat(checkBMatch());
      console.log("match b?: ", b);
    }

    if (rawInput.match(firstExpression)) {
      // operandCounter = 2;

      // rawInput = multipleOperandCount(op);
      // console.log("SLICED: ", rawInput.match(/[0-9]+[+-\/*]+$/)[0].slice(-1));
      console.log("THIS op original:", op);
      console.log("THIS rawInput original:", rawInput);
      // console.log(
      //   "------FIRST Expression match adding op ",
      //   rawInput.match(/[^0-9.][+-\/*]{0}[0-9.]/)[0].slice(-1)
      // );

      rawInput =
        multipleOperandCount(op) +
        rawInput.match(/[^0-9.][+-\/*]{0}[0-9.]/)[0][0];
      // rawInput =
      //   multipleOperandCount(op) +
      //   rawInput.match(/([0-9]+)[.]?([0-9]+)?[+\-\/*%]+/)[0].slice(-1);

      // if (value === "/") {
      //   rawInput = rawInput / 100;
      // }
      console.log("THIS IS OP", op);

      // console.log("FIRST EXPRESSION and operandValue", operandCounter);
    }

    if (rawInput.match(firstExpressionEquals)) {
      rawInput = multipleOperandCount(op);
    }
    ////////////////////////
    // if (rawInput.match(percentMatch) && value === "=") {
    //   console.log("YESS %%%%", rawInput.match(percentMatch));
    //   rawInput = percent(a);
    // }
    //////////////////////////////

    if (value === "C") {
      rawInput = rawInput.slice(0, -2);
    }
    if (value === "AC") {
      a = "";
      b = "";
      op = "";
      rawInput = "";
    }

    ///////////////------------////////////////////
    // if ((a, b, op) && value === "=") {
    //   rawInput = calculate(a, b, op, res);
    // }

    /////////////////////------------------//////////////////
    console.log("OPERANDCOUNTER", operandCounter);
    console.log("RESULT", res);
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
  return a;
}

function checkOperandMatch(op) {
  // if (rawInput.match(operandMatch2)) {
  //   op = rawInput.match(operandMatch2)[0][0];
  //   console.log("MATCHED 2", op);
  // }
  if (rawInput.match(operandMatch)) {
    console.log("TESTING NEW OP MATCH before:", rawInput.match(operandMatch));
    // console.log(
    //   "TESTING NEW OP MATCH after:",
    //   rawInput.match(operandMatch)[0].slice(-1)
    // );
    op = rawInput.match(operandMatch)[0][0];
    // op = rawInput.match(operandMatch)[0].slice(-1);
    console.log("TESTING SLICED OP", op);
    // console.log("MATCHED 1 Sliced", op);
  }
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

function percent(a, firstExpression) {
  if (a) {
    res = a / 100;
  }
  if (firstExpression) {
    res = rawInput / 100;
  }
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
  if (op === "%") {
    res = percent(a, firstExpression);
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
  // if ((a, b) && value === "=") {
  //   if (op === "+") {
  //     res = add(a, b);
  //     rawInput = res;
  //     console.log("rawInput after SUM:", rawInput);
  //     console.log("YESS Result:", res);
  //   }
  //   if (op === "*") {
  //     res = multiply(a, b);
  //     rawInput = res;
  //     console.log("rawInput after MULTIPLY:", rawInput);
  //     console.log("YESS Result MULTIPLY:", res);
  //   }
  //   if (op === "-") {
  //     res = subtract(a, b);
  //     rawInput = res;
  //     console.log("rawInput after SUBTRACT:", rawInput);
  //     console.log("YESS Result SUBTRACT:", res);
  //   }
  //   if (op === "/") {
  //     res = divide(a, b);
  //     rawInput = res;
  //     console.log("rawInput after DIVIDE:", rawInput);
  //     console.log("YESS Result DIVIDE:", res);
  //   }
  // }
  rawInput = res;
  return rawInput;
}

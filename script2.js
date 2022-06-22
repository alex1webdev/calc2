const selectSmallDisplay = document.querySelector(".small-display");
const selectResultDisplay = document.querySelector(".result-display");
const selectButtons = document.querySelectorAll(".button");

// let smallContentRaw = "";
let rawInput = "";
// let step = 0;
let equalsCounter = 0;

const numberAMatch = /\-?[0-9]+[.]?([0-9]+)?/;
const numberBMatch = /[+\-\/*]{1}[0-9\.]+$/;

const operandMatch = /[+\-*\/][0-9\.]/;
// const operandMatch = /[+\-*\/][0-9\.]+$/;
// const testMatch = /\-[0-9.]+[+\/\-*]+[0-9.]+/;

const firstExpression = /\-?[0-9\.]+[+\-\/*]+[0-9\.]+[+\-\/*]/;
const firstExpressionSlice = /\-?[0-9.]+[+-\/*]+[0-9.]+[+-\/*]+/;
// const firstExpressionEquals = /[0-9\.]+[+\-\/*]+[0-9\.]+[=]/;
const firstExpressionEquals = /\-?[0-9\.]+[+\-\/*]+[0-9\.]+[=]/;

const percentMatch1 = /[0-9\.]+([+\/*\-%]+)?[%][=]/;
const percentMatch2 = /[0-9\.]+[+\/*\-%]+[0-9\.]+([+\/*\-%]+)?[%][=]/;

const smallDisplayMatch1 = /[+\-*\/]$/;
// const smallDisplayMatch2 = /\-?[0-9\.]+[+\-*\/]+[0-9\.]+/;

selectButtons.forEach((btn) => {
  /////////
  let a = "";
  let b = "";
  let op = "";

  ////////

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
      console.log("TEEESSSTT");
      selectSmallDisplay.textContent = a + rawInput.match(smallDisplayMatch1);
    }

    ////////////////////////////////////////

    // if (rawInput.match(testMatch)) {
    //   console.log("RawInput", rawInput);
    //   console.log("a:", a);
    //   console.log("OP before", op);
    //   // console.log("matching this: ", rawInput.match(/[+\-\/*][0-9\.]+$/)[0][0]);
    //   op = rawInput.match(/[+\-\/*][0-9\.]+$/)[0][0];

    //   console.log("b after:", b);
    //   console.log("OP after", op);
    //   console.log("result:", rawInput);
    // }
    // if (rawInput.match(/\-[0-9\.]+[+\-\/*]+[0-9\.]+[=]/)) {
    //   console.log("FOUND");
    // }

    //////////////////////////////////////
    if (rawInput.match(operandMatch)) {
      console.log("cheking3");
      op = checkOperandMatch(op);
      console.log("a", a);
      console.log("b", b);
      console.log("rawInput", rawInput);
    }

    ////////////////////////////////////////

    if (rawInput.match(numberBMatch)) {
      b = parseFloat(checkBMatch());
      console.log("match b?: ", b);
    }

    ////////////////////////////////////////

    /////////////////////////////

    // if (rawInput.match(operandMatch) && a && b) {
    //   console.log("^^^^^^^^YES");
    // }

    /////////////////////////////
    if (rawInput.match(firstExpression)) {
      console.log("cheking firstExpression");
      console.log("rawInput:", rawInput);
      console.log("op", op);
      console.log("b:", b);

      console.log("rawInput before", rawInput);
      rawInput =
        multipleOperandCount(op) +
        rawInput.match(firstExpressionSlice)[0].slice(-1);

      console.log("rawInput after", rawInput);
      selectResultDisplay.textContent = rawInput.slice(0, -1);
    }

    //////////////////////////////////////

    // if (rawInput.match(operandMatch) && b) {
    //   if (a !== /\-[0-9\.]+/) {
    //     console.log("wrong");
    //     selectSmallDisplay.textContent = a + op + b;
    //   }
    // }

    ////////////////////////////////////////
    if (value === "C") {
      rawInput = rawInput.slice(0, -2);
    }
    if (value === "AC") {
      ac();
    }
    /////////////////////////////
    // if (rawInput.match(/\-[0-9\.]+[+\/\-*]+[+][0-9\.]+=/)) {
    //   console.log("YESSS");
    //   console.log("OP", op);
    //   console.log("matching:", rawInput.match(/[+\-*\/]{2}[0-9\.]/));
    //   console.log("OP after", op);
    //   // let uMatch = /[^0-9\.\-][+\/\-*]+[0-9\.]/;
    //   // let yy = u.match(uMatch)[0].slice(-2, -1);
    //   let uMatch = rawInput.match(/\-?[+\-\/*][0-9\.]+[=]/)[0].slice(-3, -2);
    //   // let test = rawInput.match(uMatch);
    //   console.log("uMatch:", uMatch);
    // }
    ////////////////////////////////////////

    if (rawInput.match(firstExpressionEquals)) {
      console.log("cheking2");
      console.log("rawInput:", rawInput);
      console.log("op", op);
      console.log("b:", b);
      // console.log("test", rawInput.match(/[+\-\/*]{1}[0-9\.]+/)[0].slice(1));
      // selectSmallDisplay.textContent =
      //   a + op + rawInput.match(/[+\-\/*]{1}[0-9\.]+/)[0].slice(1);

      rawInput = multipleOperandCount(op);
      console.log("rawinput after ", rawInput);
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
    console.log("OP", op);
    ////////////////////////////////////////

    if (rawInput.match(percentMatch1)) {
      // console.log("percentMatch1", rawInput.match(percentMatch1));
      rawInput = percent(a);

      selectResultDisplay.textContent = rawInput;
    }

    ////////////////////////////////////////
    // if (rawInput.match(/[0-9.]+[+\-*\/]+[0-9.]+/)) {
    //   selectSmallDisplay.textContent = a + op + b;
    // }
    /////////////////////////////////////////
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

// let u = "-5.24+---+++----+++******+++--*/22332133.456";
// let uMatch = /[^0-9\.\-][+\/\-*]+[0-9\.]/;
// let yy = u.match(uMatch)[0].slice(-2, -1);
// console.log(yy);

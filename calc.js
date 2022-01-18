const keys = document.querySelector(".keys");
const display = document.querySelector("#display");
const keyArr = [
  { id: 1, type: "num" },
  { id: 2, type: "num" },
  { id: 3, type: "num" },
  { id: "/", type: "operator" },
  { id: 4, type: "num" },
  { id: 5, type: "num" },
  { id: 6, type: "num" },
  { id: "-", type: "operator" },
  { id: 7, type: "num" },
  { id: 8, type: "num" },
  { id: 9, type: "num" },
  { id: "+", type: "operator" },
  { id: 0, type: "num" },
  { id: "C", type: "operator" },
  { id: "*", type: "operator" },
  { id: "=", type: "operator" },
];

let userInput = "";
let firstNum;
let secondNum;
let subOperator;

const setKeys = (side) => {
  const s = 480 / side;
  const square = side * side;
  for (let i = 0; i < square; i++) {
    const key = document.createElement("div");
    key.setAttribute("style", `height:${s}px;width:${s}px;`);
    key.setAttribute("class", `key ${keyArr[i].type}`);
    key.setAttribute("id", `${keyArr[i].id}`);
    key.textContent = `${keyArr[i].id}`;
    key.addEventListener(
      "click",
      () => {
        buttonClick(keyArr[i].id, keyArr[i].type);
      },
      false
    );
    keys.appendChild(key);
  }
};

setKeys(4);

const buttonClick = (id, type) => {
  //console.log(`id: ${id}\ntype: ${type}`);
  if (id === "C") clearDisplay();
  else if (id === "=") {
    if(!secondNum) secondNum = userInput;
    console.log(`firstNum: ${firstNum}\nsecondNum: ${secondNum}`);
    display.textContent = operate(subOperator, firstNum, secondNum);
    clearVars();
    userInput = "";

  } else if (type === "operator") {
    // if the user clicks an operator we need to determine if it's the first time or not.
    // If it's the first time, we'll assign the existing string to the firstNum variable.
    // Then we'll assign the subOperator variable.
    // If it's not the first time, then the subOperator variable will be assigne.
    // In that case, we'll need to assign the secondNum variable. Then we'll assign the firstNum.
    // Then afterwards, we'll clear out the secondNum.

    /*
      Case 10 + 20  =
      1 → 0 → + => we set that firstNum isn't assigned yet. So firstNum = parseInt(10). 
      SubOperate = +. Then userInput is cleared out so we can use it to collect the secondNum. 
      So, I keep entering digits, 2 → 0. then equal. When I press equal, I'll display the text content. 
      Then I should clear out firstNum, secondNum, and subOperator. 
      END
      
      Case 10 + 20 + 30 = 
      1 → 0 → + => we set that firstNum isn't assigned yet. So firstNum = parseInt(10). 
      SubOperate = +. Then userInput is cleared out so we can use it to collect the secondNum. 
      So, I keep entering digits, 2 → 0. When I press the + a second time, secondNum = parseInt(20). 
      */
    if (!firstNum) {
      display.textContent += id;
      firstNum = parseInt(userInput);
      subOperator = id;
      userInput = "";
    } else if (firstNum) {
      display.textContent += id;
      console.log("BEFORE");
      console.log(`userInput: ${userInput}`);
      console.log(`firstNum: ${firstNum}`);
      console.log(`secondNum: ${secondNum}`);
      console.log(`subOperator: ${subOperator}`);
      secondNum = parseInt(userInput);
      firstNum = operate(subOperator, firstNum, secondNum);
      secondNum = "";
      userInput = "";
      subOperator = id;
      console.log("AFTER");
      console.log(`userInput: ${userInput}`);
      console.log(`firstNum: ${firstNum}`);
      console.log(`secondNum: ${secondNum}`);
      console.log(`subOperator: ${subOperator}`);
    }
  } else if (type === "num") {
    userInput += id;
    display.textContent += id;
    console.log(userInput);
  }
};

const operate = (operator, x, y) => {
  if (operator === "+") return add(parseInt(x), parseInt(y));
  else if (operator === "-") return subtract(parseInt(x), parseInt(y));
  else if (operator === "/") return divide(x, y);
  else if (operator === "*") return multiply(x, y);
};

const clearDisplay = () => {
  userInput = "";
  display.textContent = "";
  clearVars();
};

const clearVars = () => {
  firstNum = null;
  secondNum = null;
  subOperator = "";
};

const add = (x, y) => {
  console.log(`typeof x: ${typeof x}\ntypeof y: ${typeof y}`);
  console.log(`x: ${x}\ny: ${y}`);
  console.log(`x+y = ${x + y}`);
  return Math.round(x + y);
};

const subtract = (x, y) => {
  return Math.round(x - y);
};

const multiply = (x, y) => {
  return Math.round(x * y);
};

const divide = (x, y) => {
  console.log(`y: ${y}`);
  if(y===0) {
      return "Cannot divide by 0!";
  } else {
      return Math.round(x / y);
  }
  /*
  if (y === 0) {return "Cannot divide by 0!"};
  else { return x / y};
  */
};

/*
console.log(`add function: ${add(10, 2)}`);
console.log(`subtract function: ${subtract(10, 2)}`);
console.log(`multiply function: ${multiply(10, 2)}`);
console.log(`divide function: ${divide(10, 2)}`);

console.log(`operate add function: ${operate(add, 10, 2)}`);
console.log(`operate subtract function: ${operate(subtract, 10, 2)}`);
console.log(`operate multiply function: ${operate(multiply, 10, 2)}`);
console.log(`operate divide function: ${operate(divide, 10, 2)}`);
*/

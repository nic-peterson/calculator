// Initiatize variables
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

/*
This function dynamically creates and assigns the keys. We're setting the attributes, text content, 
and mapping the button clicks. 
*/
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

/*
This function is handling most of the logic. First we're seeing if the user is asking to clear, in which
case, we just call the clearDisplay function. 

If the user is asking to evaluate w/ '=', we're calling a routing function to display the final output. 
The routing function asks for the two variables and the operator. The routing function will determine 
the appropriate operator function and return the value. 

The tricky part is stringing together longer sequences. We're chaining them togther by only managing
two variables (x and y) and the operation between them at any given time. 

Any time that we choose a new operation, we first see if there is already an operation that we're tracking. 

If yes, we'll assign x to be the result of the operation between x and y. Now we're free to select a second number.
From there, the user will either press = to close out the calculation. Or they'll continue to chain together
additional operations. 
*/

const buttonClick = (id, type) => {
  if (id === "C") clearDisplay();
  else if (id === "=") {
    if (!secondNum) secondNum = userInput;
    display.textContent = operate(subOperator, firstNum, secondNum);
    clearVars();
    userInput = "";
  } else if (type === "operator") {
    if (!firstNum) {
      display.textContent += id;
      firstNum = parseInt(userInput);
      subOperator = id;
      userInput = "";
    } else if (firstNum) {
      display.textContent += id;
      secondNum = parseInt(userInput);
      firstNum = operate(subOperator, firstNum, secondNum);
      secondNum = "";
      userInput = "";
      subOperator = id;
    }
  } else if (type === "num") {
    userInput += id;
    display.textContent += id;
  }
};

// This function routes the operator to the corresponding operator function and return the result
const operate = (operator, x, y) => {
  if (operator === "+") return add(parseInt(x), parseInt(y));
  else if (operator === "-") return subtract(parseInt(x), parseInt(y));
  else if (operator === "/") return divide(x, y);
  else if (operator === "*") return multiply(x, y);
};

// Clears the disply
const clearDisplay = () => {
  userInput = "";
  display.textContent = "";
  clearVars();
};

// Clears the variables that we're using for tracking the calculations
const clearVars = () => {
  firstNum = null;
  secondNum = null;
  subOperator = "";
};

// The four functions below handle the standard arithmetic operations.

const add = (x, y) => {
  return Math.round(x + y);
};

const subtract = (x, y) => {
  return Math.round(x - y);
};

const multiply = (x, y) => {
  return Math.round(x * y);
};

const divide = (x, y) => {
  if (y === 0) {
    return "Cannot divide by 0!";
  } else {
    return Math.round(x / y);
  }
};

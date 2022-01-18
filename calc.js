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


The tricky part is the operator bit. For our purposes, we're only tracking two variables and the operator 
so that we can string together more complicated calculations. If the user has input an operator, we'll 
look to see if the first variable has been assigned. If it has not, we'll assign the first variable and the 
operator that we will use. 

If the first variable has been assigned, then that implies that this is there is already an existing operator in play. 
In that case, we assign the second variable. Then we assign to the first variable to the routing function that 
returns the operation between the original two variables. The second variable is set to null and the suboperator
variable that we're using for tracking is updated to the operator that was just selected. 
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

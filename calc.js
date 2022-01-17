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

let userInput = [];

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
        //display.textContent += `${key.id}`;
        //e.target.style.backgroundColor = "orange";
      },
      false
    );
    keys.appendChild(key);
  }
};

setKeys(4);

const buttonClick = (id, type) => {
  if (id === "C") clearDisplay();
  else if (id === "=") {
      console.log("EQUALS")
  }
  else {
    userInput.push({ id, type });
    display.textContent += id;
    console.log(userInput);
  }
};

const clearDisplay = () => {
  userInput = [];
  display.textContent = "";
  console.log(userInput);
};

const add = (x, y) => {
  return x + y;
};

const subtract = (x, y) => {
  return x - y;
};

const multiply = (x, y) => {
  return x * y;
};

const divide = (x, y) => {
  if (y === 0) return "Cannot divide by 0!";
  else return x / y;
};

const operate = (operator, x, y) => {
  return operator(x, y);
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
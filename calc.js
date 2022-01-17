console.log("Hello World!");

const add = function (x, y) {
    return x + y;
  };
  
  const subtract = function (x, y) {
    return x - y;
  };
  
  const sum = function (arr) {
    const reducer = (prev, curr) => prev + curr;
    return arr.reduce(reducer, 0);
  };
  
  const multiply = function (arr) {
    const reducer = (prev, curr) => prev * curr;
    return arr.reduce(reducer, 1);
  };
  
  const power = function (x, y) {
    return Math.pow(x, y);
  };
  
  const factorial = function (num) {
    if (num === 0) {
      return 1;
    }
    return num * factorial(num - 1);
  };
// ============================================================
// HIGHER ORDER FUNCTION (HOF) NOTES  — in brief
// ============================================================
// A Higher Order Function is a function that does ONE (or both) of these:
//   1. Takes another function as an argument (a callback), and/or
//   2. Returns a function.
//
// Examples of built-in HOFs: map, filter, reduce, forEach, sort.
// (map takes a callback -> so map is a HOF.)
//
// Why useful: less repetition, reusable logic, cleaner code. Instead of
// writing a for-loop every time, you pass the "what to do" as a function.
//
// Below: `map` replaces manual loops, and `myMap` is a hand-made version of
// map (also a HOF, since it accepts a callback `cb`).
// ============================================================

// let arr = [1, 2, 3, 4, 5];
// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i] * 2);
// }
// arr.map((ele) => {
//   console.log(ele * 2);
// });
// console.log(arr)

// function double(ele) {
//   return ele * 2;
// }
// let res=arr.map(double);
// console.log(res)

let salary = [1000, 2000, 3000, 4000, 5000];

function calculateTenPercent(salary) {
  return salary * 0.1;
}

function calculateTwentyPercent(salary) {
  return salary * 0.2;
}

// Building our own map to see how HOFs work under the hood.
// It receives a callback `cb` (that makes myMap a HOF), runs it on every
// element, collects the returned values, and gives back a new array.
Array.prototype.myMap = function (cb) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(cb(this[i])); // `this` = the array myMap is called on
  }
  return result;
};

let salaryArr = [30000, 40000, 50000];
// console.log(myMap(salaryArr, calculateTenPercent));
// console.log(salaryArr.myMap(calculateTenPercent))
// salary.myMap((salary) => {
//   console.log(salary * 0.1);
// });

// let res=salaryArr.map(calculateTenPercent)
// console.log(res)

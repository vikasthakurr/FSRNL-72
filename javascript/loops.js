// ============================================
// LOOPS IN JAVASCRIPT
// ============================================

// Loops allow you to execute a block of code repeatedly
// until a specified condition is no longer true.
// They help avoid repetitive code and iterate over data.

// ============================================
// 1. for Loop
// ============================================
// Syntax: for (initialization; condition; update) { // logic }
//
// - initialization: runs ONCE before the loop starts (e.g., let i = 0)
// - condition: checked BEFORE each iteration; loop stops when false
// - update: runs AFTER each iteration (e.g., i++)
//
// Best when: you know how many times to loop.

//for(initial;terminal;progress){//logic}

// for (let i = 0; i < 10; i++) {
//   console.log(i);  // prints 0 through 9
// }

// ============================================
// 2. Looping Through Arrays with for Loop
// ============================================
// Use array.length as the condition to loop through all elements.
// Access each element with arr[i].

let arr = [1, 2, 3, 4, 5];

// for(let i=0;i<arr.length;i++){
//     console.log(arr[i])  // prints 1, 2, 3, 4, 5
// }

// ============================================
// 3. forEach() — Array Method
// ============================================
// Syntax: array.forEach((element, index, array) => { // logic })
//
// - Executes a callback function for EACH element in the array.
// - Cannot use 'break' or 'continue' inside forEach.
// - Does NOT return a new array (use .map() for that).
// - index and array parameters are optional.

// arr.forEach((ele) => {
//   console.log(ele);  // prints 1, 2, 3, 4, 5
// });

// ============================================
// 4. for...in Loop (for Objects)
// ============================================
// Syntax: for (const key in object) { // logic }
//
// - Iterates over ENUMERABLE PROPERTIES (keys) of an object.
// - 'key' gives you the property name (string).
// - Use object[key] to access the value.
// - Can also be used on arrays (gives index as string) — NOT recommended.
// - Iterates over inherited properties too! Use hasOwnProperty() to filter.

// let person = {
//   fname: "vikas",
//   age: 26,
// };
// for (const key in person) {
//   console.log(person[key]);  // prints "vikas", then 26
// }

// ============================================
// 5. for...of Loop (for Iterables) — ES6+
// ============================================
// Syntax: for (const value of iterable) { // logic }
//
// - Iterates over ITERABLE objects: Arrays, Strings, Maps, Sets, NodeLists.
// - Gives you the VALUE directly (not the key/index).
// - Does NOT work on plain objects (they are not iterable).
// - Supports break and continue.
//
// Example:
//   for (const num of arr) {
//     console.log(num);  // prints 1, 2, 3, 4, 5
//   }
//   for (const char of "hello") {
//     console.log(char); // prints h, e, l, l, o
//   }

// ============================================
// 6. while Loop
// ============================================
// Syntax: while (condition) { // logic }
//
// - Checks condition BEFORE each iteration.
// - If condition is false initially, body never executes.
// - Be careful: if you forget to update the condition variable,
//   you'll create an INFINITE LOOP!
//
// Example:
//   let i = 0;
//   while (i < 5) {
//     console.log(i);  // prints 0, 1, 2, 3, 4
//     i++;
//   }

// ============================================
// 7. do...while Loop
// ============================================
// Syntax: do { // logic } while (condition);
//
// - Executes the body AT LEAST ONCE before checking condition.
// - Checks condition AFTER each iteration.
// - Useful when you want the code to run at least one time.
//
// Example:
//   let i = 10;
//   do {
//     console.log(i);  // prints 10 (runs once even though 10 > 5)
//     i++;
//   } while (i < 5);

// ============================================
// 8. Loop Control: break & continue
// ============================================
// break    — exits the loop entirely
// continue — skips the current iteration and moves to next
//
// Example:
//   for (let i = 0; i < 10; i++) {
//     if (i === 5) break;       // stops at 5
//     if (i % 2 === 0) continue; // skips even numbers
//     console.log(i);           // prints 1, 3
//   }

// ============================================
// SUMMARY: Which loop to use?
// ============================================
// | Loop        | Use Case                              |
// |-------------|---------------------------------------|
// | for         | Known number of iterations            |
// | for...of    | Iterating array/string VALUES         |
// | for...in    | Iterating object KEYS                 |
// | forEach     | Array iteration (no break needed)     |
// | while       | Unknown iterations, check first       |
// | do...while  | Must execute at least once            |

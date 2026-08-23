// ============================================
// CONDITIONAL STATEMENTS IN JAVASCRIPT
// ============================================

// Conditional statements allow you to execute different code
// based on whether a condition is true or false.
// They control the flow of your program.

// --------------------------------------------
// 1. if...else Statement
// --------------------------------------------
// Syntax:
//   if (condition) {
//       // code runs if condition is TRUE
//   } else {
//       // code runs if condition is FALSE
//   }
//
// - The condition is evaluated as a boolean (truthy/falsy).
// - 'else' block is optional.
// - You can chain multiple conditions with 'else if'.

// let age = 17;
// if (age > 18) {
//   console.log("you can vote");
// }
// else{
//     console.log("you cant vote")
// }

// --------------------------------------------
// 2. Ternary Operator (Short-hand if...else)
// --------------------------------------------
// Syntax: condition ? expressionIfTrue : expressionIfFalse
//
// - It's an expression (returns a value), not a statement.
// - Best for simple, one-line conditional assignments or logs.
// - Avoid nesting ternaries — it hurts readability.

// console.log(age >= 18 ? "you can vote" : "you cant vote");

// --------------------------------------------
// 3. switch Statement
// --------------------------------------------
// Syntax:
//   switch(expression) {
//       case value1: // code
//           break;
//       case value2: // code
//           break;
//       default: // code if no case matches
//   }
//
// - Uses STRICT equality (===) to compare expression with cases.
// - 'break' is important! Without it, execution "falls through"
//   to the next case (can be intentional but usually a bug).
// - 'default' is like the 'else' — runs when no case matches.
// - Best when comparing one variable against many known values.

// let age = 18;
// switch(age){
//     case 18: console.log("you can vote");
//     break;
//     case 20: console.log("you can vote");
//     break;
//     default: console.log("you cant vote");
// }

// --------------------------------------------
// 4. Truthy & Falsy Values (Important for conditions)
// --------------------------------------------
// Falsy values (evaluate to false):
//   false, 0, -0, "" (empty string), null, undefined, NaN
//
// Truthy values (evaluate to true):
//   Everything else! Including "0", " ", [], {}, functions
//
// Example:
//   if ("") { } // won't execute — empty string is falsy
//   if ("hello") { } // will execute — non-empty string is truthy

// --------------------------------------------
// 5. Logical Operators in Conditions
// --------------------------------------------
// && (AND) — both conditions must be true
// || (OR)  — at least one condition must be true
// !  (NOT) — inverts the boolean value
//
// Short-circuit evaluation:
//   - (false && anything) → returns false, skips 'anything'
//   - (true || anything)  → returns true, skips 'anything'
//
// Example:
//   let age = 20;
//   let hasID = true;
//   if (age >= 18 && hasID) { console.log("Entry allowed"); }

// --------------------------------------------
// 6. Nullish Coalescing (??) & Optional Chaining (?.)
// --------------------------------------------
// ?? returns right-hand side only if left is null/undefined
//   let name = null ?? "Guest"; // "Guest"
//   let count = 0 ?? 10;       // 0 (because 0 is NOT null/undefined)
//
// ?. safely accesses nested properties without throwing errors
//   let user = {};
//   console.log(user?.address?.city); // undefined (no error)

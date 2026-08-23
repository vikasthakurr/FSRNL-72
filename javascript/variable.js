// ============================================
// VARIABLES IN JAVASCRIPT
// ============================================

// Variables are containers for storing data values.
// JavaScript has 3 ways to declare variables: var, let, const

// ============================================
// 1. var (ES5 — old way, avoid in modern code)
// ============================================
// - Function-scoped (NOT block-scoped).
// - Can be re-declared and re-assigned.
// - Gets HOISTED to the top of its scope with value 'undefined'.
// - Attached to the global 'window' object if declared globally.
// - Problem: leaks out of blocks (if, for, etc.)

// var a=20;
// a=30;       // re-assignment is allowed

//block scope
// function sayHi() {
//   var a = 10;  // scoped to this function only
// }
// console.log(a);  // ReferenceError if no outer 'a'

// ============================================
// 2. let (ES6 — preferred for mutable variables)
// ============================================
// - Block-scoped { } (limited to the block it's declared in).
// - Can be re-assigned but CANNOT be re-declared in the same scope.
// - NOT hoisted in a usable way — exists in "Temporal Dead Zone" (TDZ)
//   from start of block until declaration is reached.
// - Does NOT attach to the window object.

// let a = 10;
// a = 13;         // re-assignment allowed
// console.log(a); // 13

// ============================================
// 3. const (ES6 — preferred for immutable bindings)
// ============================================
// - Block-scoped { } (same as let).
// - CANNOT be re-assigned or re-declared.
// - Must be initialized at the time of declaration.
// - For objects/arrays: the REFERENCE is constant,
//   but properties/elements CAN be modified!
// - Also in TDZ (same as let).

// const a = 10;
// const a=30;   // SyntaxError: already declared
// a = 20;       // TypeError: assignment to constant variable
// console.log(a);

// const person = {
//   name: "vikas",
// };
// person.name = "pawan";  // ALLOWED — mutating the object, not the reference
// console.log(person);    // { name: "pawan" }

// ============================================
// 4. HOISTING
// ============================================
// Hoisting moves declarations to the top of their scope
// during the CREATION phase of execution context.
//
// var   → hoisted with value 'undefined' (can access before declaration)
// let   → hoisted but NOT initialized (TDZ — ReferenceError if accessed early)
// const → hoisted but NOT initialized (TDZ — same as let)
// function declarations → fully hoisted (can call before declaration)
// function expressions  → follow var/let/const rules
//
// TDZ (Temporal Dead Zone):
//   The zone between the start of the block and the variable declaration
//   where accessing the variable throws a ReferenceError.

console.log(a);  // ReferenceError: Cannot access 'a' before initialization
let a = 10;

// With var it would be:
// console.log(b); // undefined (hoisted with undefined)
// var b = 10;

// ============================================
// 5. SCOPE
// ============================================
// Global Scope   → accessible everywhere
// Function Scope → accessible only inside the function (var, let, const)
// Block Scope    → accessible only inside { } (let, const — NOT var)
//
// Scope Chain: Inner scopes can access outer scope variables,
//              but outer scopes CANNOT access inner scope variables.
//
// Example:
//   let global = "I'm global";
//   function outer() {
//     let outerVar = "I'm outer";
//     function inner() {
//       console.log(global);    // accessible
//       console.log(outerVar);  // accessible
//     }
//   }
//   console.log(outerVar); // ReferenceError — not accessible here

// ============================================
// SUMMARY: var vs let vs const
// ============================================
// | Feature        | var         | let          | const        |
// |----------------|-------------|--------------|--------------|
// | Scope          | Function    | Block        | Block        |
// | Re-declare     | Yes         | No           | No           |
// | Re-assign      | Yes         | Yes          | No           |
// | Hoisting       | undefined   | TDZ (Error)  | TDZ (Error)  |
// | Window object  | Yes         | No           | No           |
//
// Best Practice:
// - Use 'const' by default.
// - Use 'let' only when you need to re-assign.
// - Avoid 'var' entirely in modern code.

// ============================================
// DATA TYPES IN JAVASCRIPT — STACK & HEAP MEMORY
// ============================================

// JavaScript has two categories of data types:
// 1. Primitive Types (stored in STACK)
// 2. Reference Types (stored in HEAP)

// ============================================
// STACK MEMORY
// ============================================
// - Stack is used for PRIMITIVE (value) types.
// - Each variable gets its own copy of the value.
// - Fast access — fixed size, LIFO (Last In, First Out).
// - When you assign a primitive to another variable,
//   a COPY of the value is created.
// - Changing one does NOT affect the other.

// Primitive Types: Number, String, Boolean, undefined, null, Symbol, BigInt

// let a=10;
// let b=a;       // 'b' gets a COPY of 10 (separate memory in stack)
// b=40
// console.log(b) // 40
// console.log(a) // 10 — 'a' is unchanged because they are independent copies

// ============================================
// HEAP MEMORY
// ============================================
// - Heap is used for REFERENCE (non-primitive) types.
// - Variables store a REFERENCE (pointer/address) to the object in heap.
// - When you assign a reference type to another variable,
//   both variables point to the SAME object in heap.
// - Changing properties through one variable AFFECTS the other.
// - Heap is dynamically allocated — used for objects, arrays, functions.

// Reference Types: Object, Array, Function, Date, RegExp, Map, Set, etc.

// let person={
//     name:"vikas"
// }
// let person2=person;       // person2 gets a COPY of the REFERENCE (same object in heap)
// person2.name="pawan";
// console.log(person)       // { name: "pawan" } — BOTH changed!
// console.log(person2)      // { name: "pawan" } — same object

// ============================================
// VISUAL REPRESENTATION
// ============================================
//
//   STACK                         HEAP
//  ┌──────────┐                ┌──────────────────┐
//  │ a = 10   │                │                  │
//  │ b = 40   │  (independent) │                  │
//  ├──────────┤                │  { name:"pawan" }│ ← one object
//  │ person → ┼───────────────►│                  │
//  │ person2→ ┼───────────────►│                  │
//  └──────────┘                └──────────────────┘
//
// Primitives: value is directly in the stack.
// References: stack holds a pointer to the heap object.

// ============================================
// PRIMITIVE DATA TYPES (7 types)
// ============================================
// 1. Number    → let x = 42;       (integers & floats, same type)
// 2. String    → let s = "hello";  (text, immutable)
// 3. Boolean   → let b = true;     (true or false)
// 4. undefined → variable declared but not assigned
// 5. null      → intentional absence of value
// 6. Symbol    → unique identifier (ES6+)
// 7. BigInt    → large integers beyond Number.MAX_SAFE_INTEGER

// let age=false

// ============================================
// REFERENCE DATA TYPES
// ============================================
// 1. Object    → key-value pairs { key: value }
// 2. Array     → ordered list [1, 2, 3] (special object)
// 3. Function  → reusable block of code (also an object)
// 4. Date, RegExp, Map, Set, WeakMap, WeakSet...

// let arr=[1,2,3,4]
// let vikas= new Array();    // Array constructor (creates empty array)

// let person={};             // Object literal (preferred)
// let person=new Object();   // Object constructor

// function sayHi(){} //named function

// ============================================
// typeof OPERATOR
// ============================================
// Used to check the data type of a variable.
// Returns a string: "number", "string", "boolean",
//   "undefined", "object", "function", "symbol", "bigint"
//
// Gotcha: typeof null === "object" (this is a known JS bug)
// Gotcha: typeof [] === "object" (arrays are objects)
//         Use Array.isArray() to check for arrays.

// console.log(typeof age)   // "boolean"

// ============================================
// HOW TO AVOID REFERENCE ISSUES (Creating true copies)
// ============================================
// Shallow copy:
//   let copy = { ...original };           // spread operator
//   let arrCopy = [...originalArr];       // spread for arrays
//   let copy2 = Object.assign({}, original);
//
// Deep copy (nested objects):
//   let deepCopy = JSON.parse(JSON.stringify(original));
//   let deepCopy2 = structuredClone(original); // modern approach

// ============================================================
// OBJECTS NOTES
// ============================================================
// This file is a set of experiments. Most lines are commented out.
// Un-comment ONE block at a time to run it, otherwise the same variable
// (person1 / person2) gets declared twice and JS throws a redeclare error.
//
// Quick map of what each section demonstrates:
//   1. Creating objects (literal vs new Object())
//   2. Reading keys / values / entries
//   3. Nested objects + destructuring
//   4. Object.freeze vs Object.seal
//   5. Shallow copy (spread, Object.assign, direct reference)
//   6. Deep copy (structuredClone, JSON trick, recursion, lodash cloneDeep)
// ============================================================

// --- 1. Creating an object ---
// Two ways to make an empty object:
// let person={}            // object literal (preferred, shortest)
// let person=new Object()  // constructor form (same result)

// let person1 = {
//   fname: "vikas",
//   lname: "thakur",
//   age: 26,

// };
// console.log(person1.lname)  // dot notation reads a property

// --- 2. Inspecting an object ---
// Object.keys    -> array of property names        ["fname","lname","age"]
// Object.values  -> array of property values       ["vikas","thakur",26]
// Object.entries -> array of [key, value] pairs     [["fname","vikas"],...]
// console.log(Object.keys(person1))
// console.log(Object.values(person1))
// console.log(Object.entries(person1))

// --- 3. Nested objects + destructuring ---
// Access nested data by chaining dots: person1.address.city
// Destructuring pulls a property into its own variable in one line.
// console.log(person1.address.city)
// let { city } = person1.address; // same as: let city = person1.address.city
// console.log(city)

// let person2 = new Object();
// person2.fname = "ahad";
// person2.lname = "khan";
// person2.age = 20;

// let person1 = {
//   fname: "vikas",
//   lname: "thakur",
//   age: 26,
// };

// --- 4. freeze vs seal ---
// Object.freeze -> fully locked: cannot add, remove, OR change properties.
// Object.seal   -> can CHANGE existing properties, but cannot add/remove them.
// So with seal below: adding `salary` is ignored, but changing `fname` works.
// // Object.freeze(person1);
// Object.seal(person1)
// person1.salary = 12345;   // ignored (sealed = no new keys)
// person1.fname="akash"     // allowed (existing key can change)
// // console.log(person1.fname);
// console.log(person1);

// --- 5. SHALLOW COPY ---
// A shallow copy duplicates only the TOP level. Nested objects (like address)
// are still SHARED by reference, so editing person2.address.city also changes
// person1. Watch for this bug below.
// let person1 = {
//   fname: "vikas",
//   lname: "thakur",
//   age: 26,
//   address: {
//     city: "agra",
//   },
// };
// let person2 = person1;          // NOT a copy at all: both names point to
//                                 // the same object, so any change affects both.
// // console.log(person2)
// person2.fname = "akash";
// console.log(person1)
// let person2 = { ...person1 };        // spread: shallow copy
// let person2 = Object.assign({}, person1); // Object.assign: also shallow
// person2.address.city = "noida"; // BUG: also changes person1.address.city
//                                 // because `address` is shared (shallow copy).
// console.log(person1);
// console.log(person2);

// --- 6. DEEP COPY ---
// A deep copy duplicates EVERY level, including nested objects, so the two
// objects are fully independent. Editing person2.address.city leaves person1
// untouched. Four ways shown below.

// let person1 = {
//   fname: "vikas",
//   lname: "thakur",
//   age: 26,
//   address: {
//     city: "agra",
//   },
// };
// (a) structuredClone: built-in, handles nested objects, dates, arrays, etc.
// let person2=structuredClone(person1)
// (b) JSON trick: convert to string then back to object. Simple, but LOSES
//     functions, undefined, Dates become strings, and fails on circular refs.
// let person2 = JSON.parse(JSON.stringify(person1));
//object(1234)->json string(2345)->object(2345)  // note: new memory address each step
// person2.address.city = "noida";
// console.log(person1);
// console.log(person2);

// (c) Manual recursive deep copy (learning version):
// function deepCopy(value) {
//   // base case: primitives (and null) are copied by value, just return them
//   if (value === null || typeof value !== "object") {
//     return value;
//   }
//   const copy = Array.isArray(value) ? [] : {}; // keep arrays as arrays
//   // recurse into every key so nested objects are copied too
//   for (const key in value) {
//     copy[key] = deepCopy(value[key]);
//   }
//   return copy;
// }
// const person2 = deepCopy(person1);
// person2.address.city = "noida";
// console.log(person1);
// console.log(person2);


// (d) lodash cloneDeep: battle-tested library helper for deep cloning.
// IMPORTANT: import the specific module `lodash/cloneDeep.js`, OR use a
// named import `import { cloneDeep } from "lodash"`. Doing
// `import cloneDeep from "lodash"` grabs the whole lodash object (not the
// function) and calling it returns undefined -> the bug we hit earlier.
// import cloneDeep from "lodash/cloneDeep.js";
// let person1 = {
//   fname: "vikas",
//   lname: "thakur",
//   age: 26,
//   address: {
//     city: "agra",
//   },
// };
// const person2=cloneDeep(person1)
// person2.address.city = "noida";
// console.log(person1);
// console.log(person2);
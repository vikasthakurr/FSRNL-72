// ============================================================
// METHOD BORROWING + `this` NOTES
// ============================================================
// "Borrowing" = using one object's method on ANOTHER object by explicitly
// setting what `this` points to. Done with call / apply / bind.
//
//   call(thisArg, arg1, arg2)   -> runs the function NOW, args listed one by one
//   apply(thisArg, [arg1,arg2]) -> runs the function NOW, args in an ARRAY
//   bind(thisArg, arg1)         -> does NOT run; returns a NEW function with
//                                  `this` (and any args) permanently locked in
//
// So person1 has a print method, person2 does not. We borrow person1.print
// and point its `this` at person2.
//
// The second half of the file is about how `this` is decided:
//   - Regular function called plain  -> `this` is undefined (strict) or global.
//   - Method called as obj.method()  -> `this` is that object.
//   - Arrow function                 -> has NO own `this`; uses the surrounding
//                                        scope's `this` (cannot be re-bound).
// ============================================================

// let person1 = {
//   username: "vikas",
//   age: 26,
//   print: function (city) {
//     console.log(this.username, this.age,city); // `this` = whoever calls it
//   },
// };
// // person1.print()
// let person2 = {
//   username: "akash",
//   age: 20,
// };
// // // person2.print(); // ERROR: person2 has no print method of its own
// //call  -> borrow print, set this=person2, pass "agra" directly
// // person1.print.call(person2,"agra");
// //apply -> same idea, but arguments go inside an array
// // person1.print.apply(person2,["delhi"])
// //bind  -> returns a new bound function; the extra () actually runs it
// person1.print.bind(person2,"agra")()
// console.log(result)

// --- how `this` behaves in different situations ---
// console.log(this) // at top level: {} in modules, or global/window otherwise

// Plain function call -> `this` is the global object (non-strict) or undefined (strict)
// function hi(){
//     console.log(this)
// }
// hi()

// "use strict"; // strict mode makes `this` undefined in a plain function call

// Method call: `this` is the object left of the dot (person1)
// let person1={
//     print:function(){
//         console.log(this) // -> person1
//     }
// }
// person1.print()
// console.log(this)

// Arrow function has NO own `this`; it takes `this` from the outer scope
// let person1 = () => {
//   console.log(this);
// };
// person1();

// console.log(this.window)

// Active example: a plain function call. `this` here is the global object
// (in Node this prints an empty-ish global reference, in browsers -> window).
function hi(){
    console.log(this)
}
hi()
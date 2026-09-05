// ============================================================
// CALLBACKS NOTES
// ============================================================
// A callback (cb) = a function passed INTO another function, to be called
// LATER (often after some async work like setTimeout finishes).
//
// Why: JavaScript doesn't wait for setTimeout/network/etc. Callbacks let you
// say "when this task is done, THEN run my function" so steps happen in order.
//
// Pass the function by NAME (no parentheses): sayHi(Bye)  -> correct
// Writing sayHi(Bye())  would CALL Bye immediately and pass its return value.
// ============================================================

// --- basic example ---
// sayHi receives a callback `cb` and runs it after 5 seconds.
// function sayHi(cb) {
//   setTimeout(() => {
//     console.log("hi good morning");
//     // cb();  // <- calling cb here would run Bye after the delay
//   }, 5000);
// }
// function Bye() {
//   console.log("bye take care");
// }
// // sayHi(); // no callback passed
// // Bye();

// sayHi(Bye); // pass Bye as the callback (by reference, no parentheses)

// --- real-world style example: making Maggi step by step ---
// Each step must happen AFTER the previous one, so each function takes a
// callback and calls it when it's finished. This enforces the order:
// raw maggi -> boil water -> add masala -> serve -> clean.

// Step 1: waits 5s (async), then triggers the next step via cb().
function MakeMaggi(rawmaggi, cb) {
  setTimeout(() => {
    console.log("raw maggi is here start process");
    cb(); // move to the next step
  }, 5000);
}

function BoilWater(cb) {
  console.log("water boiled please add masala and maggi");
  cb();
}
function addMasala(cb) {
  console.log("masala added and ready to eat");
  cb();
}
function serve(cb) {
  console.log("maggi is served");
  cb();
}
// MakeMaggi(BoilWater(addMasala(serve))); // wrong: this CALLS everything at
// once instead of chaining, because the inner calls run immediately.

// Correct chaining: each step passes an arrow function as the callback that
// starts the next step. Notice how the code keeps nesting further right...
MakeMaggi("atamaggi", () => {
  BoilWater(() => {
    addMasala(() => {
      serve(() => {
        console.log("cleaning is done");
      });
    });
  });
});


// --- CALLBACK HELL ---
// The deep, ever-growing nesting above (also called "Pyramid Of Doom" / POD)
// is the "nested callback problem": hard to read, hard to handle errors, and
// hard to maintain as steps grow.
// Fix in modern JS: use Promises (.then chains) or async/await, which flatten
// this pyramid into readable, top-to-bottom code.
//callback hell
//POD  (Pyramid Of Doom)
//nested callback problem
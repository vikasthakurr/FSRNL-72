// ============================================================
// PROMISES NOTES
// ============================================================
// A Promise is an object representing a value that will be ready LATER.
// It solves callback hell by letting you CHAIN steps with .then() instead
// of nesting callbacks.
//
// A Promise has 3 states:
//   pending   -> still working, no result yet
//   fulfilled -> finished successfully (resolve was called)  -> handled by .then
//   rejected  -> failed (reject was called / error thrown)    -> handled by .catch
// Once settled (fulfilled or rejected) it never changes again.
//
// Handlers:
//   .then(cb)    runs on success, receives the resolved value
//   .catch(cb)   runs on failure, receives the error
//   .finally(cb) runs either way (cleanup)
//
// Un-comment ONE block at a time to run it.
// ============================================================

// --- fetch returns a Promise (not the data itself) ---
// Logging it right away shows a pending Promise, not the response.
// let result = fetch("https://dummyjson.com/products/1");
// console.log(result);

// --- creating your own Promise ---
// The executor runs immediately; you call resolve() on success or reject() on failure.
// const p = new Promise((resolve, reject) => {
//   let flag = false;
//   if (flag == true) {
//     resolve("hi good morning promise resolved"); // -> goes to .then
//   } else {
//     reject("rejected due to false flag");         // -> goes to .catch
//   }
// });
// // console.log(p); // would show the Promise object + its state
// Consuming the promise `p` with the handler chain:
// p.then((data) => {
//   console.log(data);         // runs if resolved
// })
//   .catch((err) => {
//     console.log(err);        // runs if rejected
//   })
//   .finally(() => {
//     console.log("promises done"); // always runs (cleanup)
//   });

// --- real API call with promise chaining ---
// fetch resolves to a Response; res.json() also returns a Promise, so we
// return it and handle the actual data in the NEXT .then(). Chaining keeps
// the steps flat instead of nested (this is the fix for callback hell).
// fetch("https://dummyjson.com/products/1")
//   .then((res) => res.json())   // parse body -> returns a promise
//   .then((data) => {
//     console.log(data);         // real data available here
//   })
//   .catch((err) => {
//     console.log(err);          // one .catch handles errors from any step above
//   })
//   .finally(() => {
//     console.log("api called");
//   });

// --- why chaining is powerful: each .then can do one job and pass the
// result to the next (fetch -> filter -> sort -> use). Whatever a .then
// RETURNS becomes the input to the next .then.
// function getData()
// .then((res)=>res.json()).then(()=>{
//     //logic for fileter
// }).then((data)=>{
//     //logic for sorting
// }).then((data)=>{
//     console.log(data)
// })

// --- handling MULTIPLE promises at once ---
// Combinators run several promises together:
//   Promise.all      -> waits for ALL to succeed; rejects if ANY fails
//   Promise.allSettled-> waits for all, gives status of each (never rejects)
//   Promise.race     -> settles as soon as the FIRST one settles (win or fail)
//   Promise.any      -> resolves with the first SUCCESS; rejects only if ALL fail
// const p1 = Promise.reject("result1");
// const p2 = Promise.reject("due to failure");
// const p3 = Promise.reject("result3");

// Here all three reject, so Promise.any rejects with an AggregateError.
// If even one had resolved, .then would receive that first success.
// Promise.any([p1, p2, p3])
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err); // AggregateError: all promises were rejected
//   });



// --- sketch: wrapping API calls in helper functions ---
// (rough draft) the idea is to reuse fetch/parse logic. Note: `json` here
// references `res` which isn't passed in yet, so it's just a stub to fill in.
//api call using callback
// function GetData(url){
//     return fetch(url)   // returns the fetch promise so caller can .then it
// }

// function json(cb){
//     return res.json()   // TODO: should take `res` as a parameter
// }

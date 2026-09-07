// ============================================================
// ASYNC / AWAIT NOTES
// ============================================================
// async/await is modern syntax built ON TOP of Promises. It lets you write
// asynchronous code that READS like normal top-to-bottom synchronous code,
// avoiding long .then() chains and callback hell.
//
// Rules:
//   - `async` before a function makes it always RETURN A PROMISE.
//   - `await` can only be used INSIDE an async function.
//   - `await` pauses that function until the Promise settles, then gives you
//     the resolved value (it does NOT freeze the whole program).
//   - For errors, wrap awaits in try/catch (this replaces .catch()).
// ============================================================

async function fetchData() {
  try {
    // await pauses here until fetch resolves with a Response object.
    const response = await fetch("https://dummyjson.com/products/1");
    // .json() also returns a Promise, so we await it too to get real data.
    const data = await response.json();
    console.log(data);
  } catch (err) {
    // any error from either await lands here (network fail, bad JSON, etc.)
    console.log(err);
  }
}
fetchData(); // call it; returns a Promise (we're not using it here)

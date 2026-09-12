// ============================================================
// DEBOUNCE vs THROTTLE NOTES  (in detail)
// ============================================================
// Both are "rate limiting" techniques. They stop an expensive function
// (API call, scroll/resize handler, search-as-you-type) from firing too
// often, which improves performance.
//
// They are also both HIGHER ORDER FUNCTIONS + CLOSURES:
//   - They take a function `fn` and return a NEW wrapped function.
//   - The returned function "remembers" `timer` / `lastCall` via closure.
//
// ------------------------------------------------------------
// DEBOUNCE  -> "wait until the user STOPS"
// ------------------------------------------------------------
// Runs fn only AFTER events stop for `delay` ms. Every new call RESETS the
// timer, so rapid calls keep cancelling each other and only the LAST one
// actually runs.
// Real use: search box (fire the API only when the user pauses typing),
// form validation, auto-save, window resize end.
//
// Example: typing "vikas" quickly -> only "vikas" (the final value) searches.
//
// THROTTLE -> "run at most once every X ms"
// ------------------------------------------------------------
// Runs fn at a fixed maximum rate. The FIRST call runs immediately, then any
// calls within `delay` are IGNORED until the interval passes. So it fires
// regularly during continuous activity (not just at the end).
// Real use: scroll handlers, mouse move, window resize (live), button spam,
// infinite scroll.
//
// Quick contrast:
//   Debounce = one call after the burst ENDS.
//   Throttle = steady calls DURING the burst, capped to 1 per interval.
// ============================================================

// ----- DEBOUNCE implementation -----
function seachWithDebounce(fn, delay) {
  let timer; // kept alive by closure between calls
  return function (...args) {
    // every call cancels the previously scheduled run...
    clearTimeout(timer);
    // ...and schedules a fresh one. Only the LAST call survives the delay.
    timer = setTimeout(() => {
      // apply keeps the original `this` and forwards the arguments
      fn.apply(this, args);
    }, delay);
  };
}

// ----- THROTTLE implementation -----
function seachWiththrottle(fn, delay) {
  let lastCall = 0; // timestamp of the last time fn actually ran (via closure)
  return function (...args) {
    let currentCall = Date.now(); // current time in ms
    // only run if enough time has passed since the last successful run
    if (currentCall - lastCall >= delay) {
      fn.apply(this, args);
      lastCall = currentCall; // remember when we ran, to block the next ones
    }
    // else: call is ignored (too soon)
  };
}

// the actual work we want to rate-limit
function search(query) {
  console.log("searching for" + query);
}

// Wrap `search` once to get a rate-limited version, then call it many times.

// Debounce demo: 4 rapid calls, but since each resets the 3s timer, only the
// LAST one ("vikas kumar thakur") would actually search, 3s after the last call.
// let debouncedSearch = seachWithDebounce(search, 3000);
// debouncedSearch("vi");
// debouncedSearch("vika");
// debouncedSearch("vikas");
// debouncedSearch("vikas kumar thakur");

// Throttle demo: these 3 calls happen back-to-back (well within 5s), so only
// the FIRST ("vikas") runs; the other two are ignored until 5s passes.
let throttledSearch = seachWiththrottle(search, 5000);
throttledSearch("vikas");
throttledSearch("vikas kumar");
throttledSearch("vikas kumar thakur");
// search("vi");
// search("vika");
// search("vikas");
// search("vikas kumar thakur");

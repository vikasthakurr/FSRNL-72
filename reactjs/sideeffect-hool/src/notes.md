# useEffect — Handling Side Effects

A **side effect** is anything a component does **besides** returning UI: fetching
data, setting timers, subscribing to events, logging, or manually touching the DOM.
`useEffect` lets you run this code **after** React renders — safely and at the
right time.

---

## 1. The Shape of useEffect

```jsx
useEffect(() => {
  // effect: runs after render

  return () => {
    // cleanup: runs before the next effect / on unmount
  };
}, [dependencies]);
```

Three parts:
1. **Effect function** — the code to run.
2. **Cleanup function** (optional `return`) — undo the effect.
3. **Dependency array** — controls **when** the effect runs.

---

## 2. The Dependency Array Controls Everything

```jsx
useEffect(() => { ... });          // NO array  -> runs after EVERY render
useEffect(() => { ... }, []);      // EMPTY     -> runs ONCE (on mount)
useEffect(() => { ... }, [count]); // WITH deps -> runs when `count` changes
```

```
  No array   []          [count]
     |        |             |
  every     once        whenever
  render   (mount)     count changes
```

---

## 3. The Example (`App.jsx`)

```jsx
import { useState, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  function handleClick() { setCount(count + 1); }

  useEffect(() => {
    console.log("component mounted");
  }, []);                            // runs once when the component first appears

  useEffect(() => {
    console.log("component updated");
    return () => {
      console.log("component unmounted");   // cleanup
    };
  }, [count]);                       // runs every time `count` changes

  return (
    <div>
      <h1>count is:{count}</h1>
      <button onClick={handleClick}>change</button>
    </div>
  );
};
```

---

## 4. The Component Lifecycle

```
   MOUNT (first render)
     |
     |-- effect with []      -> "component mounted"  (runs once)
     |-- effect with [count] -> "component updated"
     |
   UPDATE (count changes on click)
     |
     |-- cleanup of previous  -> "component unmounted"
     |-- effect with [count]  -> "component updated"
     |
   UNMOUNT (component removed)
     |
     |-- cleanup runs one last time
```

Notice how the **cleanup** runs *before* the effect re-runs, and again when the
component is removed. This prevents leaks (old timers, stale listeners, etc.).

---

## 5. Why Cleanup Matters

| Effect that sets up... | Cleanup should... |
|------------------------|-------------------|
| `setInterval` / `setTimeout` | `clearInterval` / `clearTimeout` |
| `addEventListener` | `removeEventListener` |
| A subscription / socket | unsubscribe / close |

Without cleanup, old effects pile up and cause bugs and memory leaks.

---

## 6. useEffect vs useLayoutEffect (mentioned in the file)
- `useEffect` — runs **after** the browser paints (asynchronous, non-blocking). Use this almost always.
- `useLayoutEffect` — runs **before** paint (synchronous). Use only when you must measure/mutate the DOM before the user sees it.

---

## Key Takeaways
- `useEffect` runs side-effect code **after render**.
- The **dependency array** decides when: none = every render, `[]` = once, `[x]` = when `x` changes.
- Return a **cleanup** function to undo timers, listeners, and subscriptions.
- Prefer `useEffect`; reach for `useLayoutEffect` only for pre-paint DOM work.

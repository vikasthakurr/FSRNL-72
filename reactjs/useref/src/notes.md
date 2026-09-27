# useRef — A Box That Survives Re-renders (Without Re-rendering)

`useRef` gives you a **mutable container** whose `.current` value persists across
renders. Two main uses:
1. **Access a DOM element** directly (focus, style, measure).
2. **Store a value** that should survive re-renders **without** triggering one.

---

## 1. The Syntax

```jsx
import { useRef } from "react";

const ref = useRef(0);      // ref -> { current: 0 }
ref.current                 // read / write the stored value
```

A ref is always an object with a single `.current` property.

---

## 2. useRef vs useState — The Key Difference

```
  useState                        useRef
  --------                        ------
  change -> RE-RENDER             change -> NO re-render
  value shown in UI               value works "behind the scenes"
```

| | `useState` | `useRef` |
|--|-----------|----------|
| Triggers re-render? | ✅ Yes | ❌ No |
| Survives re-renders? | ✅ Yes | ✅ Yes |
| Good for | UI values | DOM refs, timers, counters you don't display |

---

## 3. The Example (`App.jsx`)

```jsx
import { useState, useRef, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const ref  = useRef(0);   // a plain counter (no re-render)
  const ref1 = useRef();    // will point to the <h1>
  const ref2 = useRef();    // will point to the <button>

  useEffect(() => {
    ref1.current.style.color = "red";              // touch the DOM directly
    ref2.current.style.backgroundColor = "green";
  });

  function handleClick() {
    setCount(count + 1);                 // updates UI (re-render)
    ref.current = ref.current + 1;       // updates silently (no re-render)
    console.log(ref.current);
  }

  return (
    <div>
      <h1 ref={ref1}>count:{count}</h1>
      <button ref={ref2} onClick={handleClick}>change</button>
    </div>
  );
};
```

---

## 4. Two Jobs in This One Example

### Job A — point to DOM elements
```
  <h1 ref={ref1}>   --->  ref1.current === the real <h1> DOM node
  <button ref={ref2}> -->  ref2.current === the real <button> DOM node
```
Then in `useEffect` we style them directly (`.style.color = "red"`).

### Job B — a silent counter
```
  Click:
    setCount(count+1)  -> count re-renders, shown on screen
    ref.current++      -> increments quietly, only logged to console
```
`ref.current` keeps counting across renders but never causes a re-render itself.

---

## 5. When to Reach for useRef
- Focusing an input: `inputRef.current.focus()`.
- Storing a `setInterval` / `setTimeout` id so you can clear it.
- Remembering the previous value of something.
- Any "instance variable" that shouldn't affect what's on screen.

> ⚠️ Refs to DOM nodes are only ready **after** render — read them in `useEffect`
> or event handlers, not during rendering.

---

## Key Takeaways
- `useRef()` returns `{ current: ... }` that persists across renders.
- Changing `.current` does **not** re-render (unlike `useState`).
- Use it to reach DOM elements or store hidden, render-independent values.
- Access DOM refs after mount (inside effects/handlers).

# useState — Making Components Remember Things

A normal variable resets every time a function runs, and changing it does **not**
update the screen. `useState` gives a component **memory** that survives re-renders
and tells React to **re-draw** the UI when the value changes.

---

## 1. The Syntax

```jsx
import { useState } from "react";

const [count, setCount] = useState(0);
//       |        |            |
//    current   updater     initial
//    value    function     value
```

`useState` returns an **array of two things**, and we destructure it:
- `count` — the current value.
- `setCount` — the **only** correct way to change it.
- `useState(0)` — `0` is the starting value (used only on the first render).

---

## 2. The Full Example (`App.jsx`)

```jsx
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);   // update state -> triggers re-render
  };

  return (
    <div>
      <h1>Value of count is:{count}</h1>
      <button onClick={handleClick}>increase</button>
    </div>
  );
};
```

---

## 3. What Happens When You Click

```
  [Click button]
        |
        v
  handleClick() runs
        |
        v
  setCount(count + 1)      <-- update the stored value
        |
        v
  React RE-RENDERS App()   <-- function runs again
        |
        v
  count now holds the new value
        |
        v
  Screen shows updated number
```

This loop — **state changes ➜ re-render ➜ new UI** — is the heart of React.

---

## 4. Golden Rules

| ❌ Wrong | ✅ Right |
|---------|---------|
| `count = count + 1` | `setCount(count + 1)` |
| Mutate directly | Always use the setter |

- **Never** assign to the state variable directly. React won't notice and won't re-render.
- State updates are **asynchronous** — React may batch several together.
- When new state depends on old state, prefer the **function form**:

```jsx
setCount(prev => prev + 1);   // safest when updating based on previous value
```

---

## Key Takeaways
- `useState` = a component's memory across re-renders.
- Returns `[value, setterFunction]`.
- Only the setter should change state — this is what triggers a re-render.
- Use `setCount(prev => prev + 1)` when the update depends on the previous value.

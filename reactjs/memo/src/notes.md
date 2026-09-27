# Performance: memo, useMemo & useCallback

React re-renders a component whenever its state or its parent re-renders. Usually
that's fast and fine. But when a render is **expensive** or a **child re-renders
needlessly**, these three tools help you **skip unnecessary work**.

| Tool | Memoizes... | Purpose |
|------|-------------|---------|
| `memo` | a **component** | skip re-render if props didn't change |
| `useMemo` | a **computed value** | skip recalculating an expensive result |
| `useCallback` | a **function** | keep the same function reference between renders |

---

## 1. The Problem They Solve

```
  Parent re-renders (e.g. count changes)
        |
        v
  By default -> ALL children re-render too
        |
        v
  Even children whose data DID NOT change  <-- wasted work
```

The memo family lets React say: "props are the same ➜ don't bother re-rendering."

---

## 2. `React.memo` — memoize a component (`Child.jsx`)

```jsx
import { memo } from "react";

const Child = () => {
  console.log("child component called again");
  return <div>Child</div>;
};

export default memo(Child);
```

`memo(Child)` tells React: **only re-render `Child` if its props change**. Without
`memo`, `Child` re-renders every time the parent does — even when its props are identical.

---

## 3. `useMemo` — cache an expensive calculation (`App.jsx`)

```jsx
function calculate() {
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) sum += i;   // very expensive!
  return sum;
}

// let result = calculate();                 // runs on EVERY render (slow!)
let result = useMemo(() => calculate(), []);  // runs ONCE, then reuses the result
```

```
  Without useMemo:  every render -> calculate() -> billion-loop again (laggy)
  With useMemo []:  first render -> calculate() -> cache -> reuse cached value
```

The dependency array `[]` means "never recompute". If it were `[count]`, it would
recompute only when `count` changed.

---

## 4. `useCallback` — cache a function reference

```jsx
function sayHi() { console.log("hi"); }

const sayHi1 = useCallback(() => sayHi(), []);
```

Why? In JS, every render **creates a brand-new function object**. If you pass that
function to a `memo`-wrapped child, the child sees a "new" prop every time and
re-renders anyway. `useCallback` keeps the **same function reference** across
renders, so the memoized child stays skipped.

```
  Without useCallback:  new function each render -> child sees changed prop -> re-renders
  With useCallback []:  same function reference  -> child props unchanged   -> skipped
```

> Rule of thumb: `useMemo` remembers a **value**; `useCallback` remembers a **function**.
> In fact, `useCallback(fn, deps)` is just `useMemo(() => fn, deps)`.

---

## 5. How the Example Fits Together

```
  App (count, count1)
   |
   |-- result   = useMemo(calculate, [])   // heavy sum cached
   |-- sayHi1   = useCallback(sayHi, [])   // stable function
   |
   +-- <Child count1={count1} sayHi1={sayHi1} />   // Child is memo()'d
```

- Clicking "change" updates `count` ➜ `App` re-renders, but `calculate` is **not**
  re-run (memoized) and `Child` does **not** re-render (props unchanged).
- Clicking "change for child" updates `count1` ➜ `Child` re-renders because its
  `count1` prop actually changed.

Watch the console: `"child component called again"` only logs when `count1` changes.

---

## 6. ⚠️ Don't Over-Optimize
These tools have their own cost (memory + comparison). Use them when you have a
**real, measured** performance problem — not on every component by default.

---

## Key Takeaways
- `memo` skips re-rendering a component when its props are unchanged.
- `useMemo` caches an **expensive computed value**.
- `useCallback` caches a **function reference** (so memoized children stay skipped).
- They work **together**: `memo` child + `useCallback`/`useMemo` props.
- Optimize only when there's a measured need.

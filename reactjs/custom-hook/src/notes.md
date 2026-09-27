# Custom Hooks — Reusing Stateful Logic

A **custom hook** is just a **function whose name starts with `use`** that uses
other hooks (`useState`, `useEffect`, ...) inside it. It lets you **extract and
reuse** logic across many components — without repeating code.

---

## 1. Why Custom Hooks?

Suppose 5 components all fetch data. Without a custom hook, each repeats the same
`useState` + `useEffect` + `fetch`. A custom hook bundles that logic once and
every component just **calls it**.

```
  Without custom hook          With custom hook
  -------------------          ----------------
  ComponentA: fetch logic       ComponentA: useCustom(url)
  ComponentB: fetch logic  -->  ComponentB: useCustom(url)
  ComponentC: fetch logic       ComponentC: useCustom(url)
  (duplicated everywhere)       (one shared hook)
```

---

## 2. The Rules of Hooks
1. Name **must** start with `use` (so React can apply hook rules).
2. Call hooks **only at the top level** — never inside loops, conditions, or nested functions.
3. Call hooks **only** from React components or other custom hooks.

---

## 3. The Example — a data-fetching hook (`UseCustom.jsx`)

```jsx
import { useState, useEffect } from "react";

const UseCustom = (url) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);           // re-fetch whenever the url changes

  return [data];       // hand the data back to whoever called us
};

export default UseCustom;
```

This hook:
- takes a `url`,
- stores fetched `data` in state,
- fetches when the `url` changes,
- returns `[data]` for the caller.

---

## 4. Using It (`App.jsx`)

```jsx
import UseCustom from "./UseCustom";

const App = () => {
  const [data] = UseCustom("https://dummyjson.com/products");
  console.log(data);
  return <div>App</div>;
};
```

### The flow

```
  App calls UseCustom(url)
        |
        v
  UseCustom runs useEffect -> fetch(url)
        |
        v
  response arrives -> setData(data)
        |
        v
  hook returns [data] -> App re-renders with the data
```

The `App` component stays clean — all the fetching machinery lives in the hook.

---

## 5. What a Hook Returns Is Up to You
- Return an **array** `[data]` (like `useState`) when order matters.
- Return an **object** `{ data, loading, error }` when you have several named values.

```jsx
// a more complete version might return:
return { data, loading, error };
```

---

## Key Takeaways
- A custom hook is a `use`-prefixed function that calls other hooks.
- It **extracts reusable stateful logic** so components stay clean.
- Follow the Rules of Hooks (top level, only in components/hooks).
- It can return anything — an array or an object of values.

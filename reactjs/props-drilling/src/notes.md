# Props Drilling & the Context API

Sometimes data must reach a **deeply nested** component. Passing it through every
level manually is called **props drilling** — tedious and messy. React's
**Context API** solves this by letting you share data directly, skipping the
in-between components.

---

## 1. The Problem: Props Drilling

Imagine `App` has data that only `Child3` needs, but the tree is:

```
  App (has: person data)
   |
  Child1   <- must receive & forward the data (doesn't use it)
   |
  Child2   <- must receive & forward the data (doesn't use it)
   |
  Child3   <- finally uses the data
```

Passing `person` through `Child1` and `Child2` just to reach `Child3` is
**props drilling**. The middle components are forced to carry data they don't care about.

---

## 2. The Solution: Context API

Context creates a **shared box** of data. Any descendant can read from it directly —
no drilling through the middle layers.

```
  App
   |  <UserContext.Provider value={person}>   (fill the box)
   |
  Child1
   |
  Child2
   |
  Child3  --- useContext(UserContext) --->  reads `person` directly
```

---

## 3. The Three Steps (with this project's code)

### Step 1 — Create the context (`UserContext.jsx`)
```jsx
import { createContext } from "react";
export const UserContext = createContext();
```

### Step 2 — Provide the value (`App.jsx`)
Wrap the tree in a `Provider` and pass the data via `value`:
```jsx
import Child1 from "./Child1";
import { UserContext } from "./UserContext";

const App = () => {
  let person = { fullname: "vikas", age: 26, salary: 1234567 };
  return (
    <UserContext.Provider value={person}>
      <Child1 />
    </UserContext.Provider>
  );
};
```

### Step 3 — Consume the value (`Child3.jsx`)
Any descendant reads it with `useContext` — **no props needed**:
```jsx
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Child3 = () => {
  const data = useContext(UserContext);   // { fullname, age, salary }
  console.log(data);
  return <div>Child3</div>;
};
```

`Child1` and `Child2` don't touch the data at all — the drilling is gone.

---

## 4. Drilling vs Context — Side by Side

```
  PROPS DRILLING                  CONTEXT API
  --------------                  -----------
  App                             App --(Provider: person)
   | person                        |
  Child1  person                  Child1   (passes nothing)
   | person                        |
  Child2  person                  Child2   (passes nothing)
   | person                        |
  Child3 (uses it)                Child3 --(useContext)--> person
```

---

## 5. When to Use Each

| Use props | Use Context |
|-----------|-------------|
| Data goes 1–2 levels deep | Data needed deep in the tree |
| Only a couple components | Many components need it |
| Simple parent➜child | Global-ish data (theme, user, language) |

> ⚠️ Don't overuse Context. For shallow trees, plain props are simpler and clearer.

---

## Key Takeaways
- **Props drilling** = forwarding props through components that don't use them.
- **Context** shares data directly with any descendant.
- Three steps: `createContext` ➜ `<Provider value=...>` ➜ `useContext`.
- Great for global data (theme, auth, language); avoid for shallow trees.

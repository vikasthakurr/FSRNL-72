# Lifting State Up — Sharing State Between Components

When **two or more components** need the same piece of data, you move (lift) that
state **up** to their closest common **parent**. The parent owns the state and
passes it down: the **value** as a prop, and a **setter** so children can update it.

---

## 1. The Problem

Data in React flows **one way** (parent ➜ child). A child cannot push data back up
directly. So how does a child input update something the parent displays?
👉 The parent owns the state and hands the child a function to change it.

---

## 2. The Example

### Parent — `App.jsx`
```jsx
import Child from "./Child";
import { useState } from "react";

const App = () => {
  const [name, setName] = useState("");   // state lives HERE (parent)
  return (
    <div>
      <Child name={name} setName={setName} />   {/* pass value + setter down */}
      <h1>the value coming from child:{name}</h1>
    </div>
  );
};
```

### Child — `Child.jsx`
```jsx
const Child = (props) => {
  const handleChange = (e) => {
    props.setName(e.target.value);   // child calls parent's setter
  };
  return (
    <input onChange={handleChange} type="text" placeholder="enter username" />
  );
};
```

---

## 3. How the Data Travels

```
                 App (owns: name, setName)
                  |                     ^
   passes DOWN    |                     |  child calls setName(...)
   name + setName v                     |  value travels UP (via callback)
                Child  <input onChange> -+
                  |
            user types "vikas"
                  |
        handleChange -> props.setName("vikas")
                  |
                  v
        App's `name` updates -> App re-renders
                  |
                  v
        <h1> shows "vikas"
```

Data goes **down** as props; changes come back **up** by **calling the setter**
that the parent passed down. This is the "lifting state up" pattern.

---

## 4. Why Lift State?

| Without lifting | With lifting |
|-----------------|--------------|
| Each child keeps its own copy | Single **source of truth** in parent |
| Copies drift out of sync | All children always agree |
| Hard to share | Easy to share + display anywhere |

---

## Key Takeaways
- Put shared state in the **closest common parent**.
- Pass the **value** down as a prop.
- Pass a **setter function** down so the child can request changes.
- The child never mutates state directly — it **calls the parent's setter**.

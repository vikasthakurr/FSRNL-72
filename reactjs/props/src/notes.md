# Props — Passing Data Into Components

**Props** (short for "properties") are how a **parent** component sends data
**down** to a **child** component. Props are **read-only** — a child can use them
but must never change them.

---

## 1. The Idea: Data Flows Down

```
        App  (parent)
         |  passes: fullname="vikas", salary={1234}, age={26}
         v
        Card (child)  -> reads and displays the props
```

React has **one-way data flow**: data always travels parent ➜ child.

---

## 2. Sending Props (Parent — `App.jsx`)

```jsx
import Card from "./Card";

const App = () => {
  return (
    <div>
      <Card fullname="vikas" salary={1234} age={26} />
    </div>
  );
};
```

- `fullname="vikas"` — a **string** uses quotes.
- `salary={1234}` — any **non-string** value (number, boolean, array, object,
  function) goes inside **curly braces** `{ }`.

---

## 3. Receiving Props (Child — `Card.jsx`)

```jsx
const Card = ({ fullname, salary }) => {
  return (
    <div>
      <h1>Fullname:{fullname}</h1>
      <h2>Salary:{salary}</h2>
    </div>
  );
};
```

All props arrive as a single **object**:

```js
props = { fullname: "vikas", salary: 1234, age: 26 }
```

We use **destructuring** `({ fullname, salary })` to pull out just the ones we need.
(Notice `age` is passed but not used here — that is fine.)

### Two ways to read props
```jsx
// 1. Whole object
const Card = (props) => <h1>{props.fullname}</h1>;

// 2. Destructured (cleaner, recommended)
const Card = ({ fullname }) => <h1>{fullname}</h1>;
```

---

## 4. Reusability — the Real Power of Props

The same `Card` component can be reused with different data:

```jsx
<Card fullname="vikas"  salary={1234} />
<Card fullname="akash"  salary={5000} />
<Card fullname="taimoor" salary={9000} />
```

```
             Card component (one blueprint)
            /          |            \
   vikas/1234      akash/5000    taimoor/9000
```

Compare with `Card2.jsx`, which **hard-codes** its values:

```jsx
const Card2 = () => (
  <div>
    <h1>Fullname:Taimoor</h1>   {/* fixed, cannot be reused */}
    <h2>Salary:1234567</h2>
  </div>
);
```

`Card2` can only ever show one person. `Card` (with props) can show anyone.
**That is why props matter.**

---

## Key Takeaways
- Props pass data **parent ➜ child**, one-way.
- Strings use quotes; everything else uses `{ }`.
- Props are **read-only** inside the child.
- Destructure props for cleaner code.
- Props make components **reusable**.

# Conditional Rendering — Showing UI Based on a Condition

Sometimes you want to show **different UI** depending on a condition: logged-in vs
logged-out, loading vs loaded, empty vs filled. This is **conditional rendering**.

---

## 1. The Example (`App.jsx`)

```jsx
import Home from "./Home";
import Login from "./Login";

const App = () => {
  let isLoggedIn = true;
  return (
    <div>
      {isLoggedIn ? <Home /> : <Login />}
    </div>
  );
};
```

If `isLoggedIn` is `true`, show `<Home />`. Otherwise show `<Login />`.

```
        isLoggedIn ?
        /          \
     true          false
      |               |
   <Home />        <Login />
```

---

## 2. The Ternary Operator `? :`

```jsx
{ condition ? <IfTrue /> : <IfFalse /> }
```

Read it as: **"if condition then A else B"**. This is the most common way to
choose between **two** options inside JSX.

---

## 3. Other Ways to Render Conditionally

### a) Logical AND `&&` — render something OR nothing
```jsx
{isLoggedIn && <h1>Welcome back!</h1>}
```
Read: "if `isLoggedIn` is true, render the `<h1>`; otherwise render nothing".

```
 isLoggedIn && <h1/>
    true  -> shows <h1/>
    false -> shows nothing
```

### b) Early `return`
```jsx
if (!isLoggedIn) return <Login />;
return <Home />;
```

### c) Store JSX in a variable
```jsx
let content = isLoggedIn ? <Home /> : <Login />;
return <div>{content}</div>;
```

---

## 4. Choosing the Right Tool

| Situation | Best choice |
|-----------|-------------|
| Two possible outputs (A or B) | ternary `? :` |
| Show something or nothing | `&&` |
| Many branches / complex logic | `if/else` + early return |

---

## ⚠️ Common Gotcha with `&&`
```jsx
{count && <p>{count} items</p>}   // if count === 0, React prints "0" !
```
When the left side is `0`, React renders the number `0`. Fix it with a real boolean:
```jsx
{count > 0 && <p>{count} items</p>}
```

---

## Key Takeaways
- Conditional rendering = choosing what UI to show based on a condition.
- Use `? :` for two options, `&&` for show/hide, `if` for complex cases.
- Watch out for `0 && ...` accidentally rendering `0`.

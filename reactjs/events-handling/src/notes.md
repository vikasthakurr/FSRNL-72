# Event Handling in React

Events let your app **react to the user** — clicks, typing, hovering, submitting
forms, and more. React wraps the browser's native events in a consistent system
so they behave the same across all browsers.

---

## 1. React Events vs Plain JS

The old (vanilla) way — manually finding an element and attaching a listener:

```js
const btn = document.getElementById("btn");
btn.addEventListener("click", () => alert("btn is clicked"));
```

The React way — attach the handler right in the JSX:

```jsx
<button onClick={handleClick}>click me</button>
```

| Vanilla JS | React |
|-----------|-------|
| `addEventListener("click", fn)` | `onClick={fn}` |
| `onclick` (all lowercase) | `onClick` (**camelCase**) |
| Query DOM manually | Declared in JSX |

---

## 2. Writing a Handler

```jsx
const handleClick = (event) => {
  console.log("event type:", event.type);      // e.g. "click"
  console.log("element:", event.target);        // the DOM element clicked
  console.log("current:", event.currentTarget);
};

return <button onClick={handleClick}>click me</button>;
```

> ⚠️ Pass the function **reference**: `onClick={handleClick}` (no parentheses).
> `onClick={handleClick()}` would **call it immediately** during render — wrong.

---

## 3. The Event Object (SyntheticEvent)

Every handler receives an **event object** describing what happened:

```
  User clicks button
        |
        v
  React creates a SyntheticEvent  (cross-browser wrapper)
        |
        v
  handleClick(event)
        |
   event.type          -> "click"
   event.target        -> the actual element
   event.currentTarget -> element the handler is attached to
```

---

## 4. Passing Arguments to a Handler

If you need to send your own value, wrap it in an **arrow function**:

```jsx
const handleGreet = (name) => console.log("hello", name);

// wrap so it runs only on click, not during render
<button onClick={() => handleGreet("vikas")}>greet</button>
```

---

## 5. Common Events Cheat Sheet

| Event | Fires when... |
|-------|---------------|
| `onClick` | element is clicked |
| `onChange` | input value changes |
| `onSubmit` | a form is submitted |
| `onMouseEnter` / `onMouseLeave` | pointer enters/leaves |
| `onKeyDown` | a key is pressed |

---

## Key Takeaways
- Use **camelCase** handlers: `onClick`, `onChange`, `onSubmit`.
- Pass the function **reference**, not a call.
- To pass arguments, wrap in `() => fn(arg)`.
- Every handler receives a **SyntheticEvent** object.

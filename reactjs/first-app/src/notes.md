# React Basics — Your First App (JSX, Components, Lists & Keys)

This is the starting point of React. Before hooks, state, or context, you must
understand three things: **components**, **JSX**, and **rendering lists**.

---

## 1. What is a Component?

A component is just a **JavaScript function that returns UI** (JSX). React builds
your whole page by composing many small components together.

```jsx
function App() {
  return (
    <>
      <About />
    </>
  );
}
export default App;
```

- `App` is the **root** component.
- `<About />` means "render the About component here".
- `<>...</>` is a **Fragment** — a wrapper that adds no extra HTML tag.

### The component tree

```
        App
         |
       About
         |
   <li> vikas </li>
   <li> akash </li>
```

---

## 2. JSX — HTML inside JavaScript

JSX looks like HTML but it is really JavaScript. The browser cannot read JSX
directly, so a tool (Vite + Babel) compiles it:

```
   JSX you write            What it compiles to
  ----------------      -----------------------------
  <h1>Hello</h1>   -->  React.createElement("h1", null, "Hello")
```

### JSX rules to remember
| Rule | Example |
|------|---------|
| One parent element | wrap siblings in `<>...</>` |
| `className` not `class` | `<div className="box">` |
| Close every tag | `<br />`, `<img />` |
| JS goes in `{ }` | `<h1>{user.name}</h1>` |

---

## 3. Rendering a List (`.map` + `key`)

From `About.jsx`:

```jsx
const About = () => {
  const users = [
    { id: 1, name: "vikas" },
    { id: 2, name: "akash" },
  ];
  return users.map((user) => <li key={user.id}>{user.name}</li>);
};
```

### How the array becomes UI

```
  users array                    rendered output
 ---------------                --------------------
 { id:1, name:"vikas" }  --map-->  <li>vikas</li>
 { id:2, name:"akash" }  --map-->  <li>akash</li>
```

### Why `key` matters
The `key` gives each list item a **stable identity**. React uses it to know which
item changed, was added, or removed — so it can update the DOM efficiently
instead of re-drawing the whole list.

> ✅ Use a unique id as the key. ❌ Avoid using the array index if the list can reorder.

---

## 4. How the App Reaches the Screen

```
 main.jsx                index.html
   |                        |
 createRoot(#root)  ----->  <div id="root"></div>
   |
 render(<App />)
   |
   v
 App -> About -> <li> list
```

`main.jsx` mounts `<App />` into the `#root` div defined in `index.html`.

---

## Key Takeaways
- A component = a function returning JSX.
- JSX is compiled to `React.createElement` calls.
- Return one parent element (use a Fragment).
- Render lists with `.map()` and always give a unique `key`.

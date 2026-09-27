# Building React From Scratch (Manual React)

To truly understand React, it helps to **rebuild its core ideas** in plain
JavaScript — no JSX, no build step, no library. This folder (`app.js` +
`index.html`) does exactly that: a tiny React-like renderer with a Virtual DOM,
`createElement`, rendering, and state.

---

## 1. The Four Big Ideas We Imitate

| Real React | Our version |
|-----------|-------------|
| Virtual DOM (JS objects describing UI) | plain objects from `createElement` |
| `React.createElement` (what JSX compiles to) | our `createElement()` |
| Renderer (vnode ➜ real DOM) | our `createDOM()` + `render()` |
| `useState` + re-render | global `state` + `setState()` |

---

## 2. Virtual DOM & `createElement`

Instead of touching the real DOM immediately, we first describe the UI as cheap
JS objects (the **virtual DOM**):

```js
function createElement(type, props = {}, ...children) {
  return { type, props, children };
}
```

So this call:
```js
createElement("h1", { className: "title" }, "hi")
```
returns:
```js
{ type: "h1", props: { className: "title" }, children: ["hi"] }
```

This is exactly what JSX compiles into behind the scenes:
```
   <h1 className="title">hi</h1>
            |  (JSX compiles to)
            v
   createElement("h1", { className:"title" }, "hi")
```

---

## 3. Turning Virtual DOM into Real DOM — `createDOM`

```js
function createDOM(vnode) {
  // text/number -> a text node (leaf)
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(vnode);
  }

  const element = document.createElement(vnode.type);

  for (const prop in vnode.props) {
    const value = vnode.props[prop];
    if (prop.startsWith("on")) {
      // "onclick" -> "click"
      element.addEventListener(prop.slice(2).toLowerCase(), value);
    } else {
      element.setAttribute(prop, value);
    }
  }

  // recurse into children (depth-first)
  vnode.children.forEach((child) => {
    element.appendChild(createDOM(child));
  });

  return element;
}
```

```
  vnode tree                        real DOM tree
  ----------                        -------------
  { type:"div",                     <div>
    children:[                        <h1>my manual react</h1>
      {type:"h1", children:["..."]},  <p>count:0</p>
      {type:"p",  children:["..."]}   ...
    ]}                              </div>
```

---

## 4. Mounting — `render`

```js
function render(vnode, container) {
  const dom = createDOM(vnode);
  container.innerHTML = "";     // clear old render (NO diffing)
  container.appendChild(dom);   // mount the freshly built tree
}
```

> ⚠️ This is **naive**. Real React *diffs* the old and new trees and patches only
> what changed. Here we wipe and rebuild everything each time — simple, but it
> loses focus/scroll state and is less efficient. Great for learning, though.

---

## 5. State & Re-render — our mini `useState`

```js
let state = 0;
function setState(newValue) {
  state = newValue;   // update the data
  renderApp();        // redraw so the UI matches the new data
}
```

This is the **heartbeat** of React, in miniature:

```
   setState(newValue)
        |
        v
   state updates
        |
        v
   renderApp()  -> App() rebuilds vnode tree -> render() repaints #root
        |
        v
   UI reflects new state
```

---

## 6. The App & the Loop

```js
function App() {
  return createElement("div", {},
    createElement("h1", {}, "my manual react"),
    createElement("p", {}, `count:${state}`),
    createElement("button", { onclick: () => setState(state + 1) }, "increment"),
    createElement("button", { onclick: () => setState(state - 1) }, "decrement"),
    createElement("button", { onclick: () => setState(0) }, "reset"),
    Welcome(),   // composing a child "component"
  );
}

function renderApp() {
  const virtualDOM = App();
  render(virtualDOM, root);
}

renderApp();   // initial paint
```

A **component** here is simply a function that returns a vnode (like `Welcome()`).
Clicking a button ➜ `setState` ➜ `renderApp` ➜ new UI. That is the whole cycle.

---

## 7. What Real React Adds On Top

| We do (naive) | Real React adds |
|---------------|-----------------|
| Wipe & rebuild the DOM | **Diffing / reconciliation** (patch only changes) |
| One global `state` value | Per-component state via **hooks** |
| Call components directly `App()` | JSX `<App />` + fiber architecture |
| Re-render immediately | **Batched**, scheduled updates |

---

## Key Takeaways
- JSX compiles to `createElement`, which returns plain **virtual DOM** objects.
- A renderer walks that tree and builds **real DOM** nodes.
- `setState` updates data and **re-runs render** — the core reactive loop.
- Real React optimizes this with **diffing**, **hooks**, and **batching**.

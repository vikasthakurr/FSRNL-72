/* =====================================================================
 * MANUAL REACT — building a tiny React-like library from scratch
 * =====================================================================
 *
 * The goal here is to recreate the core ideas behind React using plain
 * JavaScript and the browser DOM API. No JSX, no build step, no library.
 *
 * The big ideas we imitate:
 *   1. Virtual DOM  -> describe UI as plain JS objects (cheap to create).
 *   2. createElement -> the function JSX would compile down to.
 *   3. Rendering     -> turn those objects into real DOM nodes.
 *   4. State + re-render -> when data changes, rebuild the UI.
 *
 * How the pieces connect:
 *   App() -> returns a virtual DOM tree (plain objects)
 *   render() -> walks that tree with createDOM() and mounts real nodes
 *   setState() -> updates state, then calls renderApp() to redraw
 * ===================================================================== */

// The mount point. Everything we build gets injected inside <div id="root">.
const root = document.getElementById("root");

/* ---------------------------------------------------------------------
 * createElement(type, props, ...children)
 * ---------------------------------------------------------------------
 * This is our "React.createElement". In real React, JSX like
 *     <h1 className="title">hi</h1>
 * compiles into
 *     createElement("h1", { className: "title" }, "hi")
 *
 * It does NOT touch the DOM. It only returns a lightweight description
 * of what we want on screen — this object IS the "virtual DOM node".
 *   - type:     tag name string, e.g. "div", "h1", "button"
 *   - props:    attributes and event handlers, e.g. { onclick, id }
 *   - children: nested vnodes or text (collected via rest ...children)
 * ------------------------------------------------------------------- */
function createElement(type, props = {}, ...children) {
  return {
    type,
    props,
    children,
  };
}

/* ---------------------------------------------------------------------
 * createDOM(vnode)
 * ---------------------------------------------------------------------
 * The "reconciler/renderer" for a single node. It converts one virtual
 * DOM node into a real browser DOM node (recursively for children).
 * This is where the virtual description becomes something the browser
 * can actually paint.
 * ------------------------------------------------------------------- */
function createDOM(vnode) {
  // Base case: strings and numbers become text nodes (leaf content).
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(vnode);
  }

  // Otherwise it's an element node — create the real tag.
  const element = document.createElement(vnode.type);

  // Apply props: either wire up event listeners or set attributes.
  for (const prop in vnode.props) {
    const value = vnode.props[prop];

    if (prop.startsWith("on")) {
      // e.g. "onclick" -> event name "click".
      // slice(2) drops the "on", toLowerCase() normalizes it.
      const eventName = prop.slice(2).toLowerCase();

      // NOTE: must be addEventListener (not addEventListner) — a typo
      // here throws and silently aborts the whole render.
      element.addEventListener(eventName, value);
    } else {
      // Everything else is treated as a plain HTML attribute.
      element.setAttribute(prop, value);
    }
  }

  // Recursively build and attach every child node (depth-first).
  // This is what turns the nested vnode tree into a real DOM tree.
  vnode.children.forEach((child) => {
    const childElement = createDOM(child);
    element.appendChild(childElement);
  });

  return element;
}

/* ---------------------------------------------------------------------
 * render(vnode, container)
 * ---------------------------------------------------------------------
 * Mounts a virtual DOM tree into a real container element.
 *
 * NOTE: this is a naive strategy. Real React "diffs" the old and new
 * trees and patches only what changed. Here we simply wipe the container
 * (innerHTML = "") and rebuild from scratch on every render. Simple, but
 * it loses focus/scroll state and is less efficient — fine for learning.
 * ------------------------------------------------------------------- */
function render(vnode, container) {
  const dom = createDOM(vnode);
  container.innerHTML = ""; // clear previous render (no diffing)
  container.appendChild(dom); // mount the freshly built tree
}

/* ---------------------------------------------------------------------
 * Components
 * ---------------------------------------------------------------------
 * A "component" here is just a function that returns a virtual DOM node.
 * That mirrors React function components — the difference is we call them
 * directly (Welcome()) instead of using them as <Welcome />.
 * ------------------------------------------------------------------- */
function Welcome() {
  return createElement("h1", {}, "hello from vikas");
}

/* ---------------------------------------------------------------------
 * State management (our mini useState)
 * ---------------------------------------------------------------------
 * A single module-level variable holds app state. setState updates it
 * and triggers a full re-render so the UI reflects the new value.
 *
 * NOTE: real React batches updates and keeps per-component state; this
 * global single-value model only works for one simple counter.
 * ------------------------------------------------------------------- */
let state = 0;
function setState(newValue) {
  state = newValue; // update the data
  renderApp(); // redraw the UI so it matches the new data
}

/* ---------------------------------------------------------------------
 * App()
 * ---------------------------------------------------------------------
 * The root component. Returns the whole UI as a virtual DOM tree built
 * from nested createElement calls. Note how event handlers (onclick)
 * call setState, which re-runs render — this is the state -> UI loop.
 * ------------------------------------------------------------------- */
function App() {
  return createElement(
    "div",
    {},
    createElement("h1", {}, "my manual react"),
    // Text interpolates current state; rebuilt fresh on every render.
    createElement("p", {}, `count:${state}`),
    createElement(
      "button",
      {
        onclick: () => {
          setState(state + 1);
        },
      },
      "increment",
    ),
    createElement(
      "button",
      {
        onclick: () => {
          setState(state - 1);
        },
      },
      "decrement",
    ),
    createElement(
      "button",
      {
        onclick: () => {
          setState(0);
        },
      },
      "reset",
    ),
    // Composing a child component by calling it and embedding its vnode.
    Welcome(),
  );
}

/* ---------------------------------------------------------------------
 * renderApp()
 * ---------------------------------------------------------------------
 * The bridge between components and the DOM: build the virtual tree,
 * then render it into #root. Called once on load, and again on every
 * setState — that repeated call is what makes the UI reactive.
 * ------------------------------------------------------------------- */
function renderApp() {
  const virtualDOM = App();
  console.log("virtual dom", virtualDOM); // inspect the vnode tree in devtools

  render(virtualDOM, root);
}

// Initial paint — kicks everything off when the script loads.
renderApp();

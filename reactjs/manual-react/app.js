const root = document.getElementById("root");

function createElement(type, props = {}, ...children) {
  return {
    type,
    props,
    children,
  };
}

function createDOM(vnode) {
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(vnode);
  }

  const element = document.createElement(vnode.type);

  for (const prop in vnode.props) {
    const value = vnode.props[prop];

    if (prop.startsWith("on")) {
      const eventName = prop.slice(2).toLowerCase();

      element.addEventListener(eventName, value);
    } else {
      element.setAttribute(prop, value);
    }
  }
  //create children method

  vnode.children.forEach((child) => {
    const childElement = createDOM(child);
    element.appendChild(childElement);
  });

  return element;
}

function render(vnode, container) {
  const dom = createDOM(vnode);
  container.innerHTML = "";
  container.appendChild(dom);
}

function Welcome() {
  return createElement("h1", {}, "hello from vikas");
}

let state = 0;
function setState(newValue) {
  state = newValue;
  renderApp();
}

function App() {
  return createElement(
    "div",
    {},
    createElement("h1", {}, "my manual react"),
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
    Welcome(),
  );
}

function renderApp() {
  const virtualDOM = App();
  console.log("virtual dom", virtualDOM);

  render(virtualDOM, root);
}

renderApp();

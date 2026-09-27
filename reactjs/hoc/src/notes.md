# Higher-Order Components (HOC)

A **Higher-Order Component** is a **function that takes a component and returns a
new, enhanced component**. It's React's classic pattern for **reusing behavior**
(loading states, auth checks, logging) by *wrapping* components.

> Think of it like gift-wrapping: the original component is the gift, the HOC adds
> the wrapping (extra behavior) around it.

---

## 1. The Shape of an HOC

```jsx
const withSomething = (Component) => {
  return function Enhanced(props) {
    // add extra behavior here
    return <Component {...props} />;
  };
};
```

- Input: a component (`Component`).
- Output: a **new** component that renders the original, plus extras.
- Naming convention: HOCs start with **`with`** (`withLoading`, `withAuth`).

---

## 2. The Example — `withLoading.jsx`

```jsx
const withLoading = (Component) => {
  return function EnhancedComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <h2>please wait we are loading....</h2>;
    }
    return <Component {...props} />;
  };
};

export default withLoading;
```

What it does:
- Pulls the `isLoading` prop out for itself.
- If loading ➜ show a loading message.
- If not ➜ render the wrapped component, forwarding the **rest** of the props (`...props`).

---

## 3. The Wrapped Component — `User.jsx`

```jsx
const User = ({ name }) => {
  return <h1>Hello, {name}</h1>;
};
```

A plain, "dumb" component. It knows nothing about loading.

---

## 4. Putting It Together — `App.jsx`

```jsx
import User from "./User";
import withLoading from "./withLoading";

const UserWithLoading = withLoading(User);   // create the enhanced component

const App = () => {
  return (
    <div>
      <UserWithLoading name="vikas" isLoading={false} />
    </div>
  );
};
```

---

## 5. How Props Flow Through the HOC

```
  <UserWithLoading name="vikas" isLoading={false} />
              |
              v
  withLoading's EnhancedComponent({ isLoading, ...props })
     |                                   |
  isLoading = false               ...props = { name: "vikas" }
     |                                   |
   not loading, so ------------->  <User name="vikas" />
                                          |
                                          v
                                   <h1>Hello, vikas</h1>
```

If `isLoading` were `true`:

```
  isLoading = true  ->  <h2>please wait we are loading....</h2>
                        (User is never rendered)
```

---

## 6. Why `{...props}` Matters
The HOC "eats" the `isLoading` prop but must **pass everything else through**
(`{...props}`) so the wrapped component still receives its own props (`name`).
Forgetting this is the most common HOC bug.

---

## 7. HOC vs Custom Hook (modern note)
HOCs were the go-to reuse pattern before hooks. Today, **custom hooks** often do
the same job more simply. HOCs are still useful (and common in older code and
libraries), so it's important to recognize the pattern.

---

## Key Takeaways
- HOC = a function `component ➜ enhanced component`.
- Naming convention: prefix with `with`.
- Add behavior in the wrapper, then render `<Component {...props} />`.
- Always forward remaining props with `{...props}`.
- Modern alternative for logic reuse: custom hooks.

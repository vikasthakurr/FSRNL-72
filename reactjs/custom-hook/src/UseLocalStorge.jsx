import { useState, useEffect } from "react";

// Custom hook: useLocal
// Keeps a piece of state in sync with the browser's localStorage.
//   key          -> the localStorage key to read/write
//   initialValue -> value used the first time (when nothing is stored yet)
// Returns [value, setValue] just like useState.
const useLocal = (key, initialValue) => {
  // Lazy initializer: read from localStorage only once, on first render.
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      // Stored data is a string, so parse it back into JS; fall back to initial.
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      // If parsing fails (corrupt data), use the initial value.
      return initialValue;
    }
  });

  // Whenever value (or key) changes, push the latest data into localStorage.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocal;

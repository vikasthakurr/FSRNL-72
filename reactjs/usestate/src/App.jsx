import { useState } from "react";
const App = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h1>Value of count is:{count}</h1>
      <button onClick={handleClick}>increase</button>
    </div>
  );
};

export default App;

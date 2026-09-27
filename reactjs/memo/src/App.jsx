import { useState, useMemo, useCallback } from "react";
import Child from "./Child";
const App = () => {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  const handleClick1 = () => {
    setCount1(count1 + 1);
  };
  function calculate() {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  }
  // let result = calculate();
  let result = useMemo(() => calculate(), []);

  function sayHi() {
    console.log("hi");
  }
  const sayHi1 = useCallback(() => sayHi(), []);

  //1234
  //3578

  return (
    <div>
      <h1>the value of sum is :{result}</h1>
      <h1>the value of count:{count}</h1>
      <button onClick={handleClick}>change</button>
      <br />
      <br />
      <br />
      <br />
      <div>
        <button onClick={handleClick1}>change for child</button>
        <Child count1={count1} sayHi1={sayHi1} />
      </div>
    </div>
  );
};

export default App;

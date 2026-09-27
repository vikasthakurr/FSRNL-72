import { useState, useEffect } from "react";
// import { useLayoutEffect } from "react";
const App = () => {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  useEffect(() => {
    console.log("component mounted");
  }, []);
  useEffect(() => {
    console.log("component updated");

    //clean up code...or cleanup function
    return () => {
      console.log("component unmounted");
    };
  }, [count]);

  // useEffect(() => {
  //   console.log("simulating a heavy paid api call");
  // }, []);
  // useLayoutEffect(() => {
  //   console.log("simulating a heavy paid api call");
  // }, []);
  //no dependency->it will run like normal call of function..
  //empty dependency-> it will for first rendering only
  //variable dependency-> it will run every time dependency changes
  return (
    <div>
      <h1>count is:{count}</h1>
      <button onClick={handleClick}>change</button>
    </div>
  );
};

export default App;

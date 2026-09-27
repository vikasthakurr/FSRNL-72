import { useState, useRef, useEffect } from "react";
const App = () => {
  const [count, setCount] = useState(0);
  // const [name,setName]=useState("")
  const ref = useRef(0);
  const ref1 = useRef();
  const ref2 = useRef();
  useEffect(() => {
    console.log(ref1.current);
    ref1.current.style.color = "red";
    ref2.current.style.backgroundColor = "green";
  });

  function handleClick() {
    setCount(count + 1);
    ref.current = ref.current + 1;
    console.log(ref.current);
  }
  return (
    <div>
      <h1 ref={ref1}>count:{count}</h1>

      <button ref={ref2} onClick={handleClick}>
        change
      </button>
      {/* <input ref={ref2}  onChange={} type="text" placeholder="enter any name" /> */}
    </div>
  );
};

export default App;

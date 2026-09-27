import Child from "./Child";
import { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  return (
    <div>
      <Child name={name} setName={setName}/>
      <h1>the value coming from child:{name}</h1>
    </div>
  );
};

export default App;

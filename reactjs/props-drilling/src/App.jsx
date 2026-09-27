import Child1 from "./Child1";
import { UserContext } from "./UserContext";

const App = () => {
  let person = {
    fullname: "vikas",
    age: 26,
    salary: 1234567,
  };
  return (
    <UserContext.Provider value={person}>
      <Child1 />
    </UserContext.Provider>
  );
};

export default App;

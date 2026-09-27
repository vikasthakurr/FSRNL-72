import Home from "./Home";
import Login from "./Login";
const App = () => {
  let isLoggedIn=true
  return <div>
    {isLoggedIn?<Home />:<Login />}
  </div>;
};

export default App;

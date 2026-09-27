import UseCustom from "./UseCustom";
const App = () => {
  const [data] = UseCustom("https://dummyjson.com/products");
  console.log(data);
  return <div>App</div>;
};

export default App;

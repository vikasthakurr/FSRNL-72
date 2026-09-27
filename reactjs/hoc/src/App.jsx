import User from "./User";
import withLoading from "./withLoading";
//hoc
const UserWithLoading = withLoading(User);

const App = () => {
  return (
    <div>
      <UserWithLoading name="vikas" isLoading={false} />
    </div>
  );
};

export default App;

import { lazy, Suspense } from "react";
import Spinner from "./Spinner";
const Home = lazy(() => import("./Home"));
const Billing = lazy(() => import("./Billing"));
const App = () => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <Home />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Billing />
      </Suspense>
    </div>
  );
};
export default App;

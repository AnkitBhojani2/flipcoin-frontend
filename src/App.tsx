import { Wallet } from "./wallet/Wallet";
import HomePage from "./pages/HomePage";

const App = (): JSX.Element => (
  <div className="">
    <Wallet>
      <HomePage />
    </Wallet>
  </div>
);

export default App;

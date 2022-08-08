import { Wallet } from "./wallet/Wallet";
import HomePage from "./pages/HomePage";
import ResultState from "./context/ResultState";

const App = (): JSX.Element => (
  <ResultState>
    <Wallet>
      <HomePage />
    </Wallet>
  </ResultState>
);

export default App;

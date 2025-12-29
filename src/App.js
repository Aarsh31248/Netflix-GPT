import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/Redux/appStore";
import GlobalLoader from "./components/GlobalLoader";

function App() {
  return (
    <Provider store={appStore}>
      <GlobalLoader />
      <Body />
    </Provider>
  );
}

export default App;

import "./App.css";
import "./Root.css"
import { CustomRoutersProvider } from "./context/RoutersContext";

function App() {

  return (
    <CustomRoutersProvider>
    </CustomRoutersProvider>
  );
}

export default App;


import Routes from "./components/Routes/Index";
import { useDispatch } from "react-redux";
import { getAllProducts } from "./actions/products.action";

function App() {
  const dispatch = useDispatch();

  dispatch(getAllProducts());
  
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;

import "./App.css";
import Home from "./Home/Home";
import Nav from "./Nav/Nav";
import Boards from "./Boards/Boards";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/board" component={Boards} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

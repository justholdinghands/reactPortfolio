import "./App.css";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
            <li>
              <Link to="/hackertyper">Hacker Typer</Link>
            </li>
            <li>
              <Link to="/todo">To Do List</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/counter">
            <div>Counter</div>
          </Route>
          <Route path="/hackertyper">
            <div>Hacker Typer</div>
          </Route>
          <Route path="/todo">
            <div>todos</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

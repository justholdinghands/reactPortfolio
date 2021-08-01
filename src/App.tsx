import "./App.css";
import { Component } from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Counter from "./components/counter/Counter";
import Hackertyper from "./components/hackertyper/Hackertyper";
import Todo from "./components/todo/Todo";

type State = {
  color: string;
};

const history = createBrowserHistory();

export default class App extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = { color: "#FFFFFF" };
  }

  changeColor = (color) => {
    document.body.style.backgroundColor = color;
  };

  componentDidMount() {
    if (document.location.pathname === "/counter") {
      document.body.style.backgroundColor = "#79bac2";
    } else if (document.location.pathname === "/hackertyper") {
      document.body.style.backgroundColor = "#000000";
    } else if (document.location.pathname === "/todo") {
      document.body.style.backgroundColor = "#f5f5f5";
    }
  }

  render() {
    return (
      <Router>
        <div id="divRender">
          <nav>
            <ul>
              <li>
                <Link to="/counter" onClick={() => this.changeColor("#79bac2")}>
                  Counter
                </Link>
              </li>
              <li>
                <Link
                  to="/hackertyper"
                  onClick={() => this.changeColor("#000000")}
                >
                  Hacker Typer
                </Link>
              </li>
              <li>
                <Link to="/todo" onClick={() => this.changeColor("#f5f5f5")}>
                  To Do List
                </Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/counter">
              {/* <Counter></Counter> */}
              <h1>Future Counter</h1>
            </Route>
            <Route path="/hackertyper">
              {/* <Hackertyper></Hackertyper>*/}
              <h1>Future HackerTyper</h1>
            </Route>
            <Route path="/todo">
              <Todo></Todo>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

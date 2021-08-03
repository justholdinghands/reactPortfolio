// import "./App.css";
import { Component } from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { theme } from "./theme";
import Counter from "./components/counter/Counter";
import styled from "styled-components";
// import Hackertyper from "./components/hackertyper/Hackertyper";
// import Todo from "./components/todo/Todo";

const DivRender = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100vh;
  width: 97vw;
`;

const UlNav = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  list-style-type: none;
  font: bold 1.8em/150% ${theme.ht_font};
`;

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
        <DivRender id="divRender">
          <nav>
            <UlNav>
              <li>
                <Link
                  to="/counter"
                  onClick={() => this.changeColor("#79bac2")}
                  style={{ textDecoration: "none" }}
                >
                  Counter
                </Link>
              </li>
              <li>
                <Link
                  to="/hackertyper"
                  onClick={() => this.changeColor("#000000")}
                  style={{ textDecoration: "none" }}
                >
                  Hacker Typer
                </Link>
              </li>
              <li>
                <Link
                  to="/todo"
                  onClick={() => this.changeColor("#f5f5f5")}
                  style={{ textDecoration: "none" }}
                >
                  To Do List
                </Link>
              </li>
            </UlNav>
          </nav>

          <Switch>
            <Route path="/counter">
              <Counter></Counter>
            </Route>
            <Route path="/hackertyper">
              {/* <Hackertyper></Hackertyper> */}
              <h1>Future HackerTyper</h1>
            </Route>
            <Route path="/todo">
              {/* <Todo>todos</Todo> */}
              <h1>Future TODO</h1>
            </Route>
          </Switch>
        </DivRender>
      </Router>
    );
  }
}

import { Component } from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { theme } from "./theme";
import Hackertyper from "./components/hackertyper/Hackertyper";
import styled from "styled-components";

const DivRender = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100vh;
  width: 97vw;
  white-space: pre;
  line-height: 2rem;
`;

const UlNav = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  list-style-type: none;
  font: bold 1.8em/150% ${theme.hackertyper.font};
`;

type State = {
  color: string;
};

export default class App extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = { color: theme.todo.pale };
  }

  changeColor = (color) => {
    document.body.style.backgroundColor = color;
  };

  componentDidMount() {
    if (document.location.pathname === "/counter") {
      document.body.style.backgroundColor = theme.counter.background;
    } else if (document.location.pathname === "/hackertyper") {
      document.body.style.backgroundColor = theme.hackertyper.background;
    } else if (document.location.pathname === "/todo") {
      document.body.style.backgroundColor = theme.todo.background;
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
                  onClick={() => this.changeColor(theme.counter.background)}
                  style={{ textDecoration: "none" }}
                >
                  Counter
                </Link>
              </li>
              <li>
                <Link
                  to="/hackertyper"
                  onClick={() => this.changeColor(theme.hackertyper.background)}
                  style={{ textDecoration: "none" }}
                >
                  Hacker Typer
                </Link>
              </li>
              <li>
                <Link
                  to="/todo"
                  onClick={() => this.changeColor(theme.todo.background)}
                  style={{ textDecoration: "none" }}
                >
                  To Do List
                </Link>
              </li>
            </UlNav>
          </nav>

          <Switch>
            <Route path="/counter">
              {/* <Counter></Counter> */}
              <h1>Future Counter</h1>
            </Route>
            <Route path="/hackertyper">
              <Hackertyper></Hackertyper>
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

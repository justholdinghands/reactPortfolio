import { Component } from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import Counter from "./components/counter/Counter";
import styled from "styled-components";

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

const GlobalStyle = createGlobalStyle<{ bgcolor: string }>`
  body {
    background-color: ${(props) => props.bgcolor};
  }
`;
export default class App extends Component<{}> {
  changeColor = (color) => {
    document.body.style.backgroundColor = color;
  };

  componentDidMount() {
    if (document.location.pathname === "/counter") {
      document.body.style.backgroundColor = `${theme.count_background}`;
    } else if (document.location.pathname === "/hackertyper") {
      document.body.style.backgroundColor = `${theme.ht_background}`;
    } else if (document.location.pathname === "/todo") {
      document.body.style.backgroundColor = `${theme.todo_background}`;
    }
  }

  render() {
    return (
      <div>
        <GlobalStyle bgcolor={`${theme.todo_faded}`} />
        <Router>
          <DivRender id="divRender">
            <nav>
              <UlNav>
                <li>
                  <Link
                    to="/counter"
                    onClick={() =>
                      this.changeColor(`${theme.count_background}`)
                    }
                    style={{ textDecoration: "none" }}
                  >
                    Counter
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hackertyper"
                    onClick={() => this.changeColor(`${theme.ht_background}`)}
                    style={{ textDecoration: "none" }}
                  >
                    Hacker Typer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/todo"
                    onClick={() => this.changeColor(`${theme.todo_background}`)}
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
      </div>
    );
  }
}
